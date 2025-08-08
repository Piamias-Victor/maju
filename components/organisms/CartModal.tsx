// components/organisms/CartModal.tsx
// Modal panier ultra-optimisé pour conversion mobile-first
// Animation slide-up, progress bar, glassmorphism, anti-abandon
// VERSION CORRIGÉE - Responsive et images placeholder

'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/atoms/Button';
import { ColorSelector } from '@/components/molecules/ColorSelector';
import { CheckoutForm } from '@/components/molecules/CheckoutForm';
import { TimerDisplay } from '@/components/atoms/TimerDisplay';
import { SocialProof } from '@/components/molecules/SocialProof';
import { PriceDisplay } from '@/components/molecules/PriceDisplay';
import { clsx } from 'clsx';

export const CartModal: React.FC = () => {
  const {
    isModalOpen,
    closeModal,
    currentStep,
    setCurrentStep,
    previousStep,
    selectedColor,
    setSelectedColor,
    addToCart,
  } = useCart();

  const modalRef = useRef<HTMLDivElement>(null);

  // Ajouter l'item au panier à l'ouverture
  useEffect(() => {
    if (isModalOpen) {
      addToCart(selectedColor);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, selectedColor, addToCart]);

  // Progress bar component
  const ProgressBar = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={clsx(
              'w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-300',
              currentStep >= step
                ? 'bg-primary-500 border-primary-500 text-white'
                : 'bg-white border-neutral-300 text-neutral-400'
            )}
          >
            {currentStep > step ? '✓' : step}
          </div>
          {step < 3 && (
            <div
              className={clsx(
                'w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 transition-all duration-300',
                currentStep > step ? 'bg-primary-500' : 'bg-neutral-300'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  // Step titles
  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Votre commande';
      case 2:
        return 'Informations de livraison';
      case 3:
        return 'Finalisation';
      default:
        return 'Votre commande';
    }
  };

  // Paiement Stripe réel
  const handleFinalizeOrder = async () => {
    try {
      // Appel à l'API checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          color: selectedColor,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la session');
      }

      const { url } = await response.json();
      
      // Redirection vers Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du paiement. Veuillez réessayer.');
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal Container - Mobile First */}
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
            <motion.div
              ref={modalRef}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-full h-full sm:h-[95vh] sm:w-full sm:max-w-3xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex flex-col h-full">
                {/* Header avec bouton fermer */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-200 bg-white flex-shrink-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                    {getStepTitle()}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                    aria-label="Fermer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Progress bar */}
                <div className="px-4 sm:px-6 pt-4 sm:pt-6 bg-white flex-shrink-0">
                  <ProgressBar />
                </div>

                {/* Contenu scrollable */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6 bg-white min-h-0">
                  {/* Étape 1: Panier */}
                  {currentStep === 1 && (
                    <div className="space-y-4 sm:space-y-6">
                      {/* CTA en haut - Visible dès l'ouverture */}
                      <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-4">
                        <Button
                          variant="primary"
                          size="lg"
                          fullWidth
                          onClick={() => setCurrentStep(2)}
                          className="shadow-xl hover:shadow-glow mb-2"
                        >
                          ⚡ Continuer ma commande
                        </Button>
                        <p className="text-xs text-primary-600 text-center font-medium">
                          👆 Cliquez ici pour commander rapidement
                        </p>
                      </div>

                      {/* Timer urgent */}
                      <div className="flex justify-center">
                        <TimerDisplay variant="cart" />
                      </div>

                      {/* Produit */}
                      <div className="bg-neutral-50 rounded-2xl p-4 sm:p-6 border">
                        <div className="flex items-center gap-4">
                          {/* Image placeholder colorée */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center flex-shrink-0">
                            <div className={clsx(
                              "w-8 h-8 sm:w-12 sm:h-12 rounded-full",
                              selectedColor === 'rose' ? 'bg-primary-500' : 'bg-secondary-500'
                            )} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg text-neutral-900">Bol JUMA</h3>
                            <p className="text-neutral-600 text-sm">
                              Quantité : <span className="font-medium">1</span> (limite par commande)
                            </p>
                            <p className="text-xs text-primary-600 font-medium mt-1">
                              🔥 Stock limité - Forte demande
                            </p>
                          </div>
                        </div>

                        {/* Sélecteur de couleur */}
                        <div className="mt-4 sm:mt-6">
                          <ColorSelector
                            defaultColor={selectedColor}
                            onColorChange={(color) => setSelectedColor(color.id as 'rose' | 'bleu')}
                            size="md"
                          />
                        </div>
                      </div>

                      {/* Prix */}
                      <div className="bg-neutral-50 rounded-2xl p-4 sm:p-6 border">
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-700">Bol JUMA x1</span>
                            <PriceDisplay
                              currentPrice={39.99}
                              originalPrice={59.99}
                              size="md"
                              showSavings={false}
                            />
                          </div>
                          
                          <div className="flex justify-between items-center text-green-600">
                            <span className="font-medium">Livraison</span>
                            <span className="font-semibold">GRATUITE 🚚</span>
                          </div>
                          
                          <hr className="border-neutral-200" />
                          
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total</span>
                            <span className="text-primary-500">39,99€</span>
                          </div>
                          
                          <div className="text-center text-sm text-green-600 font-medium">
                            🎉 Vous économisez 20,00€ (33%)
                          </div>
                        </div>
                      </div>

                      {/* Social proof */}
                      <SocialProof variant="compact" />

                      {/* CTA */}
                      <div className="pt-2">
                        <Button
                          variant="primary"
                          size="lg"
                          fullWidth
                          onClick={() => setCurrentStep(2)}
                          className="shadow-xl hover:shadow-glow"
                        >
                          Continuer ma commande
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Étape 2: Formulaire */}
                  {currentStep === 2 && (
                    <div className="space-y-4 sm:space-y-6">
                      {/* Timer */}
                      <div className="flex justify-center">
                        <TimerDisplay variant="cart" />
                      </div>

                      {/* Formulaire */}
                      <CheckoutForm />

                      {/* Bouton retour */}
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          size="md"
                          fullWidth
                          onClick={previousStep}
                        >
                          Retour
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Étape 3: Paiement fictif */}
                  {currentStep === 3 && (
                    <div className="space-y-4 sm:space-y-6">
                      {/* Timer */}
                      <div className="flex justify-center">
                        <TimerDisplay variant="cart" />
                      </div>

                      {/* Récapitulatif final */}
                      <div className="bg-green-50 rounded-2xl p-4 sm:p-6 border border-green-200">
                        <h3 className="text-lg font-semibold text-green-800 mb-4">
                          🎉 Presque terminé !
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Bol JUMA {selectedColor}</span>
                            <span>39,99€</span>
                          </div>
                          <div className="flex justify-between text-green-600">
                            <span>Livraison</span>
                            <span>GRATUITE</span>
                          </div>
                          <hr className="border-green-200" />
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>39,99€</span>
                          </div>
                        </div>
                      </div>

                      {/* Réassurance finale */}
                      <SocialProof />

                      {/* CTA final */}
                      <div className="space-y-3">
                        <Button
                          variant="primary"
                          size="xl"
                          fullWidth
                          onClick={handleFinalizeOrder}
                          className="shadow-2xl hover:shadow-glow text-lg"
                        >
                          🛒 Payer avec Stripe
                        </Button>

                        {/* Bouton retour */}
                        <Button
                          variant="ghost"
                          size="md"
                          fullWidth
                          onClick={previousStep}
                        >
                          Modifier mes informations
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};