// components/organisms/Header.tsx
// Header avec logo, titre, bandeau promo et timer intégré
// Optimisations: sticky header, glass effect, CTA visible, panier intégré
// Mobile-first: responsive design

'use client';

import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Image } from '@/components/atoms/Image';
import { Button } from '@/components/atoms/Button';
import { TimerDisplay } from '@/components/atoms/TimerDisplay';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Bandeau promo en haut - STICKY avec Timer */}
      <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 text-center text-sm font-medium z-50">
        <div className="flex items-center justify-center gap-2 max-w-6xl mx-auto">
          <span className="animate-pulse">🔥</span>
          <span className="hidden sm:inline">
            <strong>Offre limitée :</strong> Économisez 10€ sur votre Bol MAJU -
          </span>
          <span className="sm:hidden">
            <strong>Offre limitée :</strong>
          </span>
          <TimerDisplay variant="banner" showIcon={false} />
          <span className="animate-pulse">🔥</span>
        </div>
      </div>

      {/* Header principal */}
      <header
        className={clsx(
          'sticky top-[50px] md:top-[40px] z-40 transition-all duration-300',
          isScrolled
            ? 'backdrop-blur-md bg-white/90 shadow-lg border-b border-white/20'
            : 'bg-transparent',
          className
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo et titre */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <Image
                  src="/images/logo-MAJU-placeholder.svg"
                  alt="Logo Bol MAJU"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 leading-tight">
                  Bol MAJU
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 hidden sm:block">
                  L&apos;allié santé par des nutritionnistes
                </p>
              </div>
            </div>

            {/* CTA Mobile/Desktop */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Prix visible */}
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-xs text-neutral-500 line-through">
                  59,99€
                </span>
                <span className="text-lg font-bold text-primary-500">
                  39,99€
                </span>
              </div>
              
              {/* Bouton CTA */}
              <Button
                variant="primary"
                size="md"
                className="hidden sm:inline-flex"
                onClick={openModal}
              >
                Commander maintenant
              </Button>
              
              {/* Version mobile */}
              <Button
                variant="primary"
                size="sm"
                className="sm:hidden text-xs px-3 py-2"
                onClick={openModal}
              >
                Commander
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};