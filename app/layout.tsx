// app/layout.tsx
// Layout principal Next.js 14 avec méta-données SEO optimisées pour le marché français
// Performance: preload fonts, CSP headers, viewport optimization
// SEO: Open Graph, Twitter Cards, JSON-LD structured data

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AnimatedBackground } from '@/components/atoms/AnimatedBackground'
import { CartProvider } from '@/contexts/CartContext'
import { CartModal } from '@/components/organisms/CartModal'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ec4899',
}

export const metadata: Metadata = {
  title: 'Bol juma - L\'allié santé conçu par des nutritionnistes | Made in France',
  description: 'Découvrez le Bol juma, l\'ustensile révolutionnaire pour manger équilibré sans effort. 3 compartiments modulables, accompagnement personnalisé, 93% de satisfaction. Made in France.',
  keywords: [
    'bol juma',
    'nutrition france',
    'repas équilibrés',
    'portions contrôlées',
    'perte de poids',
    'diététique',
    'made in france',
    'nutritionniste',
    'compartiments modulables',
    'sans BPA'
  ],
  authors: [{ name: 'Bol juma' }],
  creator: 'Bol juma',
  publisher: 'Bol juma',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bol-juma.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: 'Bol juma',
    title: 'Bol juma - L\'allié santé conçu par des nutritionnistes',
    description: 'L\'ustensile révolutionnaire pour manger équilibré sans effort. 3 compartiments modulables, Made in France, 93% de satisfaction.',
    images: [
      {
        url: '/images/bol-juma-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bol juma - Ustensile nutrition avec compartiments modulables',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-neutral-900 selection:bg-primary-500/20`}>
        <CartProvider>
        <AnimatedBackground />
        <div className="relative z-10">
          {children}
        </div>
        <CartModal />
        </CartProvider>
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Bol juma",
              "description": "L'ustensile révolutionnaire pour manger équilibré sans effort. 3 compartiments modulables, Made in France.",
              "brand": {
                "@type": "Brand",
                "name": "juma"
              },
              "category": "Ustensile de cuisine",
              "offers": {
                "@type": "Offer",
                "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://bol-juma.fr',
                "priceCurrency": "EUR",
                "price": "39.99",
                "priceValidUntil": "2025-12-31",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Bol juma"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1247",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Marie L."
                  },
                  "reviewBody": "Révolutionnaire ! Plus besoin de peser mes aliments, le Bol juma fait tout pour moi."
                }
              ]
            })
          }}
        />
      </body>
    </html>
  )
}