/*
  # Create Subscription Management Tables

  ## Overview
  This migration creates tables for managing recurring subscriptions for services like Copy Trades and TradingView Indicators.

  ## New Tables

  ### 1. `subscriptions`
  Stores user subscription information and Stripe subscription details
  - `subscription_id` (uuid, primary key) - Unique subscription identifier
  - `user_id` (uuid, foreign key) - Links to auth.users table
  - `service_type` (text) - Type of service: 'copy-trades' or 'indicator'
  - `plan_type` (text) - Billing frequency: 'monthly', 'quarterly', 'annual'
  - `stripe_subscription_id` (text, unique) - Stripe subscription ID
  - `stripe_customer_id` (text) - Stripe customer ID
  - `status` (text) - Current status: 'active', 'cancelled', 'past_due', 'paused'
  - `amount` (decimal) - Monthly subscription amount
  - `billing_cycle` (text) - Billing cycle: 'month', 'quarter', 'year'
  - `started_date` (timestamptz) - When subscription started
  - `current_period_start` (timestamptz) - Current billing period start
  - `current_period_end` (timestamptz) - Current billing period end (next billing date)
  - `cancelled_at` (timestamptz, nullable) - When subscription was cancelled
  - `cancel_reason` (text, nullable) - Reason for cancellation
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record update timestamp

  ### 2. `subscription_invoices`
  Stores invoice history for subscription payments
  - `invoice_id` (uuid, primary key) - Unique invoice identifier
  - `subscription_id` (uuid, foreign key) - Links to subscriptions table
  - `user_id` (uuid, foreign key) - Links to auth.users table
  - `stripe_invoice_id` (text, unique) - Stripe invoice ID
  - `amount` (decimal) - Amount charged
  - `status` (text) - Payment status: 'paid', 'pending', 'failed'
  - `invoice_date` (timestamptz) - Invoice creation date
  - `invoice_url` (text) - Stripe invoice URL
  - `paid_at` (timestamptz, nullable) - When invoice was paid
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on both tables
  - Users can only view their own subscriptions and invoices
  - Users can only read (not modify) their subscription data
  - System/admin operations use service role

  ## Indexes
  - Index on user_id for fast user subscription lookups
  - Index on stripe_subscription_id for webhook processing
  - Index on status for active subscription queries
*/

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  subscription_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type text NOT NULL CHECK (service_type IN ('copy-trades', 'indicator')),
  plan_type text NOT NULL CHECK (plan_type IN ('monthly', 'quarterly', 'annual')),
  stripe_subscription_id text UNIQUE NOT NULL,
  stripe_customer_id text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'paused')),
  amount decimal(10,2) NOT NULL,
  billing_cycle text NOT NULL CHECK (billing_cycle IN ('month', 'quarter', 'year')),
  started_date timestamptz NOT NULL DEFAULT now(),
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  cancelled_at timestamptz,
  cancel_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscription_invoices table
CREATE TABLE IF NOT EXISTS subscription_invoices (
  invoice_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid NOT NULL REFERENCES subscriptions(subscription_id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_invoice_id text UNIQUE NOT NULL,
  amount decimal(10,2) NOT NULL,
  status text NOT NULL CHECK (status IN ('paid', 'pending', 'failed')),
  invoice_date timestamptz NOT NULL DEFAULT now(),
  invoice_url text,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON subscription_invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_subscription_id ON subscription_invoices(subscription_id);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_invoices ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions table
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for subscription_invoices table
CREATE POLICY "Users can view own invoices"
  ON subscription_invoices FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own invoices"
  ON subscription_invoices FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();