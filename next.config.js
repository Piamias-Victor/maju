/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'www.MAJU-nutrition.com',
      'MAJU-nutrition.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Optimisations de performance
  poweredByHeader: false,
  compress: true,
  // Configuration pour les builds de production
  output: 'standalone',
}

module.exports = nextConfig