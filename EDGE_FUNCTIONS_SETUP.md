# Edge Functions Deployment Guide

## ✅ Functions Deployed Successfully!

The following Cashfree Edge Functions have been deployed to your Supabase project:

1. **create-cashfree-order** - Creates payment orders for one-time payments
2. **cashfree-webhook** - Handles payment webhooks from Cashfree

## 🔐 Required Environment Secrets

You need to configure the following secrets in your Supabase Dashboard:

### Step 1: Go to Supabase Dashboard

1. Visit: https://supabase.com/dashboard/project/lpbaeuopmfxtigxidscd/settings/functions
2. Click on "Edge Functions" in the left sidebar
3. Click on "Manage secrets"

### Step 2: Add These Secrets

Add the following environment variables (secrets):

```bash
# Cashfree Credentials
CASHFREE_APP_ID=your_cashfree_app_id_here
CASHFREE_SECRET_KEY=your_cashfree_secret_key_here
CASHFREE_MODE=sandbox
CASHFREE_WEBHOOK_SECRET=your_webhook_secret_here

# URLs
CASHFREE_RETURN_URL=https://yourdomain.com/success
CASHFREE_NOTIFY_URL=https://lpbaeuopmfxtigxidscd.supabase.co/functions/v1/cashfree-webhook
SITE_URL=https://yourdomain.com

# Supabase (These should already be set automatically)
SUPABASE_URL=https://lpbaeuopmfxtigxidscd.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 3: Get Cashfree Credentials

1. Go to [Cashfree Merchant Dashboard](https://merchant.cashfree.com/merchants/login)
2. Navigate to **Developers** → **API Keys**
3. Copy your:
   - **App ID** (Client ID)
   - **Secret Key**
4. For webhook secret, go to **Developers** → **Webhooks** and create/copy the secret

### Step 4: Configure Cashfree Webhooks

1. In Cashfree Dashboard, go to **Developers** → **Webhooks**
2. Set the Webhook URL to:
   ```
   https://lpbaeuopmfxtigxidscd.supabase.co/functions/v1/cashfree-webhook
   ```
3. Enable these webhook events:
   - ✅ Payment Success
   - ✅ Payment Failure
   - ✅ Subscription Activated
   - ✅ Subscription Payment Success
   - ✅ Subscription Payment Failed
   - ✅ Subscription Cancelled

### Step 5: Test the Functions

After setting up the secrets, test the functions:

1. **Test create-cashfree-order**:
   ```bash
   curl -X POST https://lpbaeuopmfxtigxidscd.supabase.co/functions/v1/create-cashfree-order \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "orderId": "TEST-001",
       "orderAmount": 100,
       "orderCurrency": "INR",
       "customerDetails": {
         "customerId": "test-user",
         "customerName": "Test User",
         "customerEmail": "test@example.com",
         "customerPhone": "9999999999"
       }
     }'
   ```

2. **Check webhook logs** in Supabase Dashboard → Edge Functions → cashfree-webhook → Logs

## 📝 Function URLs

Your deployed functions are available at:

- **Create Order**: `https://lpbaeuopmfxtigxidscd.supabase.co/functions/v1/create-cashfree-order`
- **Webhook**: `https://lpbaeuopmfxtigxidscd.supabase.co/functions/v1/cashfree-webhook`

## 🔄 Redeploying Functions

If you need to update the functions:

```bash
# Deploy a specific function
npx supabase functions deploy create-cashfree-order

# Deploy all functions
npx supabase functions deploy
```

## 🐛 Troubleshooting

### Check Function Logs

```bash
npx supabase functions logs create-cashfree-order
npx supabase functions logs cashfree-webhook
```

### Common Issues

1. **"Cashfree credentials not configured"**
   - Make sure you've added all required secrets in Supabase Dashboard

2. **"Invalid webhook signature"**
   - Verify the `CASHFREE_WEBHOOK_SECRET` matches what's in Cashfree Dashboard

3. **"Order not found"**
   - Check if the `payment_orders` table exists in your database
   - Verify the order was created successfully

## ✅ Next Steps

1. Add Cashfree credentials to Supabase secrets
2. Configure webhook URL in Cashfree Dashboard
3. Test a payment flow end-to-end
4. Monitor function logs for any issues

---

**Note**: For production deployment, change `CASHFREE_MODE` to `production` and use production credentials.
