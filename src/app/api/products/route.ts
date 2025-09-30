import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const featured = searchParams.get('featured') === 'true'


    // Mock data for demo purposes when database is not available
    const mockProducts = [
      {
        id: '1',
        name: 'Tropical Sunset Smoothie',
        slug: 'tropical-sunset-smoothie',
        price: 8.99,
        comparePrice: 10.99,
        images: ['/images/placeholder-drink.jpg'],
        averageRating: 4.5,
        reviewCount: 23,
        shortDescription: 'Vibrant mango, pineapple, and coconut blend',
        category: 'SMOOTHIES',
        tags: ['tropical', 'vitamin-c', 'refreshing'],
        isFeatured: true,
      },
      {
        id: '2',
        name: 'Berry Bliss Juice',
        slug: 'berry-bliss-juice',
        price: 7.99,
        images: ['/images/placeholder-drink.jpg'],
        averageRating: 4.8,
        reviewCount: 15,
        shortDescription: 'Antioxidant-rich berry blend with mint',
        category: 'JUICES',
        tags: ['antioxidants', 'berries', 'low-sugar'],
        isFeatured: true,
      },
      {
        id: '3',
        name: 'Green Goddess Tea',
        slug: 'green-goddess-tea',
        price: 6.99,
        images: ['/images/placeholder-drink.jpg'],
        averageRating: 4.2,
        reviewCount: 8,
        shortDescription: 'Premium green tea with matcha and herbs',
        category: 'TEAS',
        tags: ['antioxidants', 'energy', 'herbal'],
        isFeatured: false,
      },
      {
        id: '4',
        name: 'Chocolate Dream Coffee',
        slug: 'chocolate-dream-coffee',
        price: 9.99,
        comparePrice: 11.99,
        images: ['/images/placeholder-drink.jpg'],
        averageRating: 4.7,
        reviewCount: 31,
        shortDescription: 'Rich coffee with dark chocolate and vanilla',
        category: 'COFFEE',
        tags: ['coffee', 'chocolate', 'indulgent'],
        isFeatured: true,
      },
    ]

    // Filter featured products if requested
    const filteredProducts = featured 
      ? mockProducts.filter(p => p.isFeatured)
      : mockProducts

    const total = filteredProducts.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const products = filteredProducts.slice(startIndex, endIndex)

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    })
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
