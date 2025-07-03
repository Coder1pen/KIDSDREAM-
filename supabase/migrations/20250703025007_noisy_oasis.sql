/*
  # Add monthly story reset functionality

  1. Table Updates
    - Add `last_reset_date` column to profiles table
    - Add `stripe_customer_id` and `stripe_subscription_id` for payment integration
  
  2. Functions
    - `reset_monthly_stories()` - Resets story count for free users monthly
    - `get_days_until_reset()` - Calculates days until next reset
    - Updated `handle_new_user()` - Properly initializes new user profiles
  
  3. Data Updates
    - Set initial `last_reset_date` for existing profiles
*/

-- Ensure profiles table exists with all necessary columns
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  subscription_tier text DEFAULT 'free',
  created_at timestamptz DEFAULT now(),
  stories_generated integer DEFAULT 0,
  stories_remaining integer DEFAULT 5,
  stripe_customer_id text,
  stripe_subscription_id text,
  last_reset_date date DEFAULT CURRENT_DATE
);

-- Add last_reset_date column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'last_reset_date'
  ) THEN
    ALTER TABLE profiles ADD COLUMN last_reset_date date DEFAULT CURRENT_DATE;
  END IF;
END $$;

-- Add stripe columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'stripe_customer_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN stripe_customer_id text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'stripe_subscription_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN stripe_subscription_id text;
  END IF;
END $$;

-- Ensure stories table exists
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  is_favorite boolean DEFAULT false,
  theme text NOT NULL,
  age_group text NOT NULL,
  main_character text NOT NULL,
  setting text NOT NULL
);

-- Ensure subscription_tiers table exists
CREATE TABLE IF NOT EXISTS subscription_tiers (
  id text PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL,
  features text[] NOT NULL,
  stories_per_month integer NOT NULL,
  is_premium boolean DEFAULT false
);

-- Insert default subscription tiers if they don't exist
INSERT INTO subscription_tiers (id, name, price, features, stories_per_month, is_premium)
VALUES
  (
    'free',
    'Free Plan',
    0,
    ARRAY[
      '5 stories per month',
      'Basic story customization',
      'Save stories to your library',
      'Text-to-speech feature',
      'Download stories as text'
    ],
    5,
    false
  ),
  (
    'premium',
    'Premium Plan',
    9.99,
    ARRAY[
      'Unlimited stories',
      'Advanced story customization',
      'Priority story generation',
      'Text-to-speech with multiple voices',
      'Download stories in multiple formats',
      'Ad-free experience',
      'Early access to new features'
    ],
    -1,
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can view their own profile'
  ) THEN
    CREATE POLICY "Users can view their own profile"
      ON profiles
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can update their own profile'
  ) THEN
    CREATE POLICY "Users can update their own profile"
      ON profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id);
  END IF;
END $$;

-- Create policies for stories if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'stories' AND policyname = 'Users can view their own stories'
  ) THEN
    CREATE POLICY "Users can view their own stories"
      ON stories
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'stories' AND policyname = 'Users can create their own stories'
  ) THEN
    CREATE POLICY "Users can create their own stories"
      ON stories
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'stories' AND policyname = 'Users can update their own stories'
  ) THEN
    CREATE POLICY "Users can update their own stories"
      ON stories
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'stories' AND policyname = 'Users can delete their own stories'
  ) THEN
    CREATE POLICY "Users can delete their own stories"
      ON stories
      FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create policies for subscription_tiers if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'subscription_tiers' AND policyname = 'Anyone can view subscription tiers'
  ) THEN
    CREATE POLICY "Anyone can view subscription tiers"
      ON subscription_tiers
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- Function to reset monthly stories for free users
CREATE OR REPLACE FUNCTION reset_monthly_stories()
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET 
    stories_remaining = 5,
    last_reset_date = CURRENT_DATE
  WHERE 
    subscription_tier = 'free' 
    AND (last_reset_date IS NULL OR last_reset_date < DATE_TRUNC('month', CURRENT_DATE));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get days until next reset
CREATE OR REPLACE FUNCTION get_days_until_reset()
RETURNS integer AS $$
BEGIN
  RETURN EXTRACT(DAY FROM (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month') - CURRENT_DATE);
END;
$$ LANGUAGE plpgsql;

-- Create a function to handle new user signup with proper story allocation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, subscription_tier, stories_remaining, last_reset_date)
  VALUES (new.id, new.email, 'free', 5, CURRENT_DATE)
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    subscription_tier = COALESCE(profiles.subscription_tier, 'free'),
    stories_remaining = COALESCE(profiles.stories_remaining, 5),
    last_reset_date = COALESCE(profiles.last_reset_date, CURRENT_DATE);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

-- Update existing profiles to have last_reset_date if they don't have one
UPDATE profiles 
SET last_reset_date = CURRENT_DATE 
WHERE last_reset_date IS NULL;

-- Ensure all existing free users have proper story allocation
UPDATE profiles 
SET stories_remaining = 5 
WHERE subscription_tier = 'free' AND stories_remaining IS NULL;