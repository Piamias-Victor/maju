// components/organisms/ProductHero.tsx
// Section héro avec titre accrocheur, image produit et CTA principal
// Optimisations: mobile-first, parallax, conversion-focused
// SEO: H1 optimisé, microdonnées produit

'use client';

import { motion } from 'framer-motion';
import { HeroTitle } from '@/components/atoms/Heading';
import { Button } from '@/components/atoms/Button';
import { Image } from '@/components/atoms/Image';
import { PriceDisplay } from '@/components/molecules/PriceDisplay';
import { ColorSelector } from '@/components/molecules/ColorSelector';

export const ProductHero: React.FC = () => {
  const scrollToCheckout = () => {
    document.getElementById('checkout-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          
          {/* Contenu textuel - GAUCHE */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-1 lg:order-1"
          >
            {/* Badge de crédibilité */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-neutral-700 mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Conçu par des nutritionnistes
            </div>

            {/* Titre principal H1 SEO-optimisé */}
            <HeroTitle as="h1" className="mb-8">
              L&apos;ustensile qui révolutionne 
              <span className="block">vos repas équilibrés</span>
            </HeroTitle>

            {/* Prix et sélecteur de couleur */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6 mb-8">
              <PriceDisplay
                currentPrice={39.99}
                originalPrice={59.99}
                size="lg"
                highlight
                showSavings
                showPercentage
              />
              
              <div className="sm:ml-6">
                <ColorSelector
                  defaultColor="rose"
                  size="md"
                />
              </div>
            </div>

            {/* CTA + Livraison côte à côte */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
              <Button
                variant="primary"
                size="xl"
                className="shadow-2xl hover:shadow-glow"
                onClick={scrollToCheckout}
              >
                🛒 Commander maintenant
              </Button>

              {/* Livraison gratuite à côté */}
              <div className="bg-white/80 backdrop-blur-sm border-2 border-primary-200 rounded-xl px-4 py-4 flex items-center gap-2">
                <span className="text-xl">🚚</span>
                <span className="text-primary-700 font-semibold text-sm">
                  Livraison GRATUITE<br />
                </span>
              </div>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-neutral-600">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full border-2 border-white" />
                ))}
              </div>
              <span>+55 000 utilisateurs satisfaits</span>
            </div>
          </motion.div>

          {/* Image produit - DROITE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-2"
          >
            <div className="relative max-w-lg mx-auto lg:mx-0 lg:ml-auto">
              <Image
                src="https://www.MAJU-nutrition.com/cdn/shop/files/MAJU-bol-rose-explication-compartiments.jpg"
                alt="Bol MAJU rose - Explication des 3 compartiments modulables pour portions équilibrées"
                width={500}
                height={500}
                className="w-full h-auto max-w-full"
                priority
                rounded="2xl"
              />
              
              {/* Badge flottant */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-primary-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                Nouveau !
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};