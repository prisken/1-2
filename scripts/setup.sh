#!/bin/bash

# 1/2 Drinks Website Setup Script
# This script sets up the development environment for the 1/2 Drinks website

set -e

echo "🍹 Setting up 1/2 Drinks Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npm run db:generate

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    cp .env.example .env.local
    echo "📝 Please update .env.local with your actual configuration values:"
    echo "   - DATABASE_URL: PostgreSQL connection string"
    echo "   - JWT_SECRET: Random secret for JWT tokens"
    echo "   - STRIPE_*: Stripe API keys"
    echo "   - SENDGRID_API_KEY: SendGrid API key"
    echo "   - CLOUDINARY_*: Cloudinary configuration"
    echo ""
    echo "After updating .env.local, run:"
    echo "   npm run db:push"
    echo "   npm run db:seed"
    echo ""
fi

# Check if database is configured
if grep -q "postgresql://username:password@localhost:5432/half_drinks_db" .env.local; then
    echo "⚠️  Database URL is still using default values. Please update .env.local with your actual database connection string."
    echo "   Example: postgresql://user:password@localhost:5432/half_drinks_db"
    echo ""
fi

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your configuration"
echo "2. Set up your PostgreSQL database"
echo "3. Run: npm run db:push"
echo "4. Run: npm run db:seed"
echo "5. Run: npm run dev"
echo ""
echo "The website will be available at http://localhost:3000"
echo ""
echo "Default admin credentials:"
echo "Email: admin@halfdrinks.com"
echo "Password: admin123"
echo ""
echo "Default customer credentials:"
echo "Email: customer@example.com"
echo "Password: customer123"


