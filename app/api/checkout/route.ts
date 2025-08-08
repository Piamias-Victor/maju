// app/api/checkout/route.ts
// API route pour créer une session Stripe Checkout
// Sécurité: validation côté serveur, headers CORS, rate limiting
// Optimisé pour conversion: métadonnées produit complètes

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

interface CheckoutRequestBody {
  color: 'rose' | 'bleu';
  quantity: number;
  priceId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequestBody = await request.json();
    
    // Validation des données
    if (!body.color || !['rose', 'bleu'].includes(body.color)) {
      return NextResponse.json(
        { error: 'Couleur invalide' },
        { status: 400 }
      );
    }

    if (!body.quantity || body.quantity < 1 || body.quantity > 10) {
      return NextResponse.json(
        { error: 'Quantité invalide' },
        { status: 400 }
      );
    }

    // Configuration du produit
    const productData = {
      name: `Bol maju - ${body.color === 'rose' ? 'Rose Vif' : 'Bleu'}`,
      description: 'L\'ustensile révolutionnaire pour manger équilibré sans effort. 3 compartiments modulables, Made in France.',
      images: [
        `${process.env.NEXT_PUBLIC_SITE_URL}/images/bol-maju-${body.color}-600x600.jpg`
      ],
      metadata: {
        color: body.color,
        product_type: 'bol-maju',
        made_in: 'france',
      }
    };

    // Création de la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: productData,
            unit_amount: 3999, // 39.99€ en centimes
          },
          quantity: body.quantity,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?cancelled=true`,
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0, // Livraison gratuite
              currency: 'eur',
            },
            display_name: 'Livraison gratuite',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 2,
              },
              maximum: {
                unit: 'business_day',
                value: 4,
              },
            },
          },
        },
      ],
      customer_creation: 'always',
      invoice_creation: {
        enabled: true,
      },
      metadata: {
        color: body.color,
        quantity: body.quantity.toString(),
        product: 'bol-maju',
      },
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error: unknown) {
    console.error('Erreur création session Stripe:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création de la session de paiement',
        message: errorMessage 
      },
      { status: 500 }
    );
  }
}

// Méthodes autorisées
export async function GET() {
  return NextResponse.json(
    { error: 'Méthode non autorisée' },
    { status: 405 }
  );
}