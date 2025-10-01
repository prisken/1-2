import createMiddleware from 'next-intl/middleware'
import {locales, defaultLocale, localePrefix} from './i18n'

export default createMiddleware({
  defaultLocale,
  locales: Array.from(locales),
  localePrefix
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}


