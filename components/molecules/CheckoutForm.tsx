// components/molecules/CheckoutForm.tsx
// Formulaire de checkout optimisé pour mobile et conversion
// 2 colonnes desktop, validation à la soumission, auto-focus

'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/atoms/Button';
import { clsx } from 'clsx';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export const CheckoutForm: React.FC = () => {
  const { formData, updateFormData, nextStep } = useCart();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);

  // Auto-focus premier champ
  useEffect(() => {
    const timer = setTimeout(() => {
      firstNameRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Validation des champs
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est obligatoire';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est obligatoire';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est obligatoire';
    } else if (!/^(?:(?:\+33|0)[1-9])(?:[0-9]{8})$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est obligatoire';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'La ville est obligatoire';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est obligatoire';
    } else if (!/^[0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Code postal invalide (5 chiffres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion de la soumission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'une requête
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSubmitting(false);
    nextStep(); // Passer à l'étape 3 (paiement fictif)
  };

  // Gestion des changements de champs
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    updateFormData({ [field]: value });
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Ligne 1: Prénom + Nom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
              Prénom *
            </label>
            <input
              ref={firstNameRef}
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={clsx(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors',
                errors.firstName
                  ? 'border-red-300 bg-red-50'
                  : 'border-neutral-300 bg-white'
              )}
              placeholder="Votre prénom"
              autoComplete="given-name"
            />
            {errors.firstName && (
              <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
              Nom *
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={clsx(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors',
                errors.lastName
                  ? 'border-red-300 bg-red-50'
                  : 'border-neutral-300 bg-white'
              )}
              placeholder="Votre nom"
              autoComplete="family-name"
            />
            {errors.lastName && (
              <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Ligne 2: Email + Téléphone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              inputMode="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={clsx(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors',
                errors.email
                  ? 'border-red-300 bg-red-50'
                  : 'border-neutral-300 bg-white'
              )}
              placeholder="votre@email.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              id="phone"
              inputMode="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={clsx(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors',
                errors.phone
                  ? 'border-red-300 bg-red-50'
                  : 'border-neutral-300 bg-white'
              )}
              placeholder="06 12 34 56 78"
              autoComplete="tel"
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Ligne 3: Adresse complète */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
            Adresse *
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className={clsx(
              'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors',
              errors.address
                ? 'border-red-300 bg-red-50'
                : 'border-neutral-300 bg-white'
            )}
            placeholder="123 rue de la Paix"
            autoComplete="street-address"
          />
          {errors.address && (
            <p className="text-red-600 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        {/* Ligne 4: Ville + Code postal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-2">
              Ville *
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={clsx(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors',
                errors.city
                  ? 'border-red-300 bg-red-50'
                  : 'border-neutral-300 bg-white'
              )}
              placeholder="Paris"
              autoComplete="address-level2"
            />
            {errors.city && (
              <p className="text-red-600 text-xs mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-neutral-700 mb-2">
              Code postal *
            </label>
            <input
              type="text"
              id="postalCode"
              inputMode="numeric"
              value={formData.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              className={clsx(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors',
                errors.postalCode
                  ? 'border-red-300 bg-red-50'
                  : 'border-neutral-300 bg-white'
              )}
              placeholder="75001"
              autoComplete="postal-code"
              maxLength={5}
            />
            {errors.postalCode && (
              <p className="text-red-600 text-xs mt-1">{errors.postalCode}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bouton de validation */}
      <div className="pt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
          className="shadow-xl hover:shadow-glow"
        >
          {isSubmitting ? 'Validation en cours...' : 'Continuer vers le paiement'}
        </Button>
      </div>

      {/* Note de réassurance */}
      <p className="text-xs text-neutral-500 text-center mt-4">
        🔒 Vos données sont sécurisées et ne seront jamais partagées
      </p>
    </form>
  );
};