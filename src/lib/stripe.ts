import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
// We'll need to set this up as an environment variable for production
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export async function createCheckoutSession(priceId: string, userId: string) {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      userId,
    }),
  });

  const session = await response.json();
  
  // Redirect to Stripe Checkout
  const stripe = await stripePromise;
  const { error } = await stripe!.redirectToCheckout({
    sessionId: session.id,
  });

  if (error) {
    console.error('Error redirecting to checkout:', error);
  }
}

export async function createPortalSession(customerId: string) {
  const response = await fetch('/api/create-portal-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
    }),
  });

  const session = await response.json();
  
  // Redirect to Stripe Customer Portal
  window.location.href = session.url;
}

export async function getSubscriptionStatus(userId: string) {
  const response = await fetch(`/api/subscription-status?userId=${userId}`);
  return response.json();
}