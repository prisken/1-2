import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const addToCartSchema = z.object({
  productId: z.string().optional(),
  customDrinkId: z.string().optional(),
  quantity: z.number().min(1),
  options: z.record(z.any()).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json({ cart: [] })
    }

    // In a real implementation, you might want to store cart in database
    // For now, we'll return an empty cart
    return NextResponse.json({ cart: [] })
  } catch (error) {
    console.error('Get cart error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    const body = await request.json()
    const { productId, customDrinkId, quantity, options } = addToCartSchema.parse(body)

    if (!productId && !customDrinkId) {
      return NextResponse.json(
        { error: 'Either productId or customDrinkId is required' },
        { status: 400 }
      )
    }

    // Validate product exists and is available
    if (productId) {
      const product = await prisma.product.findUnique({
        where: { id: productId, isActive: true }
      })

      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }

      if (product.inventory < quantity) {
        return NextResponse.json(
          { error: 'Insufficient inventory' },
          { status: 400 }
        )
      }
    }

    // Validate custom drink exists
    if (customDrinkId) {
      const customDrink = await prisma.customDrink.findUnique({
        where: { id: customDrinkId }
      })

      if (!customDrink) {
        return NextResponse.json(
          { error: 'Custom drink not found' },
          { status: 404 }
        )
      }
    }

    // In a real implementation, you would store cart items in database
    // For now, we'll return success
    return NextResponse.json({
      message: 'Item added to cart successfully'
    })
  } catch (error) {
    console.error('Add to cart error:', error)
    
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

