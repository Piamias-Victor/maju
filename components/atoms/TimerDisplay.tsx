// components/atoms/TimerDisplay.tsx
// Affichage du compteur temporel optimisé pour l'urgence
// Design différent selon le contexte (bandeau vs panier)

'use client';

import { useTimer } from '@/hooks/useTimer';
import { clsx } from 'clsx';

interface TimerDisplayProps {
  variant?: 'banner' | 'cart';
  className?: string;
  showIcon?: boolean;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  variant = 'banner',
  className,
  showIcon = true,
}) => {
  const { formattedTime, isActive } = useTimer();

  if (!isActive) {
    return null;
  }

  const baseClasses = 'font-semibold inline-flex items-center gap-2';
  
  const variantClasses = {
    banner: 'text-white text-sm',
    cart: 'text-primary-600 text-base bg-primary-50 px-3 py-2 rounded-lg border border-primary-200',
  };

  return (
    <div className={clsx(baseClasses, variantClasses[variant], className)}>
      {showIcon && (
        <span className="text-lg" role="img" aria-label="Horloge">
          ⏰
        </span>
      )}
      <span>{formattedTime}</span>
    </div>
  );
};