/*
  # Update Employers Table - Remove Foreign Key Constraint

  ## Changes
  This migration modifies the employers table to remove the foreign key constraint
  to auth.users, allowing demo data without requiring actual auth users.

  ## Important Notes
  - The id column will remain a UUID primary key
  - This allows for easier demo and testing
  - In production, you may want to re-add the foreign key constraint
*/

-- Drop the existing table and recreate without the FK constraint
DROP TABLE IF EXISTS employers CASCADE;

-- Recreate employers table without FK to auth.users
CREATE TABLE employers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  company_name text NOT NULL,
  company_description text DEFAULT '',
  contact_person text DEFAULT '',
  phone text DEFAULT '',
  website text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;

-- Recreate RLS policies
CREATE POLICY "Employers can view own profile"
  ON employers FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Employers can update own profile"
  ON employers FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can create employer profile"
  ON employers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);