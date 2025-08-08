// components/molecules/PriceDisplay.tsx
// Affichage optimisé des prix pour maximiser les conversions
// Dépendances: clsx
// Psychologie: prix barré, économies mises en avant, urgence

'use client';

import { clsx } from 'clsx';

interface PriceDisplayProps {
  currentPrice: number;
  originalPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSavings?: boolean;
  showPercentage?: boolean;
  className?: string;
  highlight?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  currentPrice,
  originalPrice,
  currency = '€',
  size = 'md',
  showSavings = true,
  showPercentage = true,
  className,
  highlight = false,
}) => {
  const savings = originalPrice ? originalPrice - currentPrice : 0;
  const savingsPercentage = originalPrice ? Math.round((savings / originalPrice) * 100) : 0;

  // Classes pour les différentes tailles
  const sizeClasses = {
    sm: {
      current: 'text-lg font-bold',
      original: 'text-sm',
      savings: 'text-xs',
    },
    md: {
      current: 'text-2xl font-bold',
      original: 'text-lg',
      savings: 'text-sm',
    },
    lg: {
      current: 'text-3xl font-bold',
      original: 'text-xl',
      savings: 'text-base',
    },
    xl: {
      current: 'text-4xl font-bold',
      original: 'text-2xl',
      savings: 'text-lg',
    },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className={clsx('flex flex-col items-start', className)}>
      {/* Prix actuel et prix barré */}
      <div className="flex items-center gap-3">
        <span
          className={clsx(
            sizeClasses[size].current,
            highlight ? 'text-primary-500' : 'text-neutral-900'
          )}
        >
          {formatPrice(currentPrice)}
        </span>
        
        {originalPrice && originalPrice > currentPrice && (
          <span
            className={clsx(
              sizeClasses[size].original,
              'text-neutral-400 line-through relative'
            )}
          >
            {formatPrice(originalPrice)}
          </span>
        )}
      </div>

      {/* Économies et pourcentage */}
      {showSavings && savings > 0 && (
        <div className="flex items-center gap-2 mt-1">
          <span
            className={clsx(
              sizeClasses[size].savings,
              'text-green-600 font-medium'
            )}
          >
            Économisez {formatPrice(savings)}
          </span>
          
          {showPercentage && (
            <span
              className={clsx(
                'px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold'
              )}
            >
              -{savingsPercentage}%
            </span>
          )}
        </div>
      )}

      {/* Badge de promotion si highlight */}
      {highlight && savings > 0 && (
        <div className="mt-2">
          <span className="inline-flex items-center px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full animate-pulse">
            🔥 Offre limitée
          </span>
        </div>
      )}
    </div>
  );
};