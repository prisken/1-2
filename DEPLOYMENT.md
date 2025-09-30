# Deployment Guide - 1/2 Drinks Website

This guide covers deploying the 1/2 Drinks website to production environments.

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account
- All required API keys and services configured

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   In Vercel dashboard, add these environment variables:
   ```
   DATABASE_URL=postgresql://user:pass@host:port/db
   JWT_SECRET=your-super-secret-jwt-key
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   SENDGRID_API_KEY=SG...
   FROM_EMAIL=noreply@yourdomain.com
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

## 🗄️ Database Setup

### Option 1: Vercel Postgres (Recommended for Vercel)
1. In Vercel dashboard, go to Storage tab
2. Create a new Postgres database
3. Copy the connection string to `DATABASE_URL`

### Option 2: External Database
- **Supabase**: Free tier available, easy setup
- **PlanetScale**: MySQL-compatible, serverless
- **Railway**: Simple PostgreSQL hosting
- **AWS RDS**: Enterprise-grade solution

### Database Migration
After setting up the database:
```bash
# Generate Prisma client
npm run db:generate

# Push schema to production database
DATABASE_URL="your-production-db-url" npm run db:push

# Seed with initial data
DATABASE_URL="your-production-db-url" npm run db:seed
```

## 🔧 Required Services Setup

### 1. Stripe (Payment Processing)
1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard > Developers > API keys
3. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
4. Configure webhook events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

### 2. SendGrid (Email Service)
1. Create account at [sendgrid.com](https://sendgrid.com)
2. Create API key with "Mail Send" permissions
3. Verify sender email address
4. Configure domain authentication (recommended)

### 3. Cloudinary (Image Management)
1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get cloud name, API key, and API secret from dashboard
3. Configure upload presets for different image types

### 4. Instagram API (Optional)
1. Create Facebook Developer account
2. Create Instagram Basic Display app
3. Get access token for your Instagram account
4. Configure webhook for real-time updates

## 🌐 Domain and SSL

### Custom Domain
1. **Vercel**: Add domain in project settings
2. **DNS**: Point your domain to Vercel
3. **SSL**: Automatically handled by Vercel

### Environment-Specific URLs
Update these in your environment variables:
```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 📊 Analytics and Monitoring

### Google Analytics
1. Create GA4 property
2. Add tracking ID to environment variables:
   ```
   GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

### Error Monitoring
Consider adding:
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and error tracking
- **Vercel Analytics**: Built-in performance monitoring

## 🔒 Security Checklist

### Environment Variables
- [ ] All secrets are in environment variables
- [ ] No hardcoded API keys in code
- [ ] Database credentials are secure
- [ ] JWT secret is strong and unique

### API Security
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] CORS properly configured
- [ ] Webhook signatures verified

### Database Security
- [ ] Database access restricted to application
- [ ] Regular backups configured
- [ ] Connection strings use SSL
- [ ] User permissions are minimal

## 🚀 Performance Optimization

### Image Optimization
- [ ] Next.js Image component used
- [ ] Cloudinary transformations configured
- [ ] WebP format enabled
- [ ] Lazy loading implemented

### Caching
- [ ] Static generation for product pages
- [ ] API response caching
- [ ] CDN configured for assets
- [ ] Database query optimization

### Bundle Optimization
- [ ] Code splitting implemented
- [ ] Unused dependencies removed
- [ ] Bundle analyzer used
- [ ] Tree shaking enabled

## 📱 Mobile Optimization

### PWA Features
- [ ] Service worker configured
- [ ] App manifest created
- [ ] Offline functionality
- [ ] Push notifications (optional)

### Mobile Testing
- [ ] Responsive design verified
- [ ] Touch interactions tested
- [ ] Performance on mobile devices
- [ ] App store optimization (if applicable)

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run db:generate
      - run: npm run db:push
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

## 🧪 Testing Before Launch

### Functional Testing
- [ ] User registration and login
- [ ] Product browsing and filtering
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] Payment processing
- [ ] Email notifications
- [ ] Admin dashboard

### Performance Testing
- [ ] Page load times < 3 seconds
- [ ] Mobile performance score > 90
- [ ] Database query optimization
- [ ] Image loading optimization

### Security Testing
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Authentication security
- [ ] API endpoint security

## 📈 Post-Launch Monitoring

### Key Metrics to Track
- **Performance**: Page load times, Core Web Vitals
- **Business**: Conversion rates, cart abandonment
- **Technical**: Error rates, API response times
- **User**: Session duration, bounce rate

### Monitoring Tools
- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: User behavior tracking
- **Stripe Dashboard**: Payment monitoring
- **Database Monitoring**: Query performance

## 🆘 Troubleshooting

### Common Issues

**Database Connection Errors**
- Check DATABASE_URL format
- Verify database is accessible
- Check firewall settings

**Stripe Webhook Failures**
- Verify webhook URL is correct
- Check webhook secret
- Ensure HTTPS is enabled

**Image Upload Issues**
- Verify Cloudinary credentials
- Check file size limits
- Validate image formats

**Email Delivery Problems**
- Check SendGrid API key
- Verify sender email
- Check spam filters

### Support Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 📞 Support

For deployment issues:
- Check the troubleshooting section above
- Review application logs in Vercel dashboard
- Contact the development team
- Create an issue in the project repository

---

**Remember**: Always test in a staging environment before deploying to production!


