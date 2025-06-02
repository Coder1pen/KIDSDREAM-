import React from 'react';
import { Check, Star } from 'lucide-react';
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
    
    subscribeToTier(tier.id, user.id);
  };
  
  const isCurrentPlan = user?.subscription_tier === (tier.is_premium ? 'premium' : 'free');

  return (
    <Card className={`${
      tier.is_premium ? 'border-2 border-accent-400 shadow-lg' : ''
    } h-full flex flex-col`}>
      {tier.is_premium && (
        <div className="bg-accent-400 text-white text-center py-1 text-sm font-medium flex items-center justify-center">
          <Star className="h-4 w-4 mr-1" /> MOST POPULAR
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="flex items-center">
          {tier.name}
        </CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">${tier.price}</span>
          <span className="text-gray-500 ml-1">/month</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-success-500">
                <Check className="h-5 w-5" />
              </div>
              <span className="ml-2 text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button
          className="w-full"
          variant={tier.is_premium ? 'primary' : 'outline'}
          disabled={isCurrentPlan}
          onClick={handleSubscribe}
        >
          {isCurrentPlan ? 'Current Plan' : tier.is_premium ? 'Upgrade Now' : 'Get Started'}
        </Button>
      </CardFooter>
    </Card>
  );
};