// components/atoms/Heading.tsx
// Composant Heading atomique optimisé SEO avec hiérarchie sémantique
// Dépendances: clsx, class-variance-authority
// SEO: balises h1-h6 appropriées, sizing responsive

import { createElement, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const headingVariants = cva(
  'font-bold tracking-tight text-balance leading-tight',
  {
    variants: {
      level: {
        1: 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl', // Hero titles
        2: 'text-3xl sm:text-4xl lg:text-5xl', // Section titles
        3: 'text-2xl sm:text-3xl lg:text-4xl', // Subsection titles
        4: 'text-xl sm:text-2xl lg:text-3xl', // Card titles
        5: 'text-lg sm:text-xl lg:text-2xl', // Small headings
        6: 'text-base sm:text-lg lg:text-xl', // Micro headings
      },
      variant: {
        default: 'text-neutral-900',
        primary: 'text-primary-500',
        secondary: 'text-secondary-500',
        gradient: 'bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 bg-clip-text text-transparent',
        white: 'text-white',
        muted: 'text-neutral-600',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      spacing: {
        none: 'mb-0',
        sm: 'mb-2',
        md: 'mb-4',
        lg: 'mb-6',
        xl: 'mb-8',
      },
    },
    defaultVariants: {
      level: 2,
      variant: 'default',
      align: 'left',
      spacing: 'md',
    },
  }
);

interface HeadingProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading: React.FC<HeadingProps> = ({
  as,
  level = 2,
  variant,
  align,
  spacing,
  className,
  children,
  ...props
}) => {
  // Détermine la balise HTML appropriée pour le SEO
  const tag = as || `h${level}`;
  
  return createElement(
    tag,
    {
      className: clsx(
        headingVariants({ level, variant, align, spacing }),
        className
      ),
      ...props,
    },
    children
  );
};

// Composants pré-configurés pour les cas d'usage courants
export const HeroTitle: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={1} variant="gradient" align="center" spacing="lg" {...props} />
);

export const SectionTitle: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={2} variant="default" spacing="lg" {...props} />
);

export const CardTitle: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={4} variant="default" spacing="sm" {...props} />
);