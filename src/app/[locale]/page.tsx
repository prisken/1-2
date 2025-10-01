'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { Link } from '@/i18n/routing'
import { 
  HeartIcon, 
  SparklesIcon, 
  StarIcon,
  ArrowRightIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations()
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
          <p className="text-rose-600 text-lg font-medium">{t('home.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hidden md:block absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-rose-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-25 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-rose-600 font-semibold text-sm">
                  <SparklesIcon className="h-4 w-4 mr-2" />
                  {t('home.handcrafted')}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  {t('home.hero_title_1')}
                  <br />
                  <span className="text-rose-500">{t('home.hero_title_2')}</span>
                  <br />
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{t('home.hero_title_3')}</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {t('home.hero_desc')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link 
                  href="/shop"
                  className="group inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base min-h-[48px]"
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-2" />
                  {t('home.shop_now')}
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/custom"
                  className="group inline-flex items-center justify-center px-6 py-4 bg-white/90 backdrop-blur-sm text-rose-600 font-semibold rounded-2xl border-2 border-rose-200 hover:bg-rose-50 transition-all duration-300 shadow-lg hover:shadow-xl text-base min-h-[48px]"
                >
                  <HeartIcon className="h-5 w-5 mr-2" />
                  {t('home.create_custom')}
                </Link>
              </div>
            </div>

            {/* Right Content */}
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
              <div className="hidden md:block absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-80 animate-bounce"></div>
              <div className="hidden md:block absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-80 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center px-3 py-1.5 bg-rose-100 rounded-full text-rose-600 font-semibold text-sm mb-4">
              <StarIcon className="h-4 w-4 mr-2" />
              {t('home.featured_collection')}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              {t('home.our_most_loved')} <span className="text-rose-500">{t('home.drinks')}</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              {t('home.handpicked_favorites')}
            </p>
          </div>

          {/* Product grid (example) */}
          <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/shop"
              className="inline-flex items-center px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base min-h-[48px]"
            >
              {t('home.view_all_products')}
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {t('home.cta_title_1')}
              <br />
              <span className="text-rose-500">{t('home.cta_title_2')}</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.cta_desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link 
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base min-h-[48px]"
              >
                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                {t('home.start_shopping')}
              </Link>
              <Link 
                href="/custom"
                className="inline-flex items-center justify-center px-6 py-4 bg-white text-rose-600 font-semibold rounded-2xl border-2 border-rose-200 hover:bg-rose-50 transition-all duration-300 shadow-lg hover:shadow-xl text-base min-h-[48px]"
              >
                <HeartIcon className="h-5 w-5 mr-2" />
                {t('home.create_custom_drink')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


