import { create } from 'zustand';
import { SubscriptionTier } from '../types';
import { getSubscriptionTiers } from '../lib/supabase';
import { createCheckoutSession, createPortalSession, getSubscriptionStatus } from '../lib/stripe';

interface SubscriptionState {
  tiers: SubscriptionTier[];
  userSubscription: {
    tier: 'free' | 'premium';
    storiesRemaining: number;
  };
  isLoading: boolean;
  error: string | null;
  loadSubscriptionTiers: () => Promise<void>;
  loadUserSubscription: (userId: string) => Promise<void>;
  subscribeToTier: (priceId: string, userId: string) => Promise<void>;
  manageSubscription: (customerId: string) => Promise<void>;
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
  
  loadUserSubscription: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const subscription = await getSubscriptionStatus(userId);
      
      set({ 
        userSubscription: {
          tier: subscription.tier || 'free',
          storiesRemaining: subscription.storiesRemaining || 5
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
  
  subscribeToTier: async (priceId, userId) => {
    set({ isLoading: true, error: null });
    try {
      await createCheckoutSession(priceId, userId);
      set({ isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      // Show user-friendly error message
      alert('There was an error processing your request. Please try again or contact support.');
    }
  },
  
  manageSubscription: async (customerId) => {
    set({ isLoading: true, error: null });
    try {
      await createPortalSession(customerId);
      set({ isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      alert('There was an error accessing the customer portal. Please try again or contact support.');
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