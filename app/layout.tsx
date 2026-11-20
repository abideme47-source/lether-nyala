import { Analytics } from '@vercel/analytics/next'
import { SiteExperience } from '@/components/site/site-experience'
import { Anton, Inter, Playfair_Display } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-playfair', display: 'swap' })
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' })

export const metadata: Metadata = {
  title: 'Nyala | Leather Shoes, Boots, Bags & Belts in Addis Ababa',
  description: 'Nyala Shoe & Leather Products Factory in Addis Ababa makes shoes, boots, safety shoes, bags, belts and wallets. Call us to order.',
  openGraph: {
    type: 'website',
    siteName: 'Nyala Shoe & Leather Products Factory',
    title: 'Nyala | Leather Shoes, Boots, Bags & Belts in Addis Ababa',
    description: 'Nyala Shoe & Leather Products Factory in Addis Ababa makes shoes, boots, safety shoes, bags, belts and wallets. Call us to order.',
    images: [{ url: 'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1200&h=630&q=70', width: 1200, height: 630, alt: 'Leather shoes in a Nyala workshop' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nyala | Leather Shoes, Boots, Bags & Belts in Addis Ababa',
    description: 'Nyala Shoe & Leather Products Factory in Addis Ababa makes shoes, boots, safety shoes, bags, belts and wallets. Call us to order.',
    images: ['https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1200&h=630&q=70'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#191816',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${anton.variable} antialiased`}>
        <SiteExperience>{children}</SiteExperience>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
