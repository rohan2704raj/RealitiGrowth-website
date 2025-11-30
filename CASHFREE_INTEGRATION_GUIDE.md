# Cashfree Payment Gateway Integration Guide

## 🎯 Overview

This guide covers the complete integration of Cashfree Payment Gateway to replace Stripe for:
- **One-time payments**: Course enrollment (₹35,000)
- **Recurring subscriptions**: Copy Trades and Indicator services (₹1,999+)

## ✅ What's Been Implemented

### 1. Core Infrastructure
- ✅ Cashfree SDK installed (`cashfree-pg-sdk-javascript`)
- ✅ Service module created (`src/lib/cashfree.ts`)
- ✅ Environment variables configured
- ✅ Database tables created for orders and webhooks

### 2. Edge Functions
- ✅ `create-cashfree-order` - Creates payment orders
- ✅ `cashfree-webhook` - Handles payment notifications

### 3. Database Schema
- ✅ `payment_orders` table - Tracks all payments
- ✅ `webhook_events` table - Logs webhook events
- ✅ Updated `subscriptions` table with Cashfree fields

## 🚀 Quick Setup (5 Steps)

### Step 1: Get Cashfree Credentials (5 minutes)

1. **Sign up** at [Cashfree Merchant Dashboard](https://merchant.cashfree.com/merchants/login)
2. **Navigate to Developers** section
3. **Get your credentials**:
   - App ID (Client ID)
   - Secret Key
4. **Generate keys** for both Test and Production modes

### Step 2: Configure Environment Variables (2 minutes)

Add to your `.env` file:

```env
# Cashfree Configuration
VITE_CASHFREE_APP_ID=your_app_id_here
VITE_CASHFREE_MODE=sandbox

# Server-side (for Edge Functions)
CASHFREE_APP_ID=your_app_id_here
CASHFREE_SECRET_KEY=your_secret_key_here
CASHFREE_MODE=sandbox
CASHFREE_WEBHOOK_SECRET=your_webhook_secret_here

# URLs
CASHFREE_RETURN_URL=https://realitigrowth.com/payment/success
CASHFREE_NOTIFY_URL=https://realitigrowth.com/api/webhooks/cashfree
```

For **production**, change:
```env
VITE_CASHFREE_MODE=production
CASHFREE_MODE=production
```

### Step 3: Create Subscription Plans in Cashfree (10 minutes)

Go to Cashfree Dashboard → Subscriptions → Create Plans:

**Copy My Trades Plans:**
- Monthly: ₹1,999 / month
- Quarterly: ₹4,497 / 3 months
- Annual: ₹14,390 / year

**RealitiGrowth Indicator Plans:**
- Monthly: ₹1,999 / month
- Quarterly: ₹4,497 / 3 months
- Annual: ₹14,390 / year

After creating, add Plan IDs to `.env`:
```env
VITE_CASHFREE_PLAN_COPY_TRADES_MONTHLY=plan_xxxxx
VITE_CASHFREE_PLAN_COPY_TRADES_QUARTERLY=plan_xxxxx
VITE_CASHFREE_PLAN_COPY_TRADES_ANNUAL=plan_xxxxx
VITE_CASHFREE_PLAN_INDICATOR_MONTHLY=plan_xxxxx
VITE_CASHFREE_PLAN_INDICATOR_QUARTERLY=plan_xxxxx
VITE_CASHFREE_PLAN_INDICATOR_ANNUAL=plan_xxxxx
```

### Step 4: Deploy Edge Functions (3 minutes)

Deploy to Supabase:
```bash
# Create order function
supabase functions deploy create-cashfree-order

# Webhook handler
supabase functions deploy cashfree-webhook
```

Set secrets in Supabase Dashboard:
- `CASHFREE_APP_ID`
- `CASHFREE_SECRET_KEY`
- `CASHFREE_WEBHOOK_SECRET`
- `CASHFREE_MODE`

### Step 5: Configure Webhooks in Cashfree (2 minutes)

In Cashfree Dashboard → Developers → Webhooks:

**Webhook URL**: `https://your-project.supabase.co/functions/v1/cashfree-webhook`

**Enable these events:**
- Payment Success
- Payment Failure
- Subscription Activated
- Subscription Payment Success
- Subscription Payment Failed
- Subscription Cancelled

## 💳 Payment Flow Implementation

### One-Time Payment (Course Enrollment)

**File to Update**: `src/components/enrollment/PaymentPage.tsx`

```typescript
import {
  generateOrderId,
  createCashfreeOrder,
  openCashfreeCheckout,
  formatCashfreeAmount
} from '../lib/cashfree';
import { supabase } from '../lib/supabase';

const handlePayment = async () => {
  try {
    setLoading(true);

    // Generate unique order ID
    const orderId = generateOrderId();

    // Prepare order data
    const orderData = {
      orderId,
      orderAmount: formatCashfreeAmount(35000),
      orderCurrency: 'INR',
      customerDetails: {
        customerId: user.id,
        customerName: user.full_name,
        customerEmail: user.email,
        customerPhone: user.phone || '9999999999',
      },
      orderNote: 'A-Z Stock, Forex & Crypto Mastering Program',
    };

    // Create order via Edge Function
    const { sessionId } = await createCashfreeOrder(
      orderData,
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    );

    // Open Cashfree checkout
    await openCashfreeCheckout(sessionId, {
      onSuccess: (data) => {
        console.log('Payment successful:', data);
        // Redirect handled by return URL
      },
      onFailure: (error) => {
        console.error('Payment failed:', error);
        setError('Payment failed. Please try again.');
        setLoading(false);
      },
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    setError('Failed to initiate payment');
    setLoading(false);
  }
};
```

### Recurring Payment (Subscriptions)

**File to Update**: `src/components/subscription/SubscriptionFlow.tsx`

```typescript
import {
  generateSubscriptionId,
  createCashfreeSubscription,
  getCashfreePlanId,
} from '../lib/cashfree';

const handleSubscribe = async () => {
  try:
    setLoading(true);

    // Get plan ID based on selection
    const planId = getCashfreePlanId(
      service, // 'copyTrades' or 'indicator'
      billingCycle // 'monthly', 'quarterly', 'annual'
    );

    // Generate unique subscription ID
    const subscriptionId = generateSubscriptionId();

    // Prepare subscription data
    const subscriptionData = {
      subscriptionId,
      planId,
      customerDetails: {
        customerId: user.id,
        customerName: user.full_name,
        customerEmail: user.email,
        customerPhone: user.phone || '9999999999',
      },
    };

    // Create subscription via Edge Function
    const { authLink } = await createCashfreeSubscription(
      subscriptionData,
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    );

    // Redirect to authorization page
    window.location.href = authLink;
  } catch (error) {
    console.error('Error creating subscription:', error);
    setError('Failed to create subscription');
    setLoading(false);
  }
};
```

## 📄 Success Page Implementation

**File to Update**: `src/pages/SuccessPage.tsx`

```typescript
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parsePaymentResponse, getOrderStatus } from '../lib/cashfree';

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      // Parse response from URL
      const response = parsePaymentResponse(searchParams);

      if (response.orderStatus === 'PAID') {
        // Fetch full order details
        const details = await getOrderStatus(
          response.orderId,
          import.meta.env.VITE_SUPABASE_URL,
          import.meta.env.VITE_SUPABASE_ANON_KEY
        );
        setOrderDetails(details);
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      {orderDetails && (
        <div>
          <p>Order ID: {orderDetails.order_id}</p>
          <p>Payment ID: {orderDetails.payment_id}</p>
          <p>Amount: ₹{orderDetails.amount}</p>
          <p>Payment Method: {orderDetails.payment_method}</p>
        </div>
      )}
    </div>
  );
}
```

## 🔄 Webhook Processing

The `cashfree-webhook` Edge Function automatically handles:

1. **Payment Success** → Creates enrollment, grants access, sends emails
2. **Payment Failure** → Updates order status, notifies user
3. **Subscription Activated** → Creates subscription record, sends confirmation
4. **Subscription Renewal** → Updates billing date, sends renewal email
5. **Payment Failed (Subscription)** → Sets to past_due, sends reminder
6. **Subscription Cancelled** → Updates status, sends cancellation email

All webhook events are logged in `webhook_events` table for debugging.

## 🎨 UI Components

### Payment Methods Display

Add these payment method icons to your payment page:

```tsx
<div className="payment-methods">
  <h3>Accepted Payment Methods</h3>
  <div className="methods-grid">
    <div>💳 Credit/Debit Cards</div>
    <div>📱 UPI (All Apps)</div>
    <div>🏦 Net Banking</div>
    <div>💰 Wallets</div>
    <div>📊 Pay Later</div>
    <div>🔢 EMI Options</div>
  </div>
  <div className="security-badges">
    <span>🔒 SSL Secured</span>
    <span>✓ PCI Compliant</span>
  </div>
</div>
```

### Loading States

```tsx
{loading && (
  <div className="loading-overlay">
    <div className="spinner"></div>
    <p>Processing your payment...</p>
    <p className="text-sm">Please do not close or refresh this page</p>
  </div>
)}
```

### Error Handling

```tsx
{error && (
  <div className="error-message">
    <p>{error}</p>
    <button onClick={() => window.location.reload()}>
      Try Again
    </button>
    <a href="/support">Contact Support</a>
  </div>
)}
```

## 🔒 Security Best Practices

### ✅ DO:
- Always verify signatures on webhooks
- Use HTTPS for all payment pages
- Store API keys in environment variables
- Validate all input data
- Implement idempotency for webhooks
- Log all payment events
- Use RLS on database tables

### ❌ DON'T:
- Never log full card numbers
- Never store CVV
- Don't expose secret keys in frontend
- Don't trust client-side payment status
- Don't process duplicate webhooks
- Don't skip signature verification

## 🧪 Testing

### Test Mode

1. Use sandbox credentials
2. Test with Cashfree test cards:
   - **Success**: 4111 1111 1111 1111
   - **Failure**: 4000 0000 0000 0002

### Test Cases to Cover

**One-Time Payment:**
- ✓ Successful card payment
- ✓ Successful UPI payment
- ✓ Declined payment
- ✓ Network timeout
- ✓ User cancels payment

**Subscriptions:**
- ✓ Create monthly subscription
- ✓ Create quarterly subscription
- ✓ Create annual subscription
- ✓ Successful renewal
- ✓ Failed renewal
- ✓ Cancel subscription

**Webhooks:**
- ✓ Webhook signature verification
- ✓ Duplicate webhook handling
- ✓ Webhook retry logic

## 📊 Monitoring & Analytics

### Database Queries

**Payment success rate:**
```sql
SELECT
  COUNT(CASE WHEN status = 'SUCCESS' THEN 1 END) * 100.0 / COUNT(*) as success_rate
FROM payment_orders
WHERE created_at >= NOW() - INTERVAL '30 days';
```

**Subscription churn rate:**
```sql
SELECT
  COUNT(CASE WHEN status = 'cancelled' THEN 1 END) * 100.0 / COUNT(*) as churn_rate
FROM subscriptions
WHERE created_at >= NOW() - INTERVAL '30 days';
```

**Revenue this month:**
```sql
SELECT SUM(amount) as total_revenue
FROM payment_orders
WHERE status = 'SUCCESS'
AND DATE_TRUNC('month', paid_at) = DATE_TRUNC('month', NOW());
```

## 🚨 Troubleshooting

### Issue: Payments not working

**Check:**
1. ✓ Cashfree credentials configured correctly
2. ✓ App ID matches mode (sandbox/production)
3. ✓ Edge Functions deployed
4. ✓ Webhook URL configured in Cashfree

### Issue: Webhooks not received

**Check:**
1. ✓ Webhook URL is publicly accessible
2. ✓ HTTPS is enabled
3. ✓ Webhook secret matches
4. ✓ Firewall not blocking Cashfree IPs

### Issue: Signature verification failing

**Check:**
1. ✓ Using correct webhook secret
2. ✓ Timestamp within valid window
3. ✓ Payload not modified

## 📞 Support

### Cashfree Support
- Dashboard: [merchant.cashfree.com](https://merchant.cashfree.com)
- Docs: [docs.cashfree.com](https://docs.cashfree.com)
- Support: support@cashfree.com

### RealitiGrowth Support
- Email: hi@realitigrowth.com
- Phone: +91 70193 85981
- WhatsApp: +91 70193 85981

## 📝 Next Steps

1. ✅ Update all payment pages to use Cashfree
2. ✅ Test thoroughly in sandbox mode
3. ✅ Create subscription plans in production
4. ✅ Switch to production credentials
5. ✅ Monitor initial transactions
6. ✅ Set up payment analytics dashboard

## ✨ Benefits of Cashfree

✅ **Domestic Focus** - Optimized for Indian payments
✅ **Better Success Rates** - Higher approval rates for Indian cards
✅ **Lower Fees** - Competitive pricing for Indian merchants
✅ **Local Support** - India-based support team
✅ **Compliance** - RBI compliant, PCI DSS certified
✅ **All Payment Methods** - Cards, UPI, Wallets, Net Banking
✅ **Fast Settlements** - Quick fund transfers
✅ **Developer Friendly** - Good documentation and SDKs

---

**Status**: ✅ Ready for Implementation
**Estimated Setup Time**: 25 minutes
**Estimated Testing Time**: 2-3 hours
