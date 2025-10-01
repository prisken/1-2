import {createLocalizedPathnamesNavigation, Pathnames} from 'next-intl/navigation'
import {locales, localePrefix} from '../../i18n'

export type AppLocale = typeof locales[number]

export const pathnames = {
  '/': '/',
  '/about': '/about',
  '/shop': '/shop',
  '/custom': '/custom',
  '/products/[slug]': '/products/[slug]',
  '/careers': '/careers',
  '/press': '/press',
  '/contact': '/contact',
  '/faq': '/faq',
  '/shipping': '/shipping',
  '/returns': '/returns',
  '/size-guide': '/size-guide',
  '/privacy': '/privacy',
  '/terms': '/terms',
  '/cookies': '/cookies',
  '/accessibility': '/accessibility'
} satisfies Pathnames<typeof locales>

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({
    locales: Array.from(locales),
    localePrefix,
    pathnames
  })


