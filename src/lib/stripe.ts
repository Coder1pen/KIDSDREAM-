import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export async function createCheckoutSession(priceId: string, userId: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        priceId,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const session = await response.json();
    
    // Redirect to Stripe Checkout
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error('Error redirecting to checkout:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function createPortalSession(customerId: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-portal-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        customerId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create portal session');
    }

    const session = await response.json();
    
    // Redirect to Stripe Customer Portal
    window.location.href = session.url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}

export async function getSubscriptionStatus(userId: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/subscription-status?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get subscription status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting subscription status:', error);
    // Return default values on error
    return {
      tier: 'free',
      storiesRemaining: 5
    };
  }
}