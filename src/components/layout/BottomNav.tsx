'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { HomeIcon, ShoppingBagIcon, SparklesIcon, UserIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/components/providers/CartProvider'

export default function BottomNav() {
  const t = useTranslations('common')
  const pathname = usePathname()
  const { itemCount, openCart } = useCart()

  const isActive = (path: string) => {
    if (!pathname) return false
    if (path === '/') return pathname === '/' || pathname.split('/').filter(Boolean).length === 1
    return pathname.startsWith(path)
  }

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-t border-gray-200 safe-area-inset">
      <div className="max-w-7xl mx-auto">
        <ul className="grid grid-cols-4 gap-1 px-2 py-2">
          <li>
            <Link
              href="/"
              className={`flex flex-col items-center justify-center py-2 rounded-xl ${
                isActive('/') ? 'text-rose-600' : 'text-gray-600'
              }`}
            >
              <HomeIcon className="h-6 w-6" />
              <span className="text-xs mt-1">{t('home')}</span>
            </Link>
          </li>
          <li>
            <Link
              href="/shop"
              className={`flex flex-col items-center justify-center py-2 rounded-xl ${
                isActive('/shop') ? 'text-rose-600' : 'text-gray-600'
              }`}
            >
              <SparklesIcon className="h-6 w-6" />
              <span className="text-xs mt-1">{t('shop')}</span>
            </Link>
          </li>
          <li>
            <button
              onClick={openCart}
              className="relative flex flex-col items-center justify-center py-2 rounded-xl text-gray-600"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 right-6 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-rose-600 text-white text-[10px] font-semibold">
                  {itemCount}
                </span>
              )}
              <span className="text-xs mt-1">{t('cart')}</span>
            </button>
          </li>
          <li>
            <Link
              href="/about"
              className={`flex flex-col items-center justify-center py-2 rounded-xl ${
                isActive('/about') ? 'text-rose-600' : 'text-gray-600'
              }`}
            >
              <UserIcon className="h-6 w-6" />
              <span className="text-xs mt-1">{t('about')}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}


