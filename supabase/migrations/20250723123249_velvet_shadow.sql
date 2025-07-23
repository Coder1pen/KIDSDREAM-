/*
  # Update subscription tiers for one-time purchase model

  1. Changes
    - Update premium tier pricing and description to reflect one-time purchase
    - Modify features to emphasize lifetime access
    - Update stories_per_month to -1 for unlimited

  2. Security
    - No changes to existing RLS policies
*/

-- Update the premium tier to reflect one-time purchase model
UPDATE subscription_tiers 
SET 
  name = 'Premium Plan (Lifetime)',
  features = ARRAY[
    'Unlimited stories forever',
    'Advanced story customization',
    'Priority story generation', 
    'Text-to-speech with multiple voices',
    'Download stories in multiple formats',
    'Ad-free experience',
    'Lifetime access to premium features'
  ],
  stories_per_month = -1
WHERE id = 'premium';

-- Ensure free tier is properly configured
UPDATE subscription_tiers 
SET 
  features = ARRAY[
    '5 stories per month',
    'Basic story customization',
    'Save stories to your library',
    'Text-to-speech feature',
    'Download stories as text'
  ]
WHERE id = 'free';