# RealitiGrowth - Authentication & Payment Integration Setup Guide

## Overview
This application now includes complete authentication via Supabase Auth and payment processing via Stripe with proper backend integration.

## Prerequisites
- Supabase account with a project
- Stripe account (test mode for development)

## Environment Variables Setup

The application requires the following environment variables in your `.env` file:

```env
# Supabase Configuration (Already configured)
VITE_SUPABASE_URL=https://xciaubvwqddcpirfkdnf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe Configuration (Required)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# For Edge Functions (Server-side only, do not add to .env)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Step 1: Configure Supabase Authentication

### Enable Email/Password Authentication
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable "Email" provider
3. Disable "Confirm email" (optional, recommended for testing)
4. Save settings

### Database Schema
The database schema has been automatically created with the following tables:
- `enrollments` - Stores enrollment and payment records
- `user_courses` - Manages user course access
- `leads` - Stores lead capture data

## Step 2: Configure Stripe

### Get Your Stripe Keys
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)
4. Add them to your environment variables

### Deploy Edge Functions

#### Deploy Payment Intent Function
```bash
# This function creates payment intents
npm run deploy-function create-payment-intent
```

Or using the Supabase MCP tool (already available):
The edge functions are already created at:
- `supabase/functions/create-payment-intent/index.ts`
- `supabase/functions/stripe-webhook/index.ts`

To deploy them, you need to:
1. Install Supabase CLI: https://supabase.com/docs/guides/cli
2. Link your project: `supabase link --project-ref xciaubvwqddcpirfkdnf`
3. Deploy functions:
   ```bash
   supabase functions deploy create-payment-intent
   supabase functions deploy stripe-webhook
   ```

#### Configure Stripe Secrets in Supabase
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_your_secret_key
```

### Setup Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter URL: `https://xciaubvwqddcpirfkdnf.supabase.co/functions/v1/stripe-webhook`
4. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payment_intent.canceled`
5. Copy the webhook signing secret (starts with `whsec_`)
6. Set it in Supabase:
   ```bash
   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

## Step 3: Testing the Application

### Test User Flow

1. **Registration**
   - Navigate to `/signup`
   - Create a new account with email and password
   - You'll be automatically logged in and redirected to `/dashboard`

2. **Login**
   - Navigate to `/login`
   - Enter your credentials
   - Access your dashboard at `/dashboard`

3. **Enrollment & Payment**
   - Click "Enroll Now" on any course
   - Fill out registration form
   - Enter test card details:
     - Card: `4242 4242 4242 4242`
     - Expiry: Any future date
     - CVC: Any 3 digits
     - ZIP: Any 5 digits
   - Complete payment

4. **Test Promo Codes**
   - `GROWTH200` - ₹16,700 discount
   - `SAVE10` - ₹3,500 discount
   - `WELCOME` - ₹5,000 discount

### Test Cards (Stripe Test Mode)

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 9995 | Declined |
| 4000 0025 0000 3155 | Requires 3D Secure |

## Application Features

### Authentication System
- ✅ Email/Password registration and login
- ✅ Protected routes with automatic redirect
- ✅ User session management
- ✅ Secure password handling
- ✅ Logout functionality

### Payment Integration
- ✅ Real Stripe payment processing
- ✅ Payment Element with multiple payment methods
- ✅ Card, UPI, Net Banking, Wallets support
- ✅ Promo code system
- ✅ Secure payment intent creation
- ✅ Webhook handling for payment events
- ✅ Automatic course access on successful payment

### Database Structure
- ✅ User authentication via Supabase Auth
- ✅ Enrollment records with payment tracking
- ✅ Course access management
- ✅ Row Level Security (RLS) policies

### User Experience
- ✅ Modern, responsive UI
- ✅ Loading states and error handling
- ✅ Mobile-optimized checkout
- ✅ Security badges and trust indicators
- ✅ 30-day money-back guarantee
- ✅ User dashboard with course access

## Architecture

### Frontend (React + TypeScript + Vite)
- **Auth Context**: Manages authentication state across the app
- **Protected Routes**: Redirects unauthenticated users to login
- **Stripe Elements**: Handles payment UI securely
- **Supabase Client**: Manages database operations

### Backend (Supabase Edge Functions)
- **create-payment-intent**: Creates Stripe payment intents
- **stripe-webhook**: Handles Stripe webhook events
- Automatically grants course access on successful payment

### Database (Supabase PostgreSQL)
- **auth.users**: Built-in Supabase user management
- **enrollments**: Payment and enrollment records
- **user_courses**: Course access management
- **leads**: Marketing lead capture

## Security Features

✅ **Frontend Security**
- No sensitive data stored in localStorage
- Secure session management
- HTTPS required for production
- CSRF protection on forms

✅ **Backend Security**
- Stripe webhook signature verification
- Row Level Security (RLS) on all tables
- Service role for privileged operations
- Encrypted payment data

✅ **Payment Security**
- PCI DSS compliant (via Stripe)
- No card data touches your servers
- 3D Secure authentication support
- Secure payment intent flow

## Deployment Checklist

Before going live:

1. [ ] Switch Stripe to live mode keys
2. [ ] Enable email confirmation in Supabase
3. [ ] Configure production webhook URL
4. [ ] Set up proper email templates
5. [ ] Add terms of service and privacy policy
6. [ ] Test all payment flows in live mode
7. [ ] Set up monitoring and logging
8. [ ] Configure rate limiting
9. [ ] Add analytics tracking
10. [ ] Test mobile responsiveness

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Edge Functions**: https://supabase.com/docs/guides/functions

## Troubleshooting

### Payment Intent Creation Fails
- Check that STRIPE_SECRET_KEY is set in Supabase secrets
- Verify Edge Function is deployed
- Check function logs in Supabase dashboard

### Webhook Not Working
- Verify webhook URL in Stripe dashboard
- Check STRIPE_WEBHOOK_SECRET is correct
- Review Edge Function logs for errors

### Course Access Not Granted
- Check webhook events in Stripe dashboard
- Verify user_courses table has RLS policies
- Check enrollment status in database

## Next Steps

1. Deploy Edge Functions to Supabase
2. Configure Stripe webhook
3. Test complete user flow
4. Add your actual course content
5. Customize branding and colors
6. Set up email notifications
7. Launch! 🚀
