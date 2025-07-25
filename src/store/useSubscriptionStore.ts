import { create } from 'zustand';
import { SubscriptionTier } from '../types';
import { getSubscriptionTiers } from '../lib/supabase';
import { createCheckoutSession, getUserOrders } from '../lib/stripe';

interface SubscriptionState {
  tiers: SubscriptionTier[];
  userSubscription: {
    tier: 'free' | 'premium';
    storiesRemaining: number;
    purchaseStatus?: string;
  };
  isLoading: boolean;
  error: string | null;
  loadSubscriptionTiers: () => Promise<void>;
  loadUserSubscription: (userId: string) => Promise<void>;
  subscribeToTier: (priceId: string, mode?: 'payment' | 'subscription') => Promise<void>;
  updateStoriesRemaining: (newCount: number) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  tiers: [],
  userSubscription: {
    tier: 'free',
    storiesRemaining: 5
  },
  isLoading: false,
  error: null,
  
  loadSubscriptionTiers: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await getSubscriptionTiers();
      
      if (error) throw new Error(error.message);
      
      set({ tiers: data || [], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  loadUserSubscription: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Check for one-time purchase orders instead of subscriptions
      const userOrders = await getUserOrders();
      
      // Fallback to the original API for stories remaining
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/subscription-status?userId=${userId}`, {
      });

      let fallbackData = { tier: 'free', storiesRemaining: 5 };
      if (response.ok) {
        fallbackData = await response.json();
      }

      // Determine subscription tier based on completed orders
      let tier: 'free' | 'premium' = 'free';
      const hasCompletedPremiumOrder = userOrders.some(order => 
        order.order_status === 'completed' && order.payment_status === 'paid'
      );
      
      if (hasCompletedPremiumOrder) {
        tier = 'premium';
      }

      set({ 
        userSubscription: {
          tier,
          storiesRemaining: tier === 'premium' ? -1 : fallbackData.storiesRemaining,
        },
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: (error as Error).message, 
        isLoading: false,
        userSubscription: {
          tier: 'free',
          storiesRemaining: 5
        }
      });
    }
  },
  
  subscribeToTier: async (priceId, mode = 'subscription') => {
    set({ isLoading: true, error: null });
    try {
      await createCheckoutSession(priceId, mode);
      set({ isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      // Show user-friendly error message
      alert('There was an error processing your request. Please try again or contact support.');
    }
  },

  updateStoriesRemaining: (newCount) => {
    set(state => ({
      userSubscription: {
        ...state.userSubscription,
        storiesRemaining: newCount
      }
    }));
  }
}));