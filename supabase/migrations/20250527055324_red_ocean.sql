/*
  # Initial Schema Setup for KIDS DREAM

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `email` (text)
      - `subscription_tier` (text)
      - `created_at` (timestamp)
      - `stories_generated` (integer)
      - `stories_remaining` (integer)
    - `stories`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `is_favorite` (boolean)
      - `theme` (text)
      - `age_group` (text)
      - `main_character` (text)
      - `setting` (text)
    - `subscription_tiers`
      - `id` (text, primary key)
      - `name` (text)
      - `price` (numeric)
      - `features` (text[])
      - `stories_per_month` (integer)
      - `is_premium` (boolean)
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read and manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  subscription_tier text DEFAULT 'free',
  created_at timestamptz DEFAULT now(),
  stories_generated integer DEFAULT 0,
  stories_remaining integer DEFAULT 5
);

-- Create stories table
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

-- Create subscription_tiers table
CREATE TABLE IF NOT EXISTS subscription_tiers (
  id text PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL,
  features text[] NOT NULL,
  stories_per_month integer NOT NULL,
  is_premium boolean DEFAULT false
);

-- Insert default subscription tiers
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
  );

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for stories
CREATE POLICY "Users can view their own stories"
  ON stories
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own stories"
  ON stories
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stories"
  ON stories
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stories"
  ON stories
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for subscription_tiers
CREATE POLICY "Anyone can view subscription tiers"
  ON subscription_tiers
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create function to create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, subscription_tier, stories_remaining)
  VALUES (new.id, new.email, 'free', 5);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();