/*
  # Cashfree Payment Gateway Tables

  ## Overview
  Creates tables to support Cashfree payment gateway integration for one-time payments
  and recurring subscriptions.

  ## New Tables
  
  ### `payment_orders`
  Tracks all payment orders created via Cashfree for one-time payments (course enrollment).
  - `id` (uuid, primary key)
  - `order_id` (text, unique) - Our internal order ID
  - `cashfree_order_id` (text) - Cashfree's order ID
  - `amount` (numeric) - Order amount in INR
  - `currency` (text) - Currency code (INR)
  - `customer_id` (text) - Customer identifier
  - `customer_email` (text) - Customer email
  - `status` (text) - PENDING, SUCCESS, FAILED
  - `payment_id` (text, nullable) - Cashfree payment ID after success
  - `payment_method` (text, nullable) - Payment method used
  - `payment_session_id` (text) - Session ID for checkout
  - `paid_at` (timestamptz, nullable) - When payment was completed
  - `failure_reason` (text, nullable) - Reason if payment failed
  - `metadata` (jsonb) - Additional order metadata
  - `created_at` (timestamptz)

  ### `webhook_events`
  Logs all webhook events received from Cashfree for debugging and audit trail.
  - `id` (uuid, primary key)
  - `event_type` (text) - Type of webhook event
  - `payload` (jsonb) - Full webhook payload
  - `processed` (boolean) - Whether event has been processed
  - `error_message` (text, nullable) - Error if processing failed
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Only service role can write to these tables
  - Users can view their own orders

  ## Indexes
  - Fast lookups by order_id, cashfree_order_id
  - Efficient querying for webhook events
*/

-- ============================================================================
-- PAYMENT ORDERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS payment_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text UNIQUE NOT NULL,
  cashfree_order_id text,
  amount numeric(10, 2) NOT NULL,
  currency text DEFAULT 'INR',
  customer_id text NOT NULL,
  customer_email text NOT NULL,
  status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED')),
  payment_id text,
  payment_method text,
  payment_session_id text,
  paid_at timestamptz,
  failure_reason text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Indexes for payment_orders
CREATE INDEX IF NOT EXISTS idx_payment_orders_order_id 
  ON payment_orders(order_id);

CREATE INDEX IF NOT EXISTS idx_payment_orders_cashfree_order_id 
  ON payment_orders(cashfree_order_id);

CREATE INDEX IF NOT EXISTS idx_payment_orders_customer_email 
  ON payment_orders(customer_email);

CREATE INDEX IF NOT EXISTS idx_payment_orders_status 
  ON payment_orders(status);

CREATE INDEX IF NOT EXISTS idx_payment_orders_created_at 
  ON payment_orders(created_at DESC);

-- ============================================================================
-- WEBHOOK EVENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  payload jsonb NOT NULL,
  processed boolean DEFAULT false,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Indexes for webhook_events
CREATE INDEX IF NOT EXISTS idx_webhook_events_event_type 
  ON webhook_events(event_type);

CREATE INDEX IF NOT EXISTS idx_webhook_events_processed 
  ON webhook_events(processed);

CREATE INDEX IF NOT EXISTS idx_webhook_events_created_at 
  ON webhook_events(created_at DESC);

-- ============================================================================
-- UPDATE EXISTING SUBSCRIPTIONS TABLE
-- ============================================================================

-- Add Cashfree-specific columns to existing subscriptions table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'cashfree_subscription_id'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN cashfree_subscription_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'last_payment_date'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN last_payment_date timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'next_billing_date'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN next_billing_date timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'payment_method'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN payment_method text;
  END IF;
END $$;

-- Create index for Cashfree subscription ID
CREATE INDEX IF NOT EXISTS idx_subscriptions_cashfree_subscription_id 
  ON subscriptions(cashfree_subscription_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE payment_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;

-- Payment orders: Users can view their own orders
CREATE POLICY "Users can view own payment orders"
  ON payment_orders
  FOR SELECT
  TO authenticated
  USING (customer_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Webhook events: Only service role can access
-- (No policies needed as only service role will access)

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get order by order_id
CREATE OR REPLACE FUNCTION get_order_by_id(p_order_id text)
RETURNS TABLE (
  id uuid,
  order_id text,
  cashfree_order_id text,
  amount numeric,
  currency text,
  customer_email text,
  status text,
  payment_id text,
  payment_method text,
  paid_at timestamptz,
  created_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    po.id,
    po.order_id,
    po.cashfree_order_id,
    po.amount,
    po.currency,
    po.customer_email,
    po.status,
    po.payment_id,
    po.payment_method,
    po.paid_at,
    po.created_at
  FROM payment_orders po
  WHERE po.order_id = p_order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's payment history
CREATE OR REPLACE FUNCTION get_user_payment_history(p_user_email text)
RETURNS TABLE (
  order_id text,
  amount numeric,
  status text,
  payment_method text,
  paid_at timestamptz,
  created_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    po.order_id,
    po.amount,
    po.status,
    po.payment_method,
    po.paid_at,
    po.created_at
  FROM payment_orders po
  WHERE po.customer_email = p_user_email
  ORDER BY po.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark order as successful
CREATE OR REPLACE FUNCTION mark_order_successful(
  p_order_id text,
  p_payment_id text,
  p_payment_method text
)
RETURNS boolean AS $$
DECLARE
  v_updated boolean;
BEGIN
  UPDATE payment_orders
  SET 
    status = 'SUCCESS',
    payment_id = p_payment_id,
    payment_method = p_payment_method,
    paid_at = now()
  WHERE order_id = p_order_id
    AND status = 'PENDING';

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- CLEANUP OLD PENDING ORDERS
-- ============================================================================

-- Function to expire old pending orders (older than 24 hours)
CREATE OR REPLACE FUNCTION expire_old_pending_orders()
RETURNS integer AS $$
DECLARE
  v_expired_count integer;
BEGIN
  UPDATE payment_orders
  SET status = 'EXPIRED'
  WHERE status = 'PENDING'
    AND created_at < (now() - interval '24 hours');

  GET DIAGNOSTICS v_expired_count = ROW_COUNT;
  RETURN v_expired_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE payment_orders IS 'Stores all payment orders created via Cashfree for one-time payments';
COMMENT ON TABLE webhook_events IS 'Logs all webhook events from Cashfree for debugging and audit';
COMMENT ON FUNCTION get_order_by_id IS 'Retrieves order details by order ID';
COMMENT ON FUNCTION get_user_payment_history IS 'Retrieves payment history for a user';
COMMENT ON FUNCTION mark_order_successful IS 'Marks an order as successful with payment details';
COMMENT ON FUNCTION expire_old_pending_orders IS 'Expires pending orders older than 24 hours';
