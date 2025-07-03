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
    <div className="bg-dark-950 text-white min-h-screen">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-navy-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-navy-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-navy-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-navy-400 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-navy-300 rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-navy-500 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/20 via-transparent to-dark-950/40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-navy-900/30 backdrop-blur-sm rounded-full border border-navy-700/50 mb-6">
            <span className="text-navy-300 text-sm font-medium">Choose Your Adventure</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent">
              Unlock Magical Storytelling
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Select the plan that works best for your family's story needs. 
            Start creating magical memories today.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-navy-800/30 border-t-navy-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-navy-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {displayTiers.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
        )}
        
        {/* FAQ Section */}
        <div className="mt-20 bg-dark-900/50 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto border border-navy-800/30">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <div className="space-y-8">
            <div className="bg-dark-800/50 rounded-xl p-6 border border-navy-800/20">
              <h3 className="text-lg font-semibold text-navy-100 mb-3">
                What happens when I reach my story limit?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                You'll still have access to all the stories you've already created, but you won't be able to generate new ones until your next billing cycle or until you upgrade to Premium.
              </p>
            </div>
            
            <div className="bg-dark-800/50 rounded-xl p-6 border border-navy-800/20">
              <h3 className="text-lg font-semibold text-navy-100 mb-3">
                Can I cancel my subscription at any time?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Yes, you can cancel your subscription at any time. You'll continue to have access to Premium features until the end of your current billing period.
              </p>
            </div>
            
            <div className="bg-dark-800/50 rounded-xl p-6 border border-navy-800/20">
              <h3 className="text-lg font-semibold text-navy-100 mb-3">
                Are my payment details secure?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Absolutely. We use Stripe, a PCI-compliant payment processor, to handle all payments. Your payment information is never stored on our servers.
              </p>
            </div>
            
            <div className="bg-dark-800/50 rounded-xl p-6 border border-navy-800/20">
              <h3 className="text-lg font-semibold text-navy-100 mb-3">
                Do you offer family plans?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Not currently, but we're working on it! Stay tuned for family plans in the near future.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-500 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold text-lg">🔒</span>
              </div>
              <h3 className="font-semibold text-navy-200 mb-2">Secure Payments</h3>
              <p className="text-gray-400 text-sm">Protected by Stripe encryption</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-500 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <h3 className="font-semibold text-navy-200 mb-2">Instant Access</h3>
              <p className="text-gray-400 text-sm">Start creating stories immediately</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-500 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold text-lg">💝</span>
              </div>
              <h3 className="font-semibold text-navy-200 mb-2">Cancel Anytime</h3>
              <p className="text-gray-400 text-sm">No long-term commitments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};