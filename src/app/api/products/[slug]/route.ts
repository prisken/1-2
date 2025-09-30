import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Calculate average rating
    const averageRating = product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 0

    // Get related products
    const relatedProducts = await prisma.product.findMany({
      where: {
        category: product.category,
        id: { not: product.id }
      },
      take: 4,
      include: {
        reviews: {
          select: {
            rating: true
          }
        }
      }
    })

    const relatedProductsWithRatings = relatedProducts.map(related => ({
      ...related,
      averageRating: related.reviews.length > 0
        ? related.reviews.reduce((sum, review) => sum + review.rating, 0) / related.reviews.length
        : 0
    }))

    return NextResponse.json({
      ...product,
      averageRating,
      reviewCount: product.reviews.length,
      relatedProducts: relatedProductsWithRatings
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
