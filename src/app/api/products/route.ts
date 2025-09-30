import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'name'

    const skip = (page - 1) * limit

    let whereClause: any = {}
    
    if (category) {
      whereClause.category = category
    }
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { [sort]: 'asc' },
        include: {
          reviews: {
            select: {
              rating: true
            }
          }
        }
      }),
      prisma.product.count({ where: whereClause })
    ])

    // Calculate average ratings
    const productsWithRatings = products.map(product => ({
      ...product,
      averageRating: product.reviews.length > 0 
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0,
      reviewCount: product.reviews.length
    }))

    return NextResponse.json({
      products: productsWithRatings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    
    // Return sample products if database is not available
    const sampleProducts = [
      {
        id: '1',
        name: 'Strawberry Vanilla Delight',
        description: 'A perfect blend of fresh strawberries and creamy vanilla',
        price: 6.99,
        images: ['/images/placeholder-drink.jpg'],
        category: 'SMOOTHIES',
        inStock: true,
        averageRating: 4.5,
        reviewCount: 12,
        slug: 'strawberry-vanilla-delight'
      },
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

    return NextResponse.json({
      products: sampleProducts,
      pagination: {
        page: 1,
        limit: 12,
        total: sampleProducts.length,
        pages: 1
      }
    })
  }
}
