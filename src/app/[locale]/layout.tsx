import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { CartProvider } from '@/components/providers/CartProvider'
import ClientOnly from '@/components/ClientOnly'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import { Toaster } from 'react-hot-toast'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages, unstable_setRequestLocale} from 'next-intl/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '1/2 Drinks - Handmade Healthy Beverages',
  description: 'Discover our unique two-tone handmade drinks. Healthy, delicious, and beautifully crafted beverages for every taste.',
  keywords: 'healthy drinks, handmade beverages, custom drinks, smoothies, juices, 1/2 drinks',
  openGraph: {
    title: '1/2 Drinks - Handmade Healthy Beverages',
    description: 'Discover our unique two-tone handmade drinks. Healthy, delicious, and beautifully crafted beverages for every taste.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1/2 Drinks - Handmade Healthy Beverages',
    description: 'Discover our unique two-tone handmade drinks. Healthy, delicious, and beautifully crafted beverages for every taste.',
  },
}

export async function generateStaticParams() {
  return [{ locale: 'zh-Hant' }, { locale: 'en' }]
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={params.locale} messages={messages as any}>
      <ClientOnly>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Header />
            {children}
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </ClientOnly>
    </NextIntlClientProvider>
  )
}


