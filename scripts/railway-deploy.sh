#!/bin/bash

# Railway deployment script
echo "🚂 Starting Railway deployment..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is not set"
    exit 1
fi

echo "✅ DATABASE_URL is set"

# Run database migrations if needed
echo "🔄 Running database migrations..."
npx prisma migrate deploy || echo "⚠️ Migration failed, continuing..."

# Push schema if migrations fail
echo "🔄 Pushing schema as fallback..."
npx prisma db push || echo "⚠️ Schema push failed, continuing..."

# Start the application
echo "🚀 Starting Next.js application..."
exec npm start
