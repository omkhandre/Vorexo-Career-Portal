/*
  # Job Portal Database Schema

  ## Overview
  This migration creates the complete database structure for the VOREXO Job Portal,
  including tables for employers, job postings, and applications.

  ## New Tables
  
  ### 1. `employers`
  Stores employer account information
  - `id` (uuid, primary key) - Unique employer identifier linked to auth.users
  - `email` (text, unique) - Employer email for login
  - `company_name` (text) - Name of the company
  - `company_description` (text) - About the company
  - `contact_person` (text) - Contact person name
  - `phone` (text) - Contact phone number
  - `website` (text) - Company website URL
  - `created_at` (timestamptz) - Account creation timestamp
  
  ### 2. `job_postings`
  Stores all job postings created by employers
  - `id` (uuid, primary key) - Unique job posting identifier
  - `employer_id` (uuid, foreign key) - References employers table
  - `title` (text) - Job title
  - `description` (text) - Job description
  - `company_name` (text) - Company name
  - `location` (text) - Job location
  - `job_type` (text) - Full-time, Part-time, Contract, Internship
  - `work_mode` (text) - Remote, On-site, Hybrid
  - `experience_level` (text) - Entry, Mid, Senior
  - `education_required` (text) - Education requirements
  - `skills_required` (text[]) - Array of required skills
  - `salary_min` (integer) - Minimum salary
  - `salary_max` (integer) - Maximum salary
  - `deadline` (date) - Application deadline
  - `is_featured` (boolean) - Featured job flag
  - `is_closed` (boolean) - Job closed flag
  - `is_expired` (boolean) - Job expired flag
  - `views_count` (integer) - Number of views
  - `created_at` (timestamptz) - Posting creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 3. `applications`
  Stores all job applications submitted by students
  - `id` (uuid, primary key) - Unique application identifier
  - `job_id` (uuid, foreign key) - References job_postings table
  - `applicant_name` (text) - Applicant's full name
  - `applicant_email` (text) - Applicant's email
  - `applicant_phone` (text) - Applicant's phone number
  - `resume_url` (text) - URL to uploaded resume
  - `cover_letter` (text) - Cover letter text
  - `extracted_skills` (text[]) - Skills extracted from resume
  - `status` (text) - Application status (Pending, Under Review, Shortlisted, Rejected, Hired)
  - `applied_at` (timestamptz) - Application submission timestamp

  ## Security
  - Enable RLS on all tables
  - Employers can only manage their own data
  - Job postings are publicly readable
  - Applications are visible only to the job poster
  - Students can apply without authentication (anon access)

  ## Indexes
  - Added indexes on foreign keys and commonly queried columns for performance
*/

-- Create employers table
CREATE TABLE IF NOT EXISTS employers (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  company_name text NOT NULL,
  company_description text DEFAULT '',
  contact_person text DEFAULT '',
  phone text DEFAULT '',
  website text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create job_postings table
CREATE TABLE IF NOT EXISTS job_postings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id uuid REFERENCES employers(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  company_name text NOT NULL,
  location text NOT NULL,
  job_type text NOT NULL,
  work_mode text DEFAULT 'On-site',
  experience_level text DEFAULT 'Entry',
  education_required text DEFAULT '',
  skills_required text[] DEFAULT '{}',
  salary_min integer DEFAULT 0,
  salary_max integer DEFAULT 0,
  deadline date,
  is_featured boolean DEFAULT false,
  is_closed boolean DEFAULT false,
  is_expired boolean DEFAULT false,
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES job_postings(id) ON DELETE CASCADE NOT NULL,
  applicant_name text NOT NULL,
  applicant_email text NOT NULL,
  applicant_phone text DEFAULT '',
  resume_url text NOT NULL,
  cover_letter text DEFAULT '',
  extracted_skills text[] DEFAULT '{}',
  status text DEFAULT 'Pending',
  applied_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for employers table
CREATE POLICY "Employers can view own profile"
  ON employers FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Employers can update own profile"
  ON employers FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Authenticated users can create employer profile"
  ON employers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for job_postings table
CREATE POLICY "Anyone can view active job postings"
  ON job_postings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Employers can create job postings"
  ON job_postings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = employer_id);

CREATE POLICY "Employers can update own job postings"
  ON job_postings FOR UPDATE
  TO authenticated
  USING (auth.uid() = employer_id)
  WITH CHECK (auth.uid() = employer_id);

CREATE POLICY "Employers can delete own job postings"
  ON job_postings FOR DELETE
  TO authenticated
  USING (auth.uid() = employer_id);

-- RLS Policies for applications table
CREATE POLICY "Anyone can create applications"
  ON applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Employers can view applications for their jobs"
  ON applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM job_postings
      WHERE job_postings.id = applications.job_id
      AND job_postings.employer_id = auth.uid()
    )
  );

CREATE POLICY "Employers can update application status"
  ON applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM job_postings
      WHERE job_postings.id = applications.job_id
      AND job_postings.employer_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM job_postings
      WHERE job_postings.id = applications.job_id
      AND job_postings.employer_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_job_postings_employer ON job_postings(employer_id);
CREATE INDEX IF NOT EXISTS idx_job_postings_created ON job_postings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_job ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(applicant_email);