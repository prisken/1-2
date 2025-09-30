import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@halfdrinks.com' },
    update: {},
    create: {
      email: 'admin@halfdrinks.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  })
  console.log('✅ Created admin user')

  // Create sample customer
  const customerPassword = await bcrypt.hash('customer123', 12)
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'CUSTOMER',
    },
  })
  console.log('✅ Created sample customer')

  // Create sample products
  const products = [
    {
      name: 'Tropical Sunset Smoothie',
      slug: 'tropical-sunset-smoothie',
      description: 'A vibrant blend of mango, pineapple, and coconut with our signature two-tone presentation. This refreshing smoothie is packed with vitamin C and tropical flavors that transport you to paradise.',
      shortDescription: 'Vibrant mango, pineapple, and coconut blend',
      price: 8.99,
      comparePrice: 10.99,
      sku: 'TSS-001',
      inventory: 50,
      category: 'SMOOTHIES',
      isFeatured: true,
      healthBenefits: ['Vitamin C', 'Antioxidants', 'Hydration'],
      allergens: ['Coconut'],
      ingredients: ['Mango', 'Pineapple', 'Coconut Milk', 'Banana', 'Honey', 'Ice'],
      images: ['/images/tropical-sunset.jpg'],
      colors: ['Orange', 'Yellow'],
      flavors: ['Mango', 'Pineapple', 'Coconut'],
      tags: ['tropical', 'vitamin-c', 'refreshing', 'summer'],
    },
    {
      name: 'Berry Bliss Juice',
      slug: 'berry-bliss-juice',
      description: 'A rich blend of blueberries, strawberries, and blackberries with a hint of mint. This antioxidant-rich juice features our signature two-tone design and delivers a burst of natural sweetness.',
      shortDescription: 'Antioxidant-rich berry blend with mint',
      price: 7.99,
      sku: 'BBJ-002',
      inventory: 75,
      category: 'JUICES',
      isFeatured: true,
      healthBenefits: ['Antioxidants', 'Vitamin C', 'Low Sugar'],
      allergens: [],
      ingredients: ['Blueberries', 'Strawberries', 'Blackberries', 'Mint', 'Lemon', 'Water'],
      images: ['/images/berry-bliss.jpg'],
      colors: ['Purple', 'Red'],
      flavors: ['Blueberry', 'Strawberry', 'Blackberry', 'Mint'],
      tags: ['antioxidants', 'berries', 'low-sugar', 'healthy'],
    },
    {
      name: 'Green Goddess Tea',
      slug: 'green-goddess-tea',
      description: 'A premium blend of green tea, matcha, and fresh herbs. This energizing tea features our unique two-tone presentation and provides a gentle caffeine boost with powerful antioxidants.',
      shortDescription: 'Premium green tea with matcha and herbs',
      price: 6.99,
      sku: 'GGT-003',
      inventory: 100,
      category: 'TEAS',
      healthBenefits: ['Antioxidants', 'Caffeine', 'Metabolism Boost'],
      allergens: [],
      ingredients: ['Green Tea', 'Matcha', 'Mint', 'Lemon Balm', 'Ginger'],
      images: ['/images/green-goddess.jpg'],
      colors: ['Green', 'Light Green'],
      flavors: ['Green Tea', 'Matcha', 'Mint', 'Ginger'],
      tags: ['antioxidants', 'energy', 'herbal', 'premium'],
    },
    {
      name: 'Chocolate Dream Coffee',
      slug: 'chocolate-dream-coffee',
      description: 'A decadent blend of premium coffee, dark chocolate, and vanilla. This rich beverage features our signature two-tone design and provides the perfect balance of energy and indulgence.',
      shortDescription: 'Rich coffee with dark chocolate and vanilla',
      price: 9.99,
      comparePrice: 11.99,
      sku: 'CDC-004',
      inventory: 40,
      category: 'COFFEE',
      isFeatured: true,
      healthBenefits: ['Caffeine', 'Antioxidants'],
      allergens: ['Dairy'],
      ingredients: ['Premium Coffee', 'Dark Chocolate', 'Vanilla', 'Milk', 'Cocoa Powder'],
      images: ['/images/chocolate-dream.jpg'],
      colors: ['Brown', 'Cream'],
      flavors: ['Coffee', 'Chocolate', 'Vanilla'],
      tags: ['coffee', 'chocolate', 'indulgent', 'energy'],
    },
    {
      name: 'Energy Boost Elixir',
      slug: 'energy-boost-elixir',
      description: 'A powerful blend of natural energy ingredients including ginseng, guarana, and B-vitamins. This energizing drink features our unique two-tone presentation and provides sustained energy without the crash.',
      shortDescription: 'Natural energy blend with ginseng and guarana',
      price: 12.99,
      sku: 'EBE-005',
      inventory: 30,
      category: 'ENERGY_DRINKS',
      healthBenefits: ['Energy', 'B-Vitamins', 'Natural Caffeine'],
      allergens: [],
      ingredients: ['Ginseng', 'Guarana', 'B-Vitamins', 'Green Tea Extract', 'Natural Flavors'],
      images: ['/images/energy-boost.jpg'],
      colors: ['Orange', 'Yellow'],
      flavors: ['Citrus', 'Ginseng', 'Natural'],
      tags: ['energy', 'natural', 'vitamins', 'sustained'],
    },
    {
      name: 'Custom Creation Starter',
      slug: 'custom-creation-starter',
      description: 'Start your custom drink journey with our base blend. Choose your own colors, flavors, and ingredients to create a truly unique beverage that reflects your personal taste.',
      shortDescription: 'Base blend for custom drink creations',
      price: 5.99,
      sku: 'CCS-006',
      inventory: 200,
      category: 'CUSTOM',
      healthBenefits: ['Customizable', 'Fresh'],
      allergens: [],
      ingredients: ['Base Blend', 'Custom Additions'],
      images: ['/images/custom-starter.jpg'],
      colors: ['Custom'],
      flavors: ['Custom'],
      tags: ['custom', 'personalized', 'creative', 'unique'],
    },
  ]

  for (const productData of products) {
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData,
    })
  }
  console.log('✅ Created sample products')

  // Create sample blog posts
  const blogPosts = [
    {
      title: 'The Art of Two-Tone Drinks',
      slug: 'art-of-two-tone-drinks',
      excerpt: 'Discover the creative process behind our signature two-tone beverage designs and how we achieve the perfect visual balance.',
      content: `
        <p>At 1/2 Drinks, we believe that beverages should be as beautiful as they are delicious. Our signature two-tone design philosophy represents the perfect balance between health and indulgence, nature and artistry.</p>
        
        <p>The process begins with carefully selected ingredients that not only taste amazing but also create stunning visual contrasts. We use natural colorants and layering techniques to achieve our distinctive look.</p>
        
        <p>Each drink is handcrafted with attention to detail, ensuring that every sip is both a visual and sensory experience. From the vibrant oranges of our tropical blends to the deep purples of our berry creations, every color tells a story.</p>
      `,
      author: 'Sarah Chen',
      tags: ['design', 'artistry', 'process'],
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      title: 'Health Benefits of Our Ingredients',
      slug: 'health-benefits-ingredients',
      excerpt: 'Learn about the nutritional powerhouse ingredients we use in our drinks and how they benefit your health.',
      content: `
        <p>Our commitment to health goes beyond just creating delicious drinks. Every ingredient is chosen for its nutritional value and health benefits.</p>
        
        <h3>Antioxidant-Rich Berries</h3>
        <p>Blueberries, strawberries, and blackberries are packed with antioxidants that help fight free radicals and support overall health.</p>
        
        <h3>Vitamin C Powerhouses</h3>
        <p>Citrus fruits and tropical fruits provide essential vitamin C for immune support and collagen production.</p>
        
        <h3>Natural Energy Sources</h3>
        <p>Ginseng and guarana provide natural, sustained energy without the crash associated with artificial stimulants.</p>
      `,
      author: 'Dr. Michael Rodriguez',
      tags: ['health', 'nutrition', 'ingredients'],
      isPublished: true,
      publishedAt: new Date(),
    },
  ]

  for (const postData of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: postData.slug },
      update: {},
      create: postData,
    })
  }
  console.log('✅ Created sample blog posts')

  // Create sample events
  const events = [
    {
      title: 'Summer Smoothie Workshop',
      slug: 'summer-smoothie-workshop',
      description: 'Join us for a hands-on workshop where you\'ll learn to create your own two-tone smoothies using our signature techniques.',
      content: `
        <p>Learn the art of creating beautiful, healthy smoothies in this interactive workshop. We'll cover:</p>
        <ul>
          <li>Ingredient selection and preparation</li>
          <li>Layering techniques for two-tone effects</li>
          <li>Nutritional benefits of different ingredients</li>
          <li>Customization tips for personal preferences</li>
        </ul>
        <p>All materials and ingredients provided. Take home your creations!</p>
      `,
      location: '1/2 Drinks Studio',
      address: '123 Beverage Street, City, ST 12345',
      startDate: new Date('2024-07-15T14:00:00Z'),
      endDate: new Date('2024-07-15T16:00:00Z'),
      maxAttendees: 20,
      price: 25.00,
      image: '/images/workshop.jpg',
    },
    {
      title: 'New Flavor Launch Party',
      slug: 'new-flavor-launch-party',
      description: 'Be the first to try our latest seasonal flavors and meet the team behind 1/2 Drinks.',
      location: '1/2 Drinks Flagship Store',
      address: '456 Main Street, City, ST 12345',
      startDate: new Date('2024-08-10T18:00:00Z'),
      endDate: new Date('2024-08-10T21:00:00Z'),
      maxAttendees: 100,
      price: 0.00,
      image: '/images/launch-party.jpg',
    },
  ]

  for (const eventData of events) {
    await prisma.event.upsert({
      where: { slug: eventData.slug },
      update: {},
      create: eventData,
    })
  }
  console.log('✅ Created sample events')

  // Create sample promotions
  const promotions = [
    {
      name: 'Summer Sale',
      code: 'SUMMER20',
      type: 'PERCENTAGE',
      value: 20.00,
      minAmount: 25.00,
      maxDiscount: 10.00,
      usageLimit: 1000,
      startsAt: new Date('2024-06-01T00:00:00Z'),
      endsAt: new Date('2024-08-31T23:59:59Z'),
    },
    {
      name: 'First Order Discount',
      code: 'WELCOME10',
      type: 'FIXED_AMOUNT',
      value: 10.00,
      minAmount: 20.00,
      usageLimit: 1,
      startsAt: new Date('2024-01-01T00:00:00Z'),
      endsAt: new Date('2024-12-31T23:59:59Z'),
    },
  ]

  for (const promotionData of promotions) {
    await prisma.promotion.upsert({
      where: { code: promotionData.code },
      update: {},
      create: promotionData,
    })
  }
  console.log('✅ Created sample promotions')

  // Create sample content
  const contentItems = [
    {
      key: 'about',
      title: 'About 1/2 Drinks',
      content: `
        <h2>Our Story</h2>
        <p>Founded in 2020, 1/2 Drinks was born from a simple idea: healthy beverages should be as beautiful as they are nutritious. Our signature two-tone design represents the perfect balance between health and indulgence.</p>
        
        <h2>Our Mission</h2>
        <p>To create handcrafted beverages that nourish both body and soul, using only the finest ingredients and innovative techniques.</p>
        
        <h2>Our Values</h2>
        <ul>
          <li>Quality ingredients sourced responsibly</li>
          <li>Artistic presentation that delights the senses</li>
          <li>Health benefits that support your wellness journey</li>
          <li>Sustainability in every aspect of our business</li>
        </ul>
      `,
      type: 'ABOUT',
    },
    {
      key: 'faq',
      title: 'Frequently Asked Questions',
      content: `
        <h3>What makes your drinks two-tone?</h3>
        <p>We use natural layering techniques and carefully selected ingredients to create our signature two-tone effect. Each drink is handcrafted to achieve the perfect visual balance.</p>
        
        <h3>Are your drinks healthy?</h3>
        <p>Yes! All our drinks are made with natural ingredients and are free from artificial preservatives, colors, and flavors. We focus on nutritional benefits while maintaining great taste.</p>
        
        <h3>Can I customize my drink?</h3>
        <p>Absolutely! We offer a custom drink creator where you can choose your own colors, flavors, and ingredients to create a truly unique beverage.</p>
        
        <h3>Do you offer delivery?</h3>
        <p>Yes, we offer delivery within a 10-mile radius of our locations. Orders over $50 qualify for free delivery.</p>
      `,
      type: 'FAQ',
    },
  ]

  for (const contentData of contentItems) {
    await prisma.content.upsert({
      where: { key: contentData.key },
      update: {},
      create: contentData,
    })
  }
  console.log('✅ Created sample content')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


