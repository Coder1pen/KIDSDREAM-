export interface User {
  id: string;
  email: string;
  created_at: string;
  subscription_tier: 'free' | 'premium';
}

export interface Story {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  is_favorite: boolean;
  theme: string;
  age_group: string;
  main_character: string;
  setting: string;
}

export interface StoryPrompt {
  main_character: string;
  age_group: string;
  setting: string;
  theme: string;
  additional_details?: string;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  stories_per_month: number;
  is_premium: boolean;
}