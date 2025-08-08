// components/atoms/Image.tsx
// Composant Image optimisé pour performance et SEO
// Dépendances: next/image
// Optimisations: lazy loading, WebP, responsive, placeholder blur

'use client';

import { useState } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { clsx } from 'clsx';

interface ImageProps extends Omit<NextImageProps, 'alt'> {
  alt: string; // Alt obligatoire pour SEO
  aspectRatio?: 'square' | '4/3' | '16/9' | '3/2' | 'auto';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  overlay?: boolean;
  overlayColor?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  aspectRatio = 'auto',
  rounded = 'lg',
  overlay = false,
  overlayColor = 'bg-black/20',
  loading = 'lazy',
  priority = false,
  fill,
  width,
  height,
  sizes,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Classes pour l'aspect ratio
  const aspectRatioClasses = {
    square: 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '3/2': 'aspect-[3/2]',
    auto: '',
  };

  // Classes pour les coins arrondis
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  // Gestion d'erreur avec placeholder
  if (hasError) {
    return (
      <div
        className={clsx(
          'bg-neutral-200 flex items-center justify-center',
          aspectRatioClasses[aspectRatio],
          roundedClasses[rounded],
          className
        )}
        style={{ width, height }}
      >
        <svg
          className="w-10 h-10 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={clsx('relative overflow-hidden', roundedClasses[rounded], className)}>
      <NextImage
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        quality={85}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        className={clsx(
          'transition-all duration-300',
          aspectRatio !== 'auto' && aspectRatioClasses[aspectRatio],
          isLoading && 'scale-105 blur-sm',
          !isLoading && 'scale-100 blur-0',
          fill && 'object-cover w-full h-full'
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        {...props}
      />
      
      {/* Overlay optionnel */}
      {overlay && (
        <div className={clsx('absolute inset-0', overlayColor)} />
      )}
      
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
      )}
    </div>
  );
};