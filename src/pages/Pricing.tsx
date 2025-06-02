import React, { useEffect } from 'react';
import { PricingCard } from '../components/subscription/PricingCard';
import { useSubscriptionStore } from '../store/useSubscriptionStore';

export const Pricing: React.FC = () => {
  const { loadSubscriptionTiers, tiers, isLoading } = useSubscriptionStore();
  
  useEffect(() => {
    loadSubscriptionTiers();
  }, []);
  
  // Fallback tiers if API call fails
  const fallbackTiers = [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      features: [
        '5 stories per month',
        'Basic story customization',
        'Save stories to your library',
        'Text-to-speech feature',
        'Download stories as text',
      ],
      stories_per_month: 5,
      is_premium: false,
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 9.99,
      features: [
        'Unlimited stories',
        'Advanced story customization',
        'Priority story generation',
        'Text-to-speech with multiple voices',
        'Download stories in multiple formats',
        'Ad-free experience',
        'Early access to new features',
      ],
      stories_per_month: -1, // Unlimited
      is_premium: true,
    },
  ];
  
  const displayTiers = tiers.length > 0 ? tiers : fallbackTiers;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Story Adventure
          </h1>
          <p className="text-xl text-gray-600">
            Select the plan that works best for your family's story needs
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {displayTiers.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
        )}
        
        <div className="mt-16 bg-primary-50 rounded-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                What happens when I reach my story limit?
              </h3>
              <p className="mt-2 text-gray-600">
                You'll still have access to all the stories you've already created, but you won't be able to generate new ones until your next billing cycle or until you upgrade to Premium.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Can I cancel my subscription at any time?
              </h3>
              <p className="mt-2 text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access to Premium features until the end of your current billing period.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Are my payment details secure?
              </h3>
              <p className="mt-2 text-gray-600">
                Absolutely. We use Stripe, a PCI-compliant payment processor, to handle all payments. Your payment information is never stored on our servers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Do you offer family plans?
              </h3>
              <p className="mt-2 text-gray-600">
                Not currently, but we're working on it! Stay tuned for family plans in the near future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};