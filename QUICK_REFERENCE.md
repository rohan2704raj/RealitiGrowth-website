# 🎯 Quick Reference - RealitiGrowth Cashfree Integration

## 🔗 Important URLs

### Application
- **Local Dev**: http://localhost:5173/
- **Supabase Dashboard**: https://supabase.com/dashboard/project/lpbaeuopmfxtigxidscd
- **Cashfree Dashboard**: https://merchant.cashfree.com/merchants/login

### Edge Functions
- **Create Order**: https://lpbaeuopmfxtigxidscd.supabase.co/functions/v1/create-cashfree-order
- **Webhook**: https://lpbaeuopmfxtigxidscd.supabase.co/functions/v1/cashfree-webhook

## 🛠️ Common Commands

### Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

### Edge Functions
```bash
# List deployed functions
npx supabase functions list

# Deploy a function
npx supabase functions deploy create-cashfree-order
npx supabase functions deploy cashfree-webhook

# View function logs
npx supabase functions logs create-cashfree-order --tail
npx supabase functions logs cashfree-webhook --tail

# Deploy all functions
npx supabase functions deploy
```

### Database
```bash
# Check database status
npx supabase db status

# Push migrations
npx supabase db push

# Reset database (CAUTION!)
npx supabase db reset
```

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_SUPABASE_URL=https://lpbaeuopmfxtigxidscd.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_CASHFREE_APP_ID=your_app_id
VITE_CASHFREE_MODE=sandbox
```

### Backend (Supabase Secrets)
Set in: Dashboard → Settings → Edge Functions → Secrets
```
CASHFREE_APP_ID
CASHFREE_SECRET_KEY
CASHFREE_MODE
CASHFREE_WEBHOOK_SECRET
CASHFREE_RETURN_URL
CASHFREE_NOTIFY_URL
SITE_URL
SUPABASE_URL (auto-set)
SUPABASE_SERVICE_ROLE_KEY (auto-set)
```

## 🧪 Test Cards (Sandbox)

### Successful Payment
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
```

### Failed Payment
```
Card Number: 4000 0000 0000 0002
CVV: Any 3 digits
Expiry: Any future date
```

## 📊 Database Tables

### Payment Related
- `payment_orders` - All payment orders
- `enrollments` - Course enrollments
- `user_courses` - User course access
- `subscriptions` - Recurring subscriptions
- `webhook_events` - Webhook logs

### Query Examples
```sql
-- Check recent orders
SELECT * FROM payment_orders ORDER BY created_at DESC LIMIT 10;

-- Check enrollments
SELECT * FROM enrollments WHERE status = 'completed';

-- Check active subscriptions
SELECT * FROM subscriptions WHERE status = 'active';

-- View webhook events
SELECT * FROM webhook_events ORDER BY created_at DESC LIMIT 20;
```

## 🔍 Debugging

### Check if payment order was created
```sql
SELECT * FROM payment_orders WHERE order_id = 'YOUR_ORDER_ID';
```

### Check webhook events
```sql
SELECT * FROM webhook_events 
WHERE payload->>'order'->>'order_id' = 'YOUR_ORDER_ID';
```

### View function logs
```bash
# Real-time logs
npx supabase functions logs cashfree-webhook --tail

# Last 100 lines
npx supabase functions logs cashfree-webhook
```

## 🚨 Common Issues & Quick Fixes

### Payment not working
1. Check browser console for errors
2. Verify `VITE_CASHFREE_APP_ID` in `.env`
3. Check edge function logs
4. Verify Supabase secrets are set

### Webhook not received
1. Check Cashfree Dashboard → Webhooks → Logs
2. Verify webhook URL is correct
3. Check `CASHFREE_WEBHOOK_SECRET` matches
4. View webhook function logs

### Database not updating
1. Check webhook logs for errors
2. Verify `SUPABASE_SERVICE_ROLE_KEY` is set
3. Check RLS policies on tables
4. View `webhook_events` table for payload

## 📞 Support Contacts

- **Cashfree Support**: support@cashfree.com
- **Supabase Support**: https://supabase.com/support
- **Application Support**: hi@realitigrowth.com

## 📚 Documentation

- `CASHFREE_INTEGRATION_COMPLETE.md` - Full integration guide
- `EDGE_FUNCTIONS_SETUP.md` - Edge functions deployment guide
- `CASHFREE_INTEGRATION_GUIDE.md` - Original integration guide
- `README.md` - Project overview

---

**Quick Start**: 
1. `npm run dev` - Start development server
2. Open http://localhost:5173/
3. Test payment flow
4. Check logs: `npx supabase functions logs cashfree-webhook --tail`
