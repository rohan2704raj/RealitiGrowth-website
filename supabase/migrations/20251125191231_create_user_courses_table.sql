/*
  # Create user_courses table for course access management

  1. New Tables
    - `user_courses`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, foreign key) - References auth.users
      - `course_name` (text) - Name of the course
      - `enrollment_id` (uuid, foreign key) - References enrollments table
      - `access_granted` (boolean) - Whether user has access to the course
      - `created_at` (timestamptz) - When access was granted

  2. Security
    - Enable RLS on `user_courses` table
    - Add policy for authenticated users to read their own courses
    - Add policy for service role to manage course access

  3. Changes
    - Add user_id column to enrollments table if not exists
    - Create index on user_id for better query performance
*/

-- Add user_id to enrollments table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enrollments' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE enrollments ADD COLUMN user_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Create user_courses table
CREATE TABLE IF NOT EXISTS user_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_name text NOT NULL,
  enrollment_id uuid NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  access_granted boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_courses_user_id ON user_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_enrollment_id ON user_courses(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);

-- Enable RLS
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own courses
CREATE POLICY "Users can view their own courses"
  ON user_courses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Service role can insert courses
CREATE POLICY "Service role can insert courses"
  ON user_courses
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Service role can update courses
CREATE POLICY "Service role can update courses"
  ON user_courses
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Service role can delete courses
CREATE POLICY "Service role can delete courses"
  ON user_courses
  FOR DELETE
  TO service_role
  USING (true);