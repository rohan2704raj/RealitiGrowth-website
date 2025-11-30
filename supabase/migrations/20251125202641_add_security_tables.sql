/*
  # Add Security and Session Tracking Tables

  1. New Tables
    - `user_sessions` - Track active user sessions for security
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `device_info` (text) - Browser and device information
      - `ip_address` (text) - User's IP address
      - `created_at` (timestamptz) - When session was created
      - `expires_at` (timestamptz) - When session expires
      - `is_active` (boolean) - Whether session is still valid
      - `last_activity` (timestamptz) - Last activity timestamp

    - `login_attempts` - Track failed login attempts for rate limiting
      - `id` (uuid, primary key)
      - `email` (text) - Email attempted
      - `ip_address` (text) - IP address of attempt
      - `attempt_time` (timestamptz) - When attempt was made
      - `success` (boolean) - Whether login succeeded

  2. Security
    - Enable RLS on both tables
    - Users can view their own sessions
    - Only service role can manage login attempts

  3. Indexes
    - Index on user_id for quick session lookup
    - Index on email and ip_address for rate limiting
    - Index on attempt_time for cleanup
*/

-- Create user_sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_info text,
  ip_address text,
  created_at timestamptz DEFAULT now() NOT NULL,
  expires_at timestamptz DEFAULT (now() + interval '7 days') NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  last_activity timestamptz DEFAULT now() NOT NULL
);

-- Create login_attempts table for rate limiting
CREATE TABLE IF NOT EXISTS login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ip_address text,
  attempt_time timestamptz DEFAULT now() NOT NULL,
  success boolean DEFAULT false NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON login_attempts(ip_address);
CREATE INDEX IF NOT EXISTS idx_login_attempts_time ON login_attempts(attempt_time);

-- Enable RLS
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_sessions
CREATE POLICY "Users can view their own sessions"
  ON user_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage sessions"
  ON user_sessions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for login_attempts
CREATE POLICY "Service role can manage login attempts"
  ON login_attempts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to cleanup old login attempts (older than 1 hour)
CREATE OR REPLACE FUNCTION cleanup_old_login_attempts()
RETURNS void AS $$
BEGIN
  DELETE FROM login_attempts
  WHERE attempt_time < (now() - interval '1 hour');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check rate limit (max 5 attempts per 15 minutes)
CREATE OR REPLACE FUNCTION check_rate_limit(check_email text, check_ip text)
RETURNS boolean AS $$
DECLARE
  attempt_count integer;
BEGIN
  SELECT COUNT(*)
  INTO attempt_count
  FROM login_attempts
  WHERE (email = check_email OR ip_address = check_ip)
    AND attempt_time > (now() - interval '15 minutes')
    AND success = false;
  
  RETURN attempt_count < 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;