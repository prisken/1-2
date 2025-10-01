import React from 'react'
import Image from 'next/image'
import { 
  HeartIcon, 
  SparklesIcon, 
  StarIcon,
  CheckIcon,
  GiftIcon,
  TruckIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  LightBulbIcon,
  GlobeAltIcon
} from '@heroicons/react/24/solid'
import { 
  ArrowRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import {unstable_setRequestLocale} from 'next-intl/server'

export default function AboutPage({params}: {params: {locale: string}}) {
  unstable_setRequestLocale(params.locale)
  const t = useTranslations('about')
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20">
        {/* Background Elements */}
        <div className="hidden md:block absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-rose-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-25 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-rose-600 font-semibold text-sm">
              <HeartIcon className="h-4 w-4 mr-2" />
              {t('our_story')}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              {t('crafting_healthy')}
              <br />
              <span className="text-rose-500">{t('beautiful')}</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{t('beverages')}</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {t('intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Story Content */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  {t('journey')}
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                  {t('journey_desc1')}
                </p>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {t('journey_desc2')}
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gradient-to-br from-rose-100 to-pink-200 p-4 sm:p-6 rounded-2xl text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-rose-600 mb-2">500+</div>
                  <div className="text-sm sm:text-base text-gray-700">Happy Customers</div>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-indigo-200 p-4 sm:p-6 rounded-2xl text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-sm sm:text-base text-gray-700">Unique Flavors</div>
                </div>
              </div>
            </div>

            {/* Story Image */}
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="aspect-square bg-gradient-to-br from-rose-200 to-pink-300 rounded-2xl flex items-center justify-center">
                      <span className="text-4xl md:text-6xl">🍓</span>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-yellow-200 to-orange-300 rounded-2xl flex items-center justify-center">
                      <span className="text-4xl md:text-6xl">🥭</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="aspect-square bg-gradient-to-br from-green-200 to-emerald-300 rounded-2xl flex items-center justify-center">
                      <span className="text-4xl md:text-6xl">🥬</span>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-purple-200 to-indigo-300 rounded-2xl flex items-center justify-center">
                      <span className="text-4xl md:text-6xl">🫐</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              {t('mission_values')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('journey_desc2')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <ShieldCheckIcon className="h-8 w-8 text-blue-600" />,
                title: t('quality_ingredients'),
                description: "We source only the freshest fruits, vegetables, and natural superfoods to ensure every sip is packed with goodness.",
                color: "from-blue-100 to-blue-200"
              },
              {
                icon: <LightBulbIcon className="h-8 w-8 text-purple-600" />,
                title: t('creative_blends'),
                description: "Innovation is at our core. We constantly experiment to bring you exciting and unique flavor combinations.",
                color: "from-purple-100 to-purple-200"
              },
              {
                icon: <HeartIcon className="h-8 w-8 text-pink-600" />,
                title: t('customer_wellbeing'),
                description: "Your health and happiness are our top priorities. We craft drinks that make you feel good, inside and out.",
                color: "from-pink-100 to-pink-200"
              },
              {
                icon: <GlobeAltIcon className="h-8 w-8 text-green-600" />,
                title: t('sustainability'),
                description: "We're committed to eco-friendly practices, from sourcing to packaging, to protect our planet for future generations.",
                color: "from-green-100 to-green-200"
              },
              {
                icon: <UserGroupIcon className="h-8 w-8 text-orange-600" />,
                title: t('community_first'),
                description: "We believe in building a community of health-conscious individuals who support and inspire each other.",
                color: "from-orange-100 to-orange-200"
              },
              {
                icon: <SparklesIcon className="h-8 w-8 text-yellow-600" />,
                title: t('beauty_in_every_sip'),
                description: "We believe that healthy drinks should be as beautiful as they are nutritious, bringing joy to your daily routine.",
                color: "from-yellow-100 to-yellow-200"
              }
            ].map((value, index) => (
              <div key={index} className={`bg-gradient-to-br ${value.color} p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                <div className="flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl mb-4 md:mb-6">
                  {value.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">{value.title}</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              {t('team')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-rose-100 max-w-3xl mx-auto">
              The passionate people behind 1/2 Drinks, dedicated to bringing you the best healthy beverages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Founder & CEO",
                description: "Passionate about healthy living and beautiful design. Sarah started 1/2 Drinks to make wellness accessible and enjoyable for busy professionals.",
                emoji: "👩‍💼"
              },
              {
                name: "Maria Rodriguez",
                role: "Head of Product",
                description: "Our flavor expert with 10+ years in beverage development. Maria ensures every drink is perfectly balanced and delicious.",
                emoji: "👩‍🔬"
              },
              {
                name: "Emily Johnson",
                role: "Creative Director",
                description: "The artistic mind behind our beautiful packaging and visual identity. Emily believes that healthy drinks should be Instagram-worthy.",
                emoji: "👩‍🎨"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <span className="text-3xl md:text-4xl">{member.emoji}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-rose-200 text-sm md:text-base mb-4">{member.role}</p>
                <p className="text-rose-100 text-sm md:text-base leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


