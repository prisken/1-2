import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  console.log('🔍 DEBUG: API /products called')
  console.log('🔍 DEBUG: Request URL:', req.url)
  
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'name'

    console.log('🔍 DEBUG: Parsed params:', { page, limit, category, search, sort })

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

    console.log('🔍 DEBUG: Querying database with whereClause:', whereClause)
    
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
    
    console.log('🔍 DEBUG: Database query results:', { productsCount: products.length, total })

    // Calculate average ratings
    const productsWithRatings = products.map(product => ({
      ...product,
      averageRating: product.reviews.length > 0 
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0,
      reviewCount: product.reviews.length
    }))

    // If no products found in database, return sample products
    console.log('🔍 DEBUG: Products with ratings length:', productsWithRatings.length)
    if (productsWithRatings.length === 0) {
      console.log('🔍 DEBUG: No products found, returning sample products')
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
          slug: 'strawberry-vanilla-delight',
          tags: ['Antioxidants', 'Low Sugar', 'Organic']
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
          slug: 'mango-coconut-bliss',
          tags: ['Vitamins', 'Dairy Free', 'Vegan']
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
          slug: 'blueberry-almond-dream',
          tags: ['Antioxidants', 'Protein', 'Gluten Free']
        },
        {
          id: '4',
          name: 'Green Energy Boost',
          description: 'Spinach, kale, and apple for a healthy energy kick',
          price: 5.99,
          images: ['/images/placeholder-drink.jpg'],
          category: 'JUICES',
          inStock: true,
          averageRating: 4.2,
          reviewCount: 9,
          slug: 'green-energy-boost',
          tags: ['Vitamins', 'Low Sugar', 'Organic']
        },
        {
          id: '5',
          name: 'Chocolate Banana Smoothie',
          description: 'Rich chocolate with fresh banana and almond milk',
          price: 7.49,
          images: ['/images/placeholder-drink.jpg'],
          category: 'SMOOTHIES',
          inStock: true,
          averageRating: 4.6,
          reviewCount: 11,
          slug: 'chocolate-banana-smoothie',
          tags: ['Protein', 'Dairy Free', 'Vegan']
        },
        {
          id: '6',
          name: 'Tropical Paradise',
          description: 'Pineapple, mango, and coconut water blend',
          price: 6.79,
          images: ['/images/placeholder-drink.jpg'],
          category: 'JUICES',
          inStock: true,
          averageRating: 4.7,
          reviewCount: 7,
          slug: 'tropical-paradise',
          tags: ['Vitamins', 'Low Sugar', 'Gluten Free']
        }
      ]

      const response = {
        products: sampleProducts,
        pagination: {
          page: 1,
          limit: 12,
          total: sampleProducts.length,
          totalPages: 1
        }
      }
      console.log('🔍 DEBUG: Returning sample products response:', response)
      return NextResponse.json(response)
    }

    return NextResponse.json({
      products: productsWithRatings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
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
        totalPages: 1
      }
    })
  }
}
