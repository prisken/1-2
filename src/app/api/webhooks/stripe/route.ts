import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { sendEmail, generateOrderConfirmationEmail } from '@/lib/email'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const orderId = paymentIntent.metadata.orderId

        if (orderId) {
          // Update order status
          const order = await prisma.order.update({
            where: { id: orderId },
            data: {
              status: 'CONFIRMED',
              paymentStatus: 'PAID',
              paymentMethod: paymentIntent.payment_method as string,
            },
            include: {
              items: {
                include: {
                  product: true,
                  customDrink: true,
                }
              }
            }
          })

          // Update inventory
          for (const item of order.items) {
            if (item.productId) {
              await prisma.product.update({
                where: { id: item.productId },
                data: {
                  inventory: {
                    decrement: item.quantity
                  }
                }
              })
            }
          }

          // Send confirmation email
          try {
            const email = generateOrderConfirmationEmail(order, order.items)
            await sendEmail(email)
          } catch (emailError) {
            console.error('Failed to send order confirmation email:', emailError)
          }

          // Award loyalty points if user is logged in
          if (order.userId) {
            const points = Math.floor(order.total.toNumber())
            await prisma.loyaltyPoint.create({
              data: {
                userId: order.userId,
                points,
                type: 'PURCHASE',
                description: `Points earned for order #${order.orderNumber}`,
                orderId: order.id,
              }
            })
          }
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const orderId = paymentIntent.metadata.orderId

        if (orderId) {
          await prisma.order.update({
            where: { id: orderId },
            data: {
              status: 'CANCELLED',
              paymentStatus: 'FAILED',
            }
          })
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

