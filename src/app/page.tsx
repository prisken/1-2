'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import Link from 'next/link'
import { 
  HeartIcon, 
  SparklesIcon, 
  StarIcon,
  ArrowRightIcon,
  CheckIcon,
  GiftIcon,
  TruckIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  UserIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/solid'
import { 
  PlayIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { user: authUser } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-rose-200 border-t-rose-500 mx-auto mb-6"></div>
          <p className="text-rose-600 text-lg font-medium">Loading your perfect drinks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Hero Section - Mobile First */}
      <section className="relative overflow-hidden">
        {/* Background Elements - Hidden on mobile for performance */}
        <div className="hidden md:block absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-rose-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-25 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content - Mobile Optimized */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-rose-600 font-semibold text-sm">
                  <SparklesIcon className="h-4 w-4 mr-2" />
                  Handcrafted with Love
                </div>
                
                {/* Mobile-first typography */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  Your Perfect
                  <br />
                  <span className="text-rose-500">Two-Tone</span>
                  <br />
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Drink Awaits</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Discover our exclusive collection of healthy, beautiful beverages designed for the modern woman who deserves the best.
                </p>
              </div>

              {/* Mobile-optimized buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link 
                  href="/shop"
                  className="group inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base min-h-[48px]"
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-2" />
                  Shop Now
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/custom"
                  className="group inline-flex items-center justify-center px-6 py-4 bg-white/90 backdrop-blur-sm text-rose-600 font-semibold rounded-2xl border-2 border-rose-200 hover:bg-rose-50 transition-all duration-300 shadow-lg hover:shadow-xl text-base min-h-[48px]"
                >
                  <HeartIcon className="h-5 w-5 mr-2" />
                  Create Custom
                </Link>
              </div>

              {/* Stats - Mobile optimized grid */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 md:pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-rose-600">500+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-pink-600">50+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Unique Flavors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">4.9★</div>
                  <div className="text-xs sm:text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>

            {/* Right Content - Mobile optimized */}
            <div className="relative order-first lg:order-last">
              <div className="relative z-10">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-3 md:space-y-4">
                      <div className="aspect-square bg-gradient-to-br from-rose-200 to-pink-300 rounded-xl md:rounded-2xl flex items-center justify-center">
                        <span className="text-2xl md:text-4xl">🍓</span>
                      </div>
                      <div className="aspect-square bg-gradient-to-br from-purple-200 to-indigo-300 rounded-xl md:rounded-2xl flex items-center justify-center">
                        <span className="text-2xl md:text-4xl">🥭</span>
                      </div>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <div className="aspect-square bg-gradient-to-br from-yellow-200 to-orange-300 rounded-xl md:rounded-2xl flex items-center justify-center">
                        <span className="text-2xl md:text-4xl">🍍</span>
                      </div>
                      <div className="aspect-square bg-gradient-to-br from-green-200 to-emerald-300 rounded-xl md:rounded-2xl flex items-center justify-center">
                        <span className="text-2xl md:text-4xl">🥥</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements - Hidden on mobile */}
              <div className="hidden md:block absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-80 animate-bounce"></div>
              <div className="hidden md:block absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-80 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Mobile First */}
      <section className="py-12 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center px-3 py-1.5 bg-rose-100 rounded-full text-rose-600 font-semibold text-sm mb-4">
              <StarIcon className="h-4 w-4 mr-2" />
              Featured Collection
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Our Most Loved
              <span className="text-rose-500"> Drinks</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Handpicked favorites that our customers can't get enough of
            </p>
          </div>

          {/* Mobile-first product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                name: "Strawberry Vanilla Dream",
                price: "$6.99",
                image: "🍓",
                description: "A perfect blend of fresh strawberries and creamy vanilla",
                rating: 4.9,
                reviews: 128
              },
              {
                name: "Mango Coconut Bliss",
                price: "$7.99",
                image: "🥭",
                description: "Tropical mango with rich coconut cream",
                rating: 4.8,
                reviews: 95
              },
              {
                name: "Blueberry Almond Delight",
                price: "$6.49",
                image: "🫐",
                description: "Antioxidant-rich blueberries with almond milk",
                rating: 4.9,
                reviews: 156
              }
            ].map((product, index) => (
              <div key={index} className="group bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="aspect-square bg-gradient-to-br from-rose-100 to-pink-200 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl md:text-6xl">{product.image}</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">{product.name}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-semibold">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-rose-600">{product.price}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 md:py-4 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-sm md:text-base min-h-[48px]">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/shop"
              className="inline-flex items-center px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base min-h-[48px]"
            >
              View All Products
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Mobile optimized */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Why Office Ladies
              <br className="sm:hidden" />
              <span className="text-yellow-300"> Love Us</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-rose-100 max-w-2xl mx-auto px-4">
              We understand what modern women need - healthy, beautiful, and convenient drinks
            </p>
          </div>

          {/* Mobile-first feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <HeartIcon className="h-6 w-6 md:h-8 md:w-8" />,
                title: "Made with Love",
                description: "Every drink is handcrafted with care and attention to detail"
              },
              {
                icon: <ShieldCheckIcon className="h-6 w-6 md:h-8 md:w-8" />,
                title: "100% Natural",
                description: "Only the finest organic ingredients, no artificial additives"
              },
              {
                icon: <TruckIcon className="h-6 w-6 md:h-8 md:w-8" />,
                title: "Fast Delivery",
                description: "Fresh drinks delivered to your office within 30 minutes"
              },
              {
                icon: <GiftIcon className="h-6 w-6 md:h-8 md:w-8" />,
                title: "Custom Orders",
                description: "Create your perfect drink with our custom builder"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center space-y-3 md:space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold">{feature.title}</h3>
                <p className="text-rose-100 text-sm md:text-base leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile optimized */}
      <section className="py-12 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Ready to Experience
              <br />
              <span className="text-rose-500">Something Special?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have discovered their perfect drink
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link 
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base min-h-[48px]"
              >
                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                Start Shopping
              </Link>
              <Link 
                href="/custom"
                className="inline-flex items-center justify-center px-6 py-4 bg-white text-rose-600 font-semibold rounded-2xl border-2 border-rose-200 hover:bg-rose-50 transition-all duration-300 shadow-lg hover:shadow-xl text-base min-h-[48px]"
              >
                <HeartIcon className="h-5 w-5 mr-2" />
                Create Custom Drink
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}