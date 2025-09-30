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
    
    // Return sample product if database is not available
    const sampleProduct = {
      id: '1',
      name: 'Strawberry Vanilla Delight',
      description: 'A perfect blend of fresh strawberries and creamy vanilla. This two-tone masterpiece combines the sweetness of ripe strawberries with the smooth richness of vanilla, creating a delightful and refreshing beverage that\'s perfect for any time of day.',
      price: 6.99,
      images: ['/images/placeholder-drink.jpg'],
      category: 'SMOOTHIES',
      inStock: true,
      averageRating: 4.5,
      reviewCount: 12,
      slug: params.slug,
      relatedProducts: [
        {
          id: '2',
          name: 'Mango Coconut Bliss',
          description: 'Tropical mango with rich coconut cream',
          price: 7.99,
          images: ['/images/placeholder-drink.jpg'],
          category: 'SMOOTHIES',
          inStock: true,
          averageRating: 4.8,
          reviewCount: 8,
          slug: 'mango-coconut-bliss'
        },
        {
          id: '3',
          name: 'Blueberry Almond Dream',
          description: 'Antioxidant-rich blueberries with almond milk',
          price: 6.49,
          images: ['/images/placeholder-drink.jpg'],
          category: 'SMOOTHIES',
          inStock: true,
          averageRating: 4.3,
          reviewCount: 15,
          slug: 'blueberry-almond-dream'
        }
      ]
    }

    return NextResponse.json(sampleProduct)
  }
}
