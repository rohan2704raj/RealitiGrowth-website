/*
  # Add Indicator Service Features to Subscriptions

  ## Overview
  This migration extends the subscriptions system to support indicator service-specific features
  including platform selection, license keys, device management, and download tracking.

  ## Changes to Existing Tables

  ### `subscriptions` table additions
  - `selected_platforms` (jsonb) - Array of selected platforms (MT4, MT5, TradingView, NinjaTrader)
  - `license_key` (text, unique) - Generated activation key for indicator
  - `devices_activated` (integer) - Current number of activated devices
  - `max_devices` (integer) - Maximum allowed devices per plan

  ## New Tables

  ### `indicator_downloads`
  Tracks each time a user downloads the indicator file
  - `download_id` (uuid, primary key) - Unique download identifier
  - `user_id` (uuid, foreign key) - Links to auth.users
  - `subscription_id` (uuid, foreign key) - Links to subscriptions
  - `platform` (text) - Platform downloaded for: 'mt4', 'mt5', 'tradingview', 'ninjatrader'
  - `file_name` (text) - Name of downloaded file
  - `version` (text) - Indicator version (e.g., '2.3')
  - `download_date` (timestamptz) - When download occurred
  - `ip_address` (text) - User's IP address
  - `device_info` (text) - Browser/OS information
  - `created_at` (timestamptz) - Record creation timestamp

  ### `indicator_activations`
  Tracks device activations for license management
  - `activation_id` (uuid, primary key) - Unique activation identifier
  - `user_id` (uuid, foreign key) - Links to auth.users
  - `subscription_id` (uuid, foreign key) - Links to subscriptions
  - `license_key` (text) - License key used for activation
  - `platform` (text) - Platform activated on
  - `device_id` (text) - Unique device identifier
  - `device_name` (text) - User-friendly device name
  - `activated_at` (timestamptz) - When device was activated
  - `last_used` (timestamptz) - Last time device used the indicator
  - `is_active` (boolean) - Whether activation is currently active
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on new tables
  - Users can only view their own downloads and activations
  - License keys are unique and indexed for fast lookups

  ## Indexes
  - Index on license_key for activation lookups
  - Index on user_id for user-specific queries
  - Index on platform for analytics
*/

-- Add new columns to subscriptions table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'selected_platforms'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN selected_platforms jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'license_key'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN license_key text UNIQUE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'devices_activated'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN devices_activated integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'max_devices'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN max_devices integer DEFAULT 3;
  END IF;
END $$;

-- Create indicator_downloads table
CREATE TABLE IF NOT EXISTS indicator_downloads (
  download_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id uuid NOT NULL REFERENCES subscriptions(subscription_id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('mt4', 'mt5', 'tradingview', 'ninjatrader')),
  file_name text NOT NULL,
  version text NOT NULL DEFAULT '2.3',
  download_date timestamptz NOT NULL DEFAULT now(),
  ip_address text,
  device_info text,
  created_at timestamptz DEFAULT now()
);

-- Create indicator_activations table
CREATE TABLE IF NOT EXISTS indicator_activations (
  activation_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id uuid NOT NULL REFERENCES subscriptions(subscription_id) ON DELETE CASCADE,
  license_key text NOT NULL,
  platform text NOT NULL CHECK (platform IN ('mt4', 'mt5', 'tradingview', 'ninjatrader')),
  device_id text NOT NULL,
  device_name text NOT NULL,
  activated_at timestamptz NOT NULL DEFAULT now(),
  last_used timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(subscription_id, device_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_license_key ON subscriptions(license_key);
CREATE INDEX IF NOT EXISTS idx_downloads_user_id ON indicator_downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_downloads_subscription_id ON indicator_downloads(subscription_id);
CREATE INDEX IF NOT EXISTS idx_downloads_platform ON indicator_downloads(platform);
CREATE INDEX IF NOT EXISTS idx_activations_user_id ON indicator_activations(user_id);
CREATE INDEX IF NOT EXISTS idx_activations_subscription_id ON indicator_activations(subscription_id);
CREATE INDEX IF NOT EXISTS idx_activations_license_key ON indicator_activations(license_key);

-- Enable Row Level Security
ALTER TABLE indicator_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE indicator_activations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for indicator_downloads
CREATE POLICY "Users can view own downloads"
  ON indicator_downloads FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own downloads"
  ON indicator_downloads FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for indicator_activations
CREATE POLICY "Users can view own activations"
  ON indicator_activations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activations"
  ON indicator_activations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activations"
  ON indicator_activations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to generate unique license key
CREATE OR REPLACE FUNCTION generate_license_key()
RETURNS text AS $$
DECLARE
  key_prefix text := 'RTIG';
  key_part1 text;
  key_part2 text;
  key_part3 text;
  key_part4 text;
  full_key text;
  key_exists boolean;
BEGIN
  LOOP
    key_part1 := LPAD(FLOOR(RANDOM() * 10000)::text, 4, '0');
    key_part2 := LPAD(FLOOR(RANDOM() * 10000)::text, 4, '0');
    key_part3 := LPAD(FLOOR(RANDOM() * 10000)::text, 4, '0');
    key_part4 := LPAD(FLOOR(RANDOM() * 10000)::text, 4, '0');
    
    full_key := key_prefix || '-' || key_part1 || '-' || key_part2 || '-' || key_part3 || '-' || key_part4;
    
    SELECT EXISTS(SELECT 1 FROM subscriptions WHERE license_key = full_key) INTO key_exists;
    
    IF NOT key_exists THEN
      RETURN full_key;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to update last_used timestamp on activations
CREATE OR REPLACE FUNCTION update_activation_last_used()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_used = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update last_used on activation updates
CREATE TRIGGER update_activation_last_used_trigger
  BEFORE UPDATE ON indicator_activations
  FOR EACH ROW
  EXECUTE FUNCTION update_activation_last_used();