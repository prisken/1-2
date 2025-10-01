import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '1/2 Drinks',
  description: 'Healthy, beautiful beverages'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}


