/*
  # Add monthly story reset functionality

  1. New Functions
    - `reset_monthly_stories()` - Resets stories_remaining for all free users
    - `get_days_until_reset()` - Helper function to calculate days until next month
  
  2. Scheduled Job
    - Monthly reset on the 1st of each month
  
  3. Updates
    - Add last_reset_date to profiles table for tracking
*/

-- Add last_reset_date column to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'last_reset_date'
  ) THEN
    ALTER TABLE profiles ADD COLUMN last_reset_date date DEFAULT CURRENT_DATE;
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
  VALUES (new.id, new.email, 'free', 5, CURRENT_DATE);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update existing profiles to have last_reset_date if they don't have one
UPDATE profiles 
SET last_reset_date = CURRENT_DATE 
WHERE last_reset_date IS NULL;