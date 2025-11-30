/*
  # Email System Tables

  ## Overview
  Creates tables for managing email templates and tracking email sends.
  This system supports transactional emails for authentication, enrollments, and subscriptions.

  ## New Tables
  
  ### `email_templates`
  Stores reusable email templates with HTML and plain text versions.
  - `id` (uuid, primary key)
  - `template_key` (text, unique) - Identifier like 'welcome_email', 'payment_confirmation'
  - `template_name` (text) - Human-readable name
  - `category` (text) - 'authentication', 'enrollment', 'subscription'
  - `subject` (text) - Email subject line with variable placeholders
  - `html_body` (text) - HTML email template with variable placeholders
  - `text_body` (text) - Plain text version
  - `variables` (jsonb) - Array of required variables like ['user_name', 'order_id']
  - `is_active` (boolean) - Enable/disable template
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `email_logs`
  Tracks all sent emails for debugging and compliance.
  - `id` (uuid, primary key)
  - `user_id` (uuid, nullable) - Reference to auth.users
  - `email_to` (text) - Recipient email
  - `template_key` (text) - Which template was used
  - `subject` (text) - Actual subject sent
  - `status` (text) - 'pending', 'sent', 'failed', 'bounced'
  - `external_id` (text) - Email service provider's message ID
  - `error_message` (text, nullable) - Error details if failed
  - `metadata` (jsonb) - Additional data like order_id, subscription_id
  - `sent_at` (timestamptz, nullable)
  - `opened_at` (timestamptz, nullable)
  - `clicked_at` (timestamptz, nullable)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Only service role can write to these tables
  - Users can view their own email logs

  ## Indexes
  - Fast lookups by template_key, user_id, status
  - Efficient querying for email analytics
*/

-- ============================================================================
-- EMAIL TEMPLATES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_key text UNIQUE NOT NULL,
  template_name text NOT NULL,
  category text NOT NULL CHECK (category IN ('authentication', 'enrollment', 'subscription', 'notification')),
  subject text NOT NULL,
  html_body text NOT NULL,
  text_body text NOT NULL,
  variables jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index for fast template lookups
CREATE INDEX IF NOT EXISTS idx_email_templates_key 
  ON email_templates(template_key) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_email_templates_category 
  ON email_templates(category);

-- ============================================================================
-- EMAIL LOGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email_to text NOT NULL,
  template_key text NOT NULL,
  subject text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'bounced', 'delivered')),
  external_id text,
  error_message text,
  metadata jsonb DEFAULT '{}'::jsonb,
  sent_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Indexes for email log queries
CREATE INDEX IF NOT EXISTS idx_email_logs_user_id 
  ON email_logs(user_id);

CREATE INDEX IF NOT EXISTS idx_email_logs_template_key 
  ON email_logs(template_key);

CREATE INDEX IF NOT EXISTS idx_email_logs_status 
  ON email_logs(status);

CREATE INDEX IF NOT EXISTS idx_email_logs_created_at 
  ON email_logs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_email_logs_email_to 
  ON email_logs(email_to);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Email templates: Only service role can manage templates
-- No user-facing policies needed

-- Email logs: Users can view their own email history
CREATE POLICY "Users can view own email logs"
  ON email_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Service role can do everything (handled automatically)

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_email_template_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for email_templates
DROP TRIGGER IF EXISTS update_email_templates_timestamp ON email_templates;
CREATE TRIGGER update_email_templates_timestamp
  BEFORE UPDATE ON email_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_email_template_timestamp();

-- ============================================================================
-- INITIAL EMAIL TEMPLATES
-- ============================================================================

-- We'll add templates via application code for better maintainability
-- This ensures templates are version-controlled and can include complex HTML

COMMENT ON TABLE email_templates IS 'Stores reusable email templates for transactional emails';
COMMENT ON TABLE email_logs IS 'Tracks all sent emails for debugging and analytics';
