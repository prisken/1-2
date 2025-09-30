# 1/2 Drinks - Handmade Healthy Beverages Website

A fully functional, production-ready e-commerce website for the "1/2" drinks brand, featuring unique two-tone handmade beverages with comprehensive features including custom drink creation, loyalty programs, and community features.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse and filter drinks by category, health benefits, and price
- **Custom Drink Creator**: Interactive tool to design personalized beverages
- **Shopping Cart & Checkout**: Full e-commerce functionality with Stripe integration
- **User Authentication**: Secure JWT-based authentication system
- **Loyalty Program**: Points system with rewards redemption
- **Order Management**: Real-time order tracking and history

### Community Features
- **Customer Gallery**: User-generated content with moderation
- **Reviews & Ratings**: Verified customer reviews system
- **Referral Program**: Trackable referral links and rewards
- **Instagram Integration**: Live feed from Instagram API
- **Blog/Journal**: CMS-powered content management

### Admin Features
- **Dashboard**: Comprehensive admin panel for content and order management
- **Product Management**: Add/edit/remove products with inventory tracking
- **Order Processing**: Manage orders, payments, and shipping
- **Content Management**: Edit blog posts, events, and static content
- **User Management**: Customer data and loyalty point administration

## 🛠 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hook Form** with Zod validation
- **Headless UI** for accessible components

### Backend
- **Next.js API Routes** for serverless functions
- **Prisma ORM** with PostgreSQL
- **JWT** for authentication
- **Stripe** for payment processing
- **SendGrid** for transactional emails
- **Cloudinary** for image management

### Database
- **PostgreSQL** with comprehensive schema
- **Prisma** for type-safe database operations
- **Database migrations** for version control

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account
- SendGrid account
- Cloudinary account
- Instagram API access (optional)

## 🚀 Quick Start

### 1. Clone and Install
```bash
cd /Users/priskenlo/half-drinks-website
npm install
```

### 2. Environment Setup
Copy the example environment file and configure your variables:
```bash
cp .env.example .env.local
```

Update `.env.local` with your actual values:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/half_drinks_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# SendGrid
SENDGRID_API_KEY="SG..."
FROM_EMAIL="noreply@halfdrinks.com"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Instagram (optional)
INSTAGRAM_ACCESS_TOKEN="your-instagram-token"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### 3. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed with sample data
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the website.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── products/      # Product management
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Payment processing
│   │   └── webhooks/      # Stripe webhooks
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── cart/              # Shopping cart components
│   ├── home/              # Homepage sections
│   ├── layout/            # Layout components
│   └── providers/         # Context providers
├── lib/                   # Utility libraries
│   ├── auth.ts            # Authentication utilities
│   ├── db.ts              # Database client
│   ├── email.ts           # Email utilities
│   ├── stripe.ts          # Stripe configuration
│   └── cloudinary.ts      # Image management
└── types/                 # TypeScript type definitions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## 🗄 Database Schema

The database includes comprehensive tables for:
- **Users** - Customer accounts and authentication
- **Products** - Drink catalog with variants
- **Orders** - Complete order management
- **Reviews** - Customer feedback system
- **Loyalty Points** - Rewards tracking
- **Events** - Event management and RSVPs
- **Blog Posts** - Content management
- **Gallery** - User-generated content

## 🔐 Security Features

- JWT-based authentication with secure cookies
- Password hashing with bcrypt
- Input validation with Zod schemas
- CSRF protection
- Rate limiting on API endpoints
- Secure environment variable handling

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized images with Next.js Image component
- Progressive Web App features

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Compatible with static export
- **AWS**: Use AWS Amplify or custom server setup
- **DigitalOcean**: Deploy with App Platform

## 📊 Analytics & Monitoring

- Google Analytics integration
- Stripe webhook monitoring
- Error tracking and logging
- Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software for the 1/2 Drinks brand.

## 🆘 Support

For technical support or questions:
- Email: tech@halfdrinks.com
- Documentation: [Internal Wiki]
- Issue Tracker: [GitHub Issues]

## 🔄 Version History

- **v1.0.0** - Initial release with core e-commerce functionality
- **v1.1.0** - Added custom drink creator
- **v1.2.0** - Implemented loyalty program
- **v1.3.0** - Added community features and admin dashboard

---

Built with ❤️ for the 1/2 Drinks community# Trigger Vercel redeploy
