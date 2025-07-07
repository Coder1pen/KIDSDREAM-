/*
  # Add INSERT policy for profiles table

  1. Security Changes
    - Add policy for authenticated users to insert their own profile data
    - This allows new users to create their profile during signup process

  2. Policy Details
    - Policy name: "Users can insert their own profile"
    - Applies to: INSERT operations
    - Target: authenticated users
    - Condition: The user ID in the new row matches the authenticated user's ID
*/

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);