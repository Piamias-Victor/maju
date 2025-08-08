// components/molecules/SocialProof.tsx
// Preuve sociale fixe pour rassurer et créer l'urgence
// Optimisé pour la conversion avec design glassmorphism
// VERSION CORRIGÉE avec vraies photos Unsplash

'use client';

import { clsx } from 'clsx';

interface SocialProofProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export const SocialProof: React.FC<SocialProofProps> = ({
  className,
  variant = 'default',
}) => {
  const isCompact = variant === 'compact';

  return (
    <div
      className={clsx(
        'bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg',
        isCompact ? 'px-4 py-3' : 'px-6 py-4',
        className
      )}
    >
      <div className="flex items-center justify-center gap-3">
        {/* Avatars avec vraies photos */}
        <div className="flex -space-x-2">
          {[
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face"
          ].map((photo, i) => (
            <div
              key={i}
              className={clsx(
                'rounded-full border-2 border-white bg-cover bg-center bg-no-repeat',
                isCompact ? 'w-6 h-6' : 'w-8 h-8'
              )}
              style={{ backgroundImage: `url(${photo})` }}
            />
          ))}
        </div>

        {/* Texte social proof */}
        <div className="text-center">
          <div
            className={clsx(
              'font-semibold text-neutral-800',
              isCompact ? 'text-sm' : 'text-base'
            )}
          >
            <span className="text-primary-600">12 personnes</span> ont commandé aujourd&apos;hui
          </div>
          {!isCompact && (
            <div className="text-xs text-neutral-600 mt-1">
              Stock limité • Livraison gratuite
            </div>
          )}
        </div>

        {/* Pulse indicator */}
        <div className="flex items-center">
          <div
            className={clsx(
              'bg-green-500 rounded-full animate-pulse',
              isCompact ? 'w-2 h-2' : 'w-3 h-3'
            )}
          />
        </div>
      </div>

      {/* Badges de confiance (version complète seulement) */}
      {!isCompact && (
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-white/20">
          <div className="flex items-center gap-1 text-xs text-neutral-600">
            <span>✅</span>
            <span>Paiement sécurisé</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-600">
            <span>🚚</span>
            <span>Livraison gratuite</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-600">
            <span>🇫🇷</span>
            <span>Made in France</span>
          </div>
        </div>
      )}
    </div>
  );
};