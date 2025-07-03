/*
  # Add missing columns to profiles table

  1. Changes
    - Add stripe_customer_id column if it doesn't exist
    - Add stripe_subscription_id column if it doesn't exist  
    - Add last_reset_date column if it doesn't exist
    - Update existing profiles to have proper default values
  
  2. Security
    - Maintain existing RLS policies
    - Ensure data integrity
*/

-- Add stripe_customer_id column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'stripe_customer_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN stripe_customer_id text;
  END IF;
END $$;

-- Add stripe_subscription_id column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'stripe_subscription_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN stripe_subscription_id text;
  END IF;
END $$;

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

-- Update existing profiles to have last_reset_date if they don't have one
UPDATE profiles 
SET last_reset_date = CURRENT_DATE 
WHERE last_reset_date IS NULL;

-- Ensure all existing free users have proper story allocation
UPDATE profiles 
SET stories_remaining = 5 
WHERE subscription_tier = 'free' AND (stories_remaining IS NULL OR stories_remaining < 0);

-- Update the handle_new_user function to include all new columns
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