// app/merci/page.tsx
// Page de remerciement après paiement Stripe réussi
// Optimisée pour rassurer et engager après achat

'use client';

import { Suspense } from 'react';
import { Button } from '@/components/atoms/Button';
import { AnimatedBackground } from '@/components/atoms/AnimatedBackground';
import Link from 'next/link';

function SuccessContent() {
  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Animation de succès */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
              🎉 Merci pour votre commande !
            </h1>

            {/* Message de confirmation */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20 shadow-xl">
              <p className="text-xl text-neutral-700 mb-6">
                Votre Bol JUMA est en préparation et sera expédié sous 24h !
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-2xl">📧</div>
                  <div className="text-sm font-medium text-neutral-600">
                    Email de confirmation envoyé
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl">🚚</div>
                  <div className="text-sm font-medium text-neutral-600">
                    Livraison gratuite<br/>
                  </div>
                </div>
              </div>
            </div>

            {/* Prochaines étapes */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 shadow-xl">
              <h2 className="text-xl font-semibold text-primary-800 mb-4">
                En attendant votre Bol JUMA...
              </h2>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">1.</span>
                  <span className="text-primary-700">Préparez vos idées de recettes équilibrées</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">2.</span>
                  <span className="text-primary-700">Suivez le suivi de livraison par email</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">3.</span>
                  <span className="text-primary-700">Rejoignez notre communauté de +55 000 utilisateurs</span>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="primary" size="lg">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>

            {/* Note finale */}
            <p className="text-sm text-neutral-500 mt-8">
              Des questions ? Contactez-nous à{' '}
              <a href="mailto:contact@bol-juma.fr" className="text-primary-600 hover:underline">
                contact@bol-juma.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function MerciPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}