import React from 'react';
import { Check, Star, Crown, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { SubscriptionTier } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';
import { useSubscriptionStore } from '../../store/useSubscriptionStore';

interface PricingCardProps {
  tier: SubscriptionTier;
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier }) => {
  const { user } = useAuthStore();
  const { subscribeToTier, userSubscription } = useSubscriptionStore();
  
  const handleSubscribe = () => {
    if (!user) {
      window.location.href = '/signin?redirect=pricing';
      return;
    }
    
    if (tier.is_premium) {
      // For premium tier, initiate Stripe checkout
      subscribeToTier('price_premium_monthly', user.id);
    }
  };
  
  const isCurrentPlan = user?.subscription_tier === (tier.is_premium ? 'premium' : 'free');
  const isFree = !tier.is_premium;

  return (
    <Card className={`${
      tier.is_premium 
        ? 'border-2 border-navy-500/50 shadow-glow bg-gradient-to-br from-dark-900/80 to-dark-800/80' 
        : 'bg-dark-900/50'
    } h-full flex flex-col relative overflow-hidden`}>
      
      {tier.is_premium && (
        <>
          {/* Popular Badge */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-navy-600 to-navy-500 text-white text-center py-2 text-sm font-medium flex items-center justify-center">
            <Star className="h-4 w-4 mr-1 fill-current" /> 
            MOST POPULAR
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles className="h-8 w-8 text-navy-300 animate-pulse" />
          </div>
          <div className="absolute bottom-4 left-4 opacity-10">
            <Crown className="h-6 w-6 text-navy-400" />
          </div>
        </>
      )}
      
      <CardHeader className={tier.is_premium ? 'pt-12' : ''}>
        <CardTitle className="flex items-center justify-between">
          <span className="text-navy-100">{tier.name}</span>
          {tier.is_premium && (
            <Crown className="h-6 w-6 text-navy-400" />
          )}
        </CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold text-navy-100">${tier.price}</span>
          <span className="text-gray-400 ml-2">{isFree ? 'forever' : '/month'}</span>
        </div>
        {tier.is_premium && (
          <p className="text-sm text-navy-300 mt-2">
            Everything in Free, plus premium features
          </p>
        )}
      </CardHeader>
      
      <CardContent className="flex-1">
        <ul className="space-y-4">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-navy-400 mt-0.5">
                <Check className="h-5 w-5" />
              </div>
              <span className="ml-3 text-gray-300 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
        
        {tier.is_premium && (
          <div className="mt-6 p-4 bg-navy-900/30 rounded-lg border border-navy-700/30">
            <h4 className="font-semibold text-navy-200 mb-2">Premium Benefits:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• 3x longer, more detailed stories</li>
              <li>• Advanced character development</li>
              <li>• Multiple plot layers & themes</li>
              <li>• Priority story generation</li>
            </ul>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button
          className={`w-full ${
            tier.is_premium 
              ? 'bg-gradient-to-r from-navy-600 to-navy-500 hover:from-navy-500 hover:to-navy-400 shadow-glow' 
              : 'bg-dark-700 hover:bg-dark-600'
          }`}
          variant={tier.is_premium ? 'primary' : 'secondary'}
          disabled={isCurrentPlan}
          onClick={handleSubscribe}
          leftIcon={tier.is_premium ? <Crown className="h-4 w-4" /> : undefined}
        >
          {isCurrentPlan 
            ? 'Current Plan' 
            : tier.is_premium 
              ? 'Upgrade to Premium' 
              : 'Get Started Free'
          }
        </Button>
        
        {tier.is_premium && !isCurrentPlan && (
          <p className="text-xs text-gray-400 text-center mt-2">
            Secure checkout powered by Stripe
          </p>
        )}
      </CardFooter>
    </Card>
  );
};