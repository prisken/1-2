import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { CartProvider } from '@/components/providers/CartProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ClientOnly from '@/components/ClientOnly'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '1/2 Drinks - Handmade Healthy Beverages',
  description: 'Discover our unique two-tone handmade drinks. Healthy, delicious, and beautifully crafted beverages for every taste.',
  keywords: 'healthy drinks, handmade beverages, smoothies, juices, custom drinks',
  authors: [{ name: '1/2 Drinks' }],
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
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        <ClientOnly>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#4ade80',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    duration: 5000,
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </CartProvider>
          </AuthProvider>
        </ClientOnly>
      </body>
    </html>
  )
}