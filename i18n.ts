export const locales = ['zh-Hant', 'en'] as const
export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'zh-Hant'
export const localePrefix = 'always'

export default {
  locales,
  defaultLocale,
  localePrefix
}


