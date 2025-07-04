import { create } from 'zustand';
import { User } from '../types';
import { 
  signIn as supabaseSignIn, 
  signUp as supabaseSignUp, 
  signOut as supabaseSignOut,
  getCurrentUser,
  getUserProfile,
  supabase
} from '../lib/supabase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabaseSignIn(email, password);
      
      if (error) throw new Error(error.message);
      if (!data.user) throw new Error('No user returned from sign in');
      
      const { data: profile } = await getUserProfile(data.user.id);
      
      set({ 
        user: {
          id: data.user.id,
          email: data.user.email || '',
          created_at: data.user.created_at || '',
          subscription_tier: profile?.subscription_tier || 'free'
        }, 
        isLoading: false 
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabaseSignUp(email, password);
      
      if (error) throw new Error(error.message);
      if (!data.user) throw new Error('No user returned from sign up');
      
      // Create profile entry for new user
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email,
          subscription_tier: 'free',
          stories_generated: 0,
          stories_remaining: 5
        });
      
      if (profileError) {
        console.error('Error creating profile:', profileError);
        // If profile creation fails, sign out the user and throw an error
        await supabaseSignOut();
        throw new Error('Failed to create user profile. Please try signing up again.');
      }
      
      set({ 
        user: {
          id: data.user.id,
          email: data.user.email || '',
          created_at: data.user.created_at || '',
          subscription_tier: 'free'
        }, 
        isLoading: false 
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabaseSignOut();
      if (error) throw new Error(error.message);
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  loadUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await getCurrentUser();
      
      if (!user) {
        set({ user: null, isLoading: false });
        return;
      }
      
      let { data: profile } = await getUserProfile(user.id);
      
      // If profile doesn't exist, create one
      if (!profile) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            subscription_tier: 'free',
            stories_generated: 0,
            stories_remaining: 5
          });
        
        if (profileError) {
          console.error('Error creating profile:', profileError);
          throw new Error('Failed to create user profile');
        }
        
        // Fetch the newly created profile
        const { data: newProfile } = await getUserProfile(user.id);
        profile = newProfile;
      }
      
      set({ 
        user: {
          id: user.id,
          email: user.email || '',
          created_at: user.created_at || '',
          subscription_tier: profile?.subscription_tier || 'free'
        }, 
        isLoading: false 
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false, user: null });
    }
  }
}));