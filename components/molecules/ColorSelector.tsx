// components/molecules/ColorSelector.tsx
// Sélecteur de couleur avec pastilles cliquables (Rose vif / Bleu)
// Dépendances: clsx
// UX: feedback visuel, état actif, accessibilité

'use client';

import { useState } from 'react';
import { clsx } from 'clsx';

interface ColorOption {
  id: string;
  name: string;
  value: string;
  bgClass: string;
  borderClass: string;
}

interface ColorSelectorProps {
  colors?: ColorOption[];
  defaultColor?: string;
  onColorChange?: (color: ColorOption) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const defaultColors: ColorOption[] = [
  {
    id: 'rose',
    name: 'Rose Vif',
    value: '#ec4899',
    bgClass: 'bg-primary-500',
    borderClass: 'border-primary-600',
  },
  {
    id: 'bleu',
    name: 'Bleu',
    value: '#3b82f6',
    bgClass: 'bg-secondary-500',
    borderClass: 'border-secondary-600',
  },
];

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors = defaultColors,
  defaultColor,
  onColorChange,
  size = 'md',
  className,
}) => {
  const [selectedColor, setSelectedColor] = useState(
    colors.find(color => color.id === defaultColor) || colors[0]
  );

  const handleColorSelect = (color: ColorOption) => {
    setSelectedColor(color);
    onColorChange?.(color);
  };

  // Classes pour les différentes tailles
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-neutral-700">
          Couleur :
        </span>
        <span className="text-sm font-semibold text-neutral-900">
          {selectedColor.name}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor.id === color.id;
          
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => handleColorSelect(color)}
              className={clsx(
                // Classes de base
                sizeClasses[size],
                'rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                // Couleur de fond
                color.bgClass,
                // État sélectionné
                isSelected
                  ? [
                      'border-neutral-900 shadow-lg transform scale-110',
                      color.borderClass,
                    ]
                  : 'border-neutral-300 hover:border-neutral-400 hover:scale-105',
                // Effet hover
                'hover:shadow-md active:scale-95'
              )}
              aria-label={`Sélectionner la couleur ${color.name}`}
              aria-pressed={isSelected}
            >
              {/* Indicateur de sélection */}
              {isSelected && (
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <svg
                    className="w-1/2 h-1/2 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Texte d'aide */}
      <p className="text-xs text-neutral-500 mt-1">
        Choisissez votre couleur préférée pour personnaliser votre Bol juma
      </p>
    </div>
  );
};