'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Bars3Icon, 
  XMarkIcon, 
  ShoppingBagIcon, 
  UserIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useAuth } from '@/components/providers/AuthProvider'
import { useCart } from '@/components/providers/CartProvider'
import CartDrawer from '@/components/cart/CartDrawer'
import AuthModal from '@/components/auth/AuthModal'

const navigation = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'Shop', href: '/shop', icon: '🛍️' },
  { name: 'Custom', href: '/custom', icon: '✨' },
  { name: 'About', href: '/about', icon: '💖' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { user, logout } = useAuth()
  const { items, openCart } = useCart()
  const router = useRouter()

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-rose-200 shadow-lg">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 sm:p-4 lg:px-8" aria-label="Global">
          {/* Logo - Mobile optimized */}
          <div className="flex lg:flex-1">
            <Link href="/" className="group flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <HeartSolidIcon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <SparklesIcon className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  1/2 Drinks
                </span>
                <span className="text-xs text-gray-500 -mt-1 hidden sm:block">Handcrafted with Love</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex lg:gap-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-all duration-300"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right side actions - Mobile optimized */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - Hidden on small mobile */}
            <button className="hidden sm:block p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300 min-h-[44px] min-w-[44px]">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            {/* Cart - Mobile optimized */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300 group min-h-[44px] min-w-[44px]"
            >
              <ShoppingBagIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Menu - Mobile optimized */}
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                    <UserIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden md:block">{user.firstName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300 min-h-[44px]"
                >
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">👤</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[44px]"
              >
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Login</span>
              </button>
            )}

            {/* Mobile menu button - Always visible on mobile */}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300 min-h-[44px] min-w-[44px]"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </nav>

        {/* Mobile menu - Full screen on mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <HeartSolidIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">1/2 Drinks</span>
                </div>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300 min-h-[44px] min-w-[44px]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="px-4 py-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-4 rounded-xl text-base font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 min-h-[56px]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 px-4 py-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl min-h-[56px]">
                        <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-700">{user.firstName}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-4 text-left text-base font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all duration-300 min-h-[56px]"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setAuthModalOpen(true)
                        setMobileMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 min-h-[56px]"
                    >
                      <UserIcon className="h-4 w-4" />
                      <span>Login</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
      
      {/* Cart Drawer */}
      <CartDrawer />
    </>
  )
}