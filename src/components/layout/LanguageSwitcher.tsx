'use client'

import {useLocale} from 'next-intl'
import {Link, usePathname, getPathname} from '@/i18n/routing'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const safePath = (pathname ?? '/') as any
  const other = locale === 'zh-Hant' ? 'en' : 'zh-Hant'

  return (
    <Link
      href={safePath}
      locale={other as any}
      className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300 min-h-[44px]"
    >
      {other === 'zh-Hant' ? '中文' : 'EN'}
    </Link>
  )
}


