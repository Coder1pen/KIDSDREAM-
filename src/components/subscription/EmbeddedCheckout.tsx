import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface EmbeddedCheckoutProps {
  priceId: string;
  mode: 'payment' | 'subscription';
  onClose: () => void;
  isOpen: boolean;
}

export const EmbeddedCheckout: React.FC<EmbeddedCheckoutProps> = ({
  priceId,
  mode,
  onClose,
  isOpen
}) => {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen && priceId) {
      createCheckoutSession();
    }
  }, [isOpen, priceId]);

  const createCheckoutSession = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.access_token) {
        throw new Error('User not authenticated');
      }

      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/payment-success`;
      const cancelUrl = `${baseUrl}/pricing`;

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: priceId,
          success_url: successUrl,
          cancel_url: cancelUrl,
          mode,
          ui_mode: 'embedded', // Request embedded checkout
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { client_secret } = await response.json();
      setClientSecret(client_secret);
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-900 rounded-2xl shadow-glow-lg max-w-2xl w-full max-h-[90vh] overflow-hidden border border-navy-700/50">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-navy-800/30">
          <h2 className="text-2xl font-bold text-navy-100">Complete Your Purchase</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-navy-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading && (
            <div className="flex flex-col items-center py-12">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-navy-800/30 border-t-navy-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-navy-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <p className="text-xl text-navy-200">Setting up secure checkout...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-6">
                <p className="text-red-300 mb-4">Failed to load checkout</p>
                <p className="text-gray-400 text-sm">{error}</p>
              </div>
              <Button onClick={createCheckoutSession} variant="outline">
                Try Again
              </Button>
            </div>
          )}

          {clientSecret && (
            <div className="max-h-[60vh] overflow-y-auto">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};