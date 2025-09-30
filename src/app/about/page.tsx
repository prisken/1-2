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

export const metadata = {
  title: 'About Us - 1/2 Drinks',
  description: 'Learn about the story, mission, and values behind 1/2 Drinks. Discover our journey of creating healthy, beautiful beverages for modern women.',
  keywords: 'about us, 1/2 drinks story, healthy beverages, handmade drinks, company mission',
  openGraph: {
    title: 'About Us - 1/2 Drinks',
    description: 'Learn about the story, mission, and values behind 1/2 Drinks. Discover our journey of creating healthy, beautiful beverages for modern women.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - 1/2 Drinks',
    description: 'Learn about the story, mission, and values behind 1/2 Drinks. Discover our journey of creating healthy, beautiful beverages for modern women.',
  },
}

export default function AboutPage() {
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
              Our Story
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Crafting Healthy
              <br />
              <span className="text-rose-500">Beautiful</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Beverages</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Born from a passion for wellness and a love for vibrant flavors, 1/2 Drinks started with a simple idea: to make healthy choices exciting and accessible for the modern woman.
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
                  The 1/2 Drinks Journey
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                  Our unique two-tone beverages are a testament to our philosophy of blending complementary flavors and colors into a single, harmonious drink. Every bottle is a small work of art, crafted with fresh, high-quality ingredients and a whole lot of love.
                </p>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  We believe that what you drink should not only nourish your body but also delight your senses. That's why we've dedicated ourselves to creating beverages that are as beautiful as they are beneficial.
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
              Our Mission & Values
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated to quality, creativity, and your well-being. Every decision we make is guided by our core values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <ShieldCheckIcon className="h-8 w-8 text-blue-600" />,
                title: "Quality Ingredients",
                description: "We source only the freshest fruits, vegetables, and natural superfoods to ensure every sip is packed with goodness.",
                color: "from-blue-100 to-blue-200"
              },
              {
                icon: <LightBulbIcon className="h-8 w-8 text-purple-600" />,
                title: "Creative Blends",
                description: "Innovation is at our core. We constantly experiment to bring you exciting and unique flavor combinations.",
                color: "from-purple-100 to-purple-200"
              },
              {
                icon: <HeartIcon className="h-8 w-8 text-pink-600" />,
                title: "Customer Well-being",
                description: "Your health and happiness are our top priorities. We craft drinks that make you feel good, inside and out.",
                color: "from-pink-100 to-pink-200"
              },
              {
                icon: <GlobeAltIcon className="h-8 w-8 text-green-600" />,
                title: "Sustainability",
                description: "We're committed to eco-friendly practices, from sourcing to packaging, to protect our planet for future generations.",
                color: "from-green-100 to-green-200"
              },
              {
                icon: <UserGroupIcon className="h-8 w-8 text-orange-600" />,
                title: "Community First",
                description: "We believe in building a community of health-conscious individuals who support and inspire each other.",
                color: "from-orange-100 to-orange-200"
              },
              {
                icon: <SparklesIcon className="h-8 w-8 text-yellow-600" />,
                title: "Beauty in Every Sip",
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
              Meet Our Team
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

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Why Office Ladies
              <br className="sm:hidden" />
              <span className="text-rose-500"> Choose Us</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the unique needs of modern professional women and have designed our products and services accordingly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <TruckIcon className="h-8 w-8 text-rose-600" />,
                title: "Office Delivery",
                description: "Fresh drinks delivered directly to your workplace within 30 minutes",
                color: "from-rose-100 to-pink-200"
              },
              {
                icon: <GiftIcon className="h-8 w-8 text-purple-600" />,
                title: "Custom Orders",
                description: "Create your perfect drink with our easy-to-use custom builder",
                color: "from-purple-100 to-purple-200"
              },
              {
                icon: <ShieldCheckIcon className="h-8 w-8 text-green-600" />,
                title: "Health Focused",
                description: "Every ingredient is carefully selected for maximum health benefits",
                color: "from-green-100 to-green-200"
              },
              {
                icon: <StarIcon className="h-8 w-8 text-yellow-600" />,
                title: "Premium Quality",
                description: "We never compromise on quality, ensuring every drink is perfect",
                color: "from-yellow-100 to-yellow-200"
              }
            ].map((feature, index) => (
              <div key={index} className={`bg-gradient-to-br ${feature.color} p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center`}>
                <div className="flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl mb-4 md:mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Ready to Experience
              <br />
              <span className="text-yellow-300">Something Special?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-rose-100 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have discovered their perfect drink with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a 
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-4 bg-white text-rose-600 font-semibold rounded-2xl hover:bg-rose-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base min-h-[48px]"
              >
                Shop Our Collection
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </a>
              <a 
                href="/custom"
                className="inline-flex items-center justify-center px-6 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl text-base min-h-[48px]"
              >
                Create Custom Drink
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}