/*
  # Create Enrollment and Leads Tables

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `trading_experience` (text)
      - `wants_updates` (boolean)
      - `source` (text) - tracks which service they inquired about
      - `created_at` (timestamptz)
    
    - `enrollments`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `service_name` (text)
      - `service_price` (numeric)
      - `status` (text) - pending, completed, failed
      - `order_id` (text, unique)
      - `transaction_id` (text)
      - `payment_method` (text)
      - `promo_code` (text)
      - `discount_amount` (numeric)
      - `final_amount` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  trading_experience text NOT NULL,
  wants_updates boolean DEFAULT false,
  source text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create leads"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (email = current_user);

CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_name text NOT NULL,
  service_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  order_id text UNIQUE NOT NULL,
  transaction_id text,
  payment_method text,
  promo_code text,
  discount_amount numeric DEFAULT 0,
  final_amount numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create enrollments"
  ON enrollments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (email = current_user);

CREATE POLICY "Users can update own enrollments"
  ON enrollments
  FOR UPDATE
  TO authenticated
  USING (email = current_user)
  WITH CHECK (email = current_user);