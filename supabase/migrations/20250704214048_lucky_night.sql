/*
  # Add missing id column to stories table

  1. Changes
    - Add `id` column as primary key to `stories` table
    - Use uuid with auto-generation for new stories
    - Update existing stories to have unique IDs

  2. Security
    - Maintain existing RLS policies
    - No changes to security model
*/

-- Add id column as primary key
ALTER TABLE stories ADD COLUMN id uuid PRIMARY KEY DEFAULT gen_random_uuid();

-- Update existing stories to have unique IDs (if any exist)
UPDATE stories SET id = gen_random_uuid() WHERE id IS NULL;

-- Make sure the column is not nullable
ALTER TABLE stories ALTER COLUMN id SET NOT NULL;