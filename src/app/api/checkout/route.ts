import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { sendEmail, generateOrderConfirmationEmail } from '@/lib/email'
import { z } from 'zod'

const checkoutSchema = z.object({
  items: z.array(z.object({
    productId: z.string().optional(),
    customDrinkId: z.string().optional(),
    quantity: z.number().min(1),
    price: z.number().min(0),
    options: z.record(z.any()).optional(),
  })),
  shippingAddress: z.object({
    firstName: z.string(),
    lastName: z.string(),
    company: z.string().optional(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
    phone: z.string().optional(),
  }),
  billingAddress: z.object({
    firstName: z.string(),
    lastName: z.string(),
    company: z.string().optional(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
    phone: z.string().optional(),
  }).optional(),
  email: z.string().email(),
  promotionCode: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing not configured' },
        { status: 503 }
      )
    }

    const user = await getCurrentUser(request)
    const body = await request.json()
    const { items, shippingAddress, billingAddress, email, promotionCode } = checkoutSchema.parse(body)

    // Calculate totals
    let subtotal = 0
    const orderItems = []

    for (const item of items) {
      subtotal += item.price * item.quantity
      orderItems.push(item)
    }

    // Calculate tax (simplified - in real app, use tax service)
    const tax = subtotal * 0.08 // 8% tax
    const shipping = subtotal > 50 ? 0 : 9.99 // Free shipping over $50
    let discount = 0

    // Apply promotion if provided
    if (promotionCode) {
      const promotion = await prisma.promotion.findUnique({
        where: { code: promotionCode, isActive: true }
      })

      if (promotion && new Date() >= promotion.startsAt && new Date() <= promotion.endsAt) {
        if (promotion.type === 'PERCENTAGE') {
          discount = Math.min(subtotal * (promotion.value.toNumber() / 100), promotion.maxDiscount?.toNumber() || Infinity)
        } else if (promotion.type === 'FIXED_AMOUNT') {
          discount = Math.min(promotion.value.toNumber(), subtotal)
        }
      }
    }

    const total = subtotal + tax + shipping - discount

    // Create order in database
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user?.userId,
        email,
        subtotal,
        tax,
        shipping,
        discount,
        total,
        shippingAddress: shippingAddress as any,
        billingAddress: billingAddress as any,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        shippingStatus: 'PENDING',
      }
    })

    // Create order items
    for (const item of orderItems) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          customDrinkId: item.customDrinkId,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
          options: item.options as any,
        }
      })
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
    })

    // Update order with payment intent ID
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: paymentIntent.id }
    })

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.orderNumber,
      clientSecret: paymentIntent.client_secret,
      total,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

