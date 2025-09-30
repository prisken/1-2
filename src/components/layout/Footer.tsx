import Link from 'next/link'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  HeartIcon,
  SparklesIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'Smoothies', href: '/shop?category=SMOOTHIES' },
      { name: 'Juices', href: '/shop?category=JUICES' },
      { name: 'Teas', href: '/shop?category=TEAS' },
      { name: 'Custom Drinks', href: '/custom' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/about#story' },
      { name: 'Meet the Team', href: '/about#team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  }

  return (
    <footer className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 border-t border-rose-100">
      {/* Main Footer - Mobile optimized */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Brand Section - Full width on mobile */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <HeartSolidIcon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <SparklesIcon className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  1/2 Drinks
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">Handcrafted with Love</p>
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base max-w-md">
              Creating beautiful, healthy beverages for the modern woman. 
              Every drink is crafted with love and the finest ingredients.
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600">4.9/5 from 500+ reviews</span>
            </div>

            {/* Contact Info - Mobile optimized */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <EnvelopeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">hello@halfdrinks.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">123 Wellness Street, Health City</span>
              </div>
            </div>
          </div>

          {/* Shop Links - Mobile optimized */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Shop</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm sm:text-base block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links - Mobile optimized */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm sm:text-base block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links - Mobile optimized */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm sm:text-base block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section - Mobile optimized */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              Stay in the Loop! 💌
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-rose-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Get exclusive offers, new flavor announcements, and wellness tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 text-gray-900 placeholder-gray-500 text-sm sm:text-base min-h-[48px]"
              />
              <button className="px-6 sm:px-8 py-3 bg-white text-rose-600 font-semibold rounded-xl hover:bg-rose-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base min-h-[48px]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Mobile optimized */}
      <div className="bg-white/50 backdrop-blur-sm border-t border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="flex items-center space-x-4 md:space-x-6">
              <p className="text-gray-600 text-xs sm:text-sm text-center md:text-left">
                © {currentYear} 1/2 Drinks. Made with <HeartIcon className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500 inline" /> for you.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-6">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-xs sm:text-sm text-gray-600 hover:text-rose-600 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}