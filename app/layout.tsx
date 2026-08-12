import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Oxanium } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { Footer } from '@/components/footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const oxanium = Oxanium({
  subsets: ['latin'],
  variable: '--font-oxanium',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LENS LOKA — Every Visual Need. One Platform.',
  description:
    'LENS LOKA connects you with world-class creators for fashion shoots, bridal editorials, product campaigns and more. Every visual need, one platform.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${oxanium.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <SiteHeader />
        {children}
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
