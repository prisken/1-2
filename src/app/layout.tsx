import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { CartProvider } from '@/components/providers/CartProvider'
import ClientOnly from '@/components/ClientOnly'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </ClientOnly>
      </body>
    </html>
  )
}