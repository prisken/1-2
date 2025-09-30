'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/components/providers/CartProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FeaturedDrinks from '@/components/home/FeaturedDrinks'
import BrandStory from '@/components/home/BrandStory'
import InstagramFeed from '@/components/home/InstagramFeed'
import NewsletterSignup from '@/components/home/NewsletterSignup'
import QuickLinks from '@/components/home/QuickLinks'
import LoyaltyTeaser from '@/components/home/LoyaltyTeaser'
import CartDrawer from '@/components/cart/CartDrawer'
import AuthModal from '@/components/auth/AuthModal'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    // Simulate loading time for smooth experience
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading 1/2 Drinks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                🍹 1/2 Drinks
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Handmade Healthy Beverages
              </p>
              <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                Discover our unique two-tone handmade drinks. Healthy, delicious, and beautifully crafted beverages for every taste.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/shop'}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Shop Now
                </button>
                <button 
                  onClick={() => window.location.href = '/custom'}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Create Custom Drink
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Drinks */}
        <FeaturedDrinks />

        {/* Brand Story */}
        <BrandStory />

        {/* Quick Links */}
        <QuickLinks />

        {/* Instagram Feed */}
        <InstagramFeed />

        {/* Loyalty Program Teaser */}
        <LoyaltyTeaser />

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>

      <Footer />
      <CartDrawer />
    </div>
  )
}