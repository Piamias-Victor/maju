// app/page.tsx
// Page principale du site Bol MAJU - Landing page optimisée conversion
// Structure: Header + Hero + Features + Reviews + FAQ + CTA
// Optimisations: mobile-first, SEO, performance, lazy loading

import { Header } from '@/components/organisms/Header';
import { ProductHero } from '@/components/organisms/ProductHero';
import { Image } from '@/components/atoms/Image';

// Composants à implémenter (placeholders pour structure)
const ProductFeatures = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Pourquoi choisir le Bol MAJU ?</h2>
      
      {/* Description explicative */}
      <div className="max-w-4xl mx-auto mb-12">
        <p className="text-lg text-neutral-600 leading-relaxed">
          Le Bol MAJU est bien plus qu&apos;un simple ustensile de cuisine. C&apos;est un système révolutionnaire conçu par des nutritionnistes professionnels pour vous accompagner vers une alimentation équilibrée, sans contrainte ni calcul compliqué. Grâce à ses <strong>3 compartiments modulables</strong> avec réglettes brevetées, vous obtenez automatiquement les bonnes portions pour chaque type d&apos;aliment : légumes, féculents et protéines.
        </p>
        <p className="text-base text-neutral-500 mt-4">
          Fabriqué en France avec des matériaux alimentaires recyclés (PP et SEBS), garanti sans BPA ni phtalates, compatible micro-ondes et lave-vaisselle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Simplicité exceptionnelle', desc: 'Plus besoin de peser ni compter les calories' },
          { title: 'Confiance et sécurité', desc: 'Conçu par des experts nutritionnistes français' },
          { title: 'Application gratuite incluse', desc: 'Recettes, conseils et suivi personnalisé' }
        ].map((feature, i) => (
          <div key={i} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-neutral-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ReviewsList = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-12">Ils ont adopté le Bol MAJU</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: 'Marie L.', rating: 5, text: 'Révolutionnaire ! Plus besoin de peser mes aliments.' },
          { name: 'Thomas R.', rating: 5, text: '10 jours et déjà des résultats visibles, sans frustration.' },
          { name: 'Sophie M.', rating: 5, text: 'Enfin un ustensile pensé par des vrais nutritionnistes.' }
        ].map((review, i) => (
          <div key={i} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="font-semibold">{review.name}</span>
              <div className="ml-2 flex">
                {Array.from({length: 5}).map((_, j) => (
                  <span key={j} className="text-yellow-400">⭐</span>
                ))}
              </div>
            </div>
            <p className="text-neutral-600">&ldquo;{review.text}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
      <div className="space-y-6">
        {[
          {
            q: 'Comment fonctionne le système de compartiments ?',
            a: 'Le Bol MAJU dispose de 3 compartiments modulables avec un système de réglettes breveté.'
          },
          {
            q: 'Est-ce vraiment Made in France ?',
            a: 'Oui ! Conçu à Béziers et fabriqué près de Nantes, 100% français.'
          },
          {
            q: 'Le bol passe-t-il au lave-vaisselle ?',
            a: 'Absolument ! Compatible lave-vaisselle et micro-ondes, sans BPA.'
          },
          {
            q: 'Quelle est la garantie ?',
            a: '30 jours satisfait ou remboursé + garantie fabricant.'
          }
        ].map((faq, i) => (
          <details key={i} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <summary className="font-semibold text-lg">{faq.q}</summary>
            <p className="mt-4 text-neutral-600">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section id="checkout-section" className="py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6">Prêt à transformer vos repas ?</h2>
      <p className="text-xl text-neutral-600 mb-8">
        Rejoignez les +55 000 utilisateurs qui ont simplifié leur alimentation
      </p>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-2xl line-through text-neutral-400">59,99€</span>
          <span className="text-4xl font-bold text-primary-500">39,99€</span>
        </div>
        
        <button className="btn-primary w-full mb-4 text-lg py-4">
          🛒 Commander maintenant
        </button>
        
        <p className="text-sm text-neutral-600">
          ✅ Livraison gratuite • ✅ Garantie 30 jours • ✅ Paiement sécurisé
        </p>
      </div>
    </div>
  </section>
);

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <ProductHero />
      <ProductFeatures />
      <HowItWorks />
      <BenefitsSection />
      <CalorieControlSection />
      <ReviewsListUpdated />
      <FinalCTA />
      <FAQ />
    </main>
  );
}

// Sections supplémentaires avec vraies photos
const HowItWorks = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Comment ça marche ?</h2>
      <p className="text-lg text-neutral-600 text-center mb-12 max-w-3xl mx-auto">
        3 étapes simples pour des repas équilibrés sans calcul ni balance
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Réglez votre bol</h3>
                <p className="text-neutral-600">Utilisez les réglettes brevetées pour adapter les compartiments à vos besoins</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Remplissez les compartiments</h3>
                <p className="text-neutral-600">Légumes, féculents, protéines dans les bonnes proportions</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">C&apos;est tout !</h3>
                <p className="text-neutral-600">Savourez votre repas parfaitement équilibré</p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <Image
            src="https://www.MAJU-nutrition.com/cdn/shop/files/MAJU-utilisation-bol-rose-etapes.jpg"
            alt="Étapes d'utilisation du Bol MAJU"
            width={500}
            height={400}
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="https://www.MAJU-nutrition.com/cdn/shop/files/MAJU-bol-rose-manger-juste-benefices.jpg"
            alt="Bénéfices du Bol MAJU"
            width={500}
            height={400}
            className="w-full h-auto rounded-2xl"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Les bénéfices prouvés</h2>
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✅</span>
              <span className="text-lg">Perte de poids maîtrisée</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✅</span>
              <span className="text-lg">Aucune privation alimentaire</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✅</span>
              <span className="text-lg">Portions personnalisées</span>
            </div>
          </div>
          <div className="bg-primary-50 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">93%</div>
            <div className="text-lg font-semibold text-primary-800">de réussite</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CalorieControlSection = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Maîtrisez vos calories</h2>
          <p className="text-lg text-neutral-600 mb-6">
            Obtenez automatiquement les bonnes quantités sans jamais peser vos aliments.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span>Quantités adaptées à vos besoins</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span>Contrôle automatique des portions</span>
            </div>
          </div>
        </div>
        <div>
          <Image
            src="https://www.MAJU-nutrition.com/cdn/shop/files/MAJU-bol-rose-quantite-adaptees-calories.jpg"
            alt="Contrôle des calories avec Bol MAJU"
            width={500}
            height={400}
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  </section>
);

const ReviewsListUpdated = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">93% de taux de réussite</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Rejoignez les +70 000 utilisateurs satisfaits.
          </p>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">+70 000</div>
              <div className="text-sm text-neutral-600">utilisateurs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">4.7/5</div>
              <div className="text-sm text-neutral-600">note moyenne</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold text-sm">Sophie M.</span>
                <div className="ml-2 flex">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-neutral-600 text-sm">&ldquo;-2,9 kg en 15 jours !&rdquo;</p>
            </div>
          </div>
        </div>
        <div>
          <Image
            src="https://www.MAJU-nutrition.com/cdn/shop/files/MAJU-bol-avis-93-pourcents-reussite-fond-rose.jpg"
            alt="93% de réussite Bol MAJU"
            width={500}
            height={400}
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  </section>
);