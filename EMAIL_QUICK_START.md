# Email Service Quick Start Guide

## 🎯 What's Been Done

✅ Complete email system infrastructure created
✅ Database tables for templates and logging
✅ 9 professional email templates designed
✅ Email sending Edge Function created
✅ Environment variables configured

## 📧 Email Templates Ready

### Authentication Emails (4)
1. **Welcome & Email Verification** - User signup confirmation
2. **Email Verified** - Verification success message
3. **Password Reset Request** - Forgot password email
4. **Password Reset Success** - Password change confirmation

### Enrollment Emails (3)
5. **Payment Confirmation** - Course purchase receipt
6. **Course Credentials** - Login details and first steps
7. **Welcome Guide** - Complete 7-day learning plan

### Subscription Emails (2)
8. **Copy Trades Subscription** - Trade alerts group access
9. **Indicator Subscription** - Download links and setup

## 🚀 5-Minute Setup

### Step 1: Sign Up for Resend (2 minutes)

1. Go to [resend.com](https://resend.com)
2. Click "Start Building"
3. Sign up with your email
4. Verify your email

### Step 2: Get API Key (1 minute)

1. Go to Dashboard → API Keys
2. Click "Create API Key"
3. Name it "RealitiGrowth Production"
4. Copy the key (starts with `re_`)

### Step 3: Configure Environment (1 minute)

Edit your `.env` file and uncomment the RESEND_API_KEY line:

```env
# Before:
# RESEND_API_KEY=re_xxxxxxxxxxxxx

# After:
RESEND_API_KEY=re_your_actual_key_here
```

### Step 4: Domain Verification (Optional but Recommended)

For **production**, you should verify your domain. For **testing**, you can skip this and use Resend's test email addresses.

#### For Production:
1. Dashboard → Domains → Add Domain
2. Enter: `realitigrowth.com`
3. Add DNS records to your domain:
   - SPF, DKIM, DMARC records (provided by Resend)
4. Wait for verification (15-60 minutes)

#### For Testing:
- Send to: `delivered@resend.dev` (always delivers)
- Send to: `bounced@resend.dev` (simulates bounce)

### Step 5: Deploy Edge Function (1 minute)

The `send-email` Edge Function needs to be deployed to Supabase. The required environment variables are automatically available:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY` (configured in Supabase Secrets)
- `EMAIL_FROM_ADDRESS`
- `EMAIL_FROM_NAME`
- All other email settings

## 🧪 Testing Your Setup

### Test Email Sending

```typescript
// In your application
import { supabase } from './lib/supabase';

const { data, error } = await supabase.functions.invoke('send-email', {
  body: {
    template_key: 'welcome_verification',
    to: 'your-email@example.com',
    variables: {
      user_name: 'Test User',
      verification_url: 'https://realitigrowth.com/verify?token=test123',
      verification_token: 'test123'
    }
  }
});

console.log('Email sent:', data);
```

### Check Email Logs

```typescript
// View sent emails
const { data: emails } = await supabase
  .from('email_logs')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(10);

console.log('Recent emails:', emails);
```

## 📝 Using Email Templates

### Example: Send Welcome Email

```typescript
await supabase.functions.invoke('send-email', {
  body: {
    template_key: 'welcome_verification',
    to: user.email,
    user_id: user.id, // Optional: for tracking
    variables: {
      user_name: user.full_name,
      verification_url: `https://realitigrowth.com/verify?token=${verificationToken}`,
      verification_token: verificationToken
    }
  }
});
```

### Example: Send Payment Confirmation

```typescript
await supabase.functions.invoke('send-email', {
  body: {
    template_key: 'enrollment_payment_confirmation',
    to: user.email,
    user_id: user.id,
    variables: {
      user_name: user.full_name,
      order_id: enrollment.order_id,
      transaction_id: enrollment.transaction_id,
      program_name: 'A-Z Stock, Forex & Crypto Mastering Program',
      amount_paid: '35,000',
      payment_date: new Date().toLocaleString(),
      payment_method: 'Card ending ****1234',
      receipt_url: `https://realitigrowth.com/receipt/${enrollment.order_id}`,
      dashboard_url: 'https://realitigrowth.com/dashboard'
    }
  }
});
```

### Example: Send Subscription Confirmation

```typescript
await supabase.functions.invoke('send-email', {
  body: {
    template_key: 'subscription_copy_trades',
    to: user.email,
    user_id: user.id,
    variables: {
      user_name: user.full_name,
      subscription_id: subscription.id,
      plan_type: 'Monthly',
      amount: '1,999',
      billing_period: 'month',
      status: 'Active',
      start_date: new Date().toLocaleDateString(),
      next_billing: nextBillingDate.toLocaleDateString(),
      payment_method: 'Card ****1234',
      whatsapp_url: 'https://chat.whatsapp.com/xxx',
      telegram_url: 'https://t.me/xxx'
    }
  }
});
```

## 🎨 Email Template Variables

### Required for Each Template:

**Welcome Verification:**
- `user_name`, `verification_url`, `verification_token`

**Email Verified:**
- `user_name`, `dashboard_url`

**Password Reset:**
- `user_name`, `reset_url`, `reset_token`

**Password Reset Success:**
- `user_name`, `change_date`, `ip_address`, `device_info`, `login_url`

**Payment Confirmation:**
- `user_name`, `order_id`, `transaction_id`, `program_name`, `amount_paid`, `payment_date`, `payment_method`, `receipt_url`, `dashboard_url`

See `EMAIL_TEMPLATES_COMPLETE.md` for full variable lists.

## 📊 Monitoring Emails

### View Email Analytics

```sql
-- Emails sent today
SELECT COUNT(*) FROM email_logs
WHERE DATE(created_at) = CURRENT_DATE;

-- Email delivery rate
SELECT
  status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM email_logs
GROUP BY status;

-- Failed emails
SELECT * FROM email_logs
WHERE status = 'failed'
ORDER BY created_at DESC
LIMIT 10;
```

### Dashboard Query

```typescript
// Email statistics
const { data: stats } = await supabase
  .rpc('get_email_stats', {
    start_date: '2025-01-01',
    end_date: '2025-12-31'
  });
```

## 🔧 Troubleshooting

### ❌ "RESEND_API_KEY not configured"
**Solution:** Add your Resend API key to `.env` file

### ❌ "Template not found"
**Solution:** Templates need to be inserted into `email_templates` table. The template data is in `src/lib/emailTemplates.ts`

### ❌ Emails going to spam
**Solution:**
1. Complete domain verification (SPF, DKIM, DMARC)
2. Warm up your sending domain gradually
3. Include unsubscribe link
4. Maintain good sender reputation

### ❌ Edge Function not working
**Solution:**
1. Ensure function is deployed to Supabase
2. Check Supabase logs for errors
3. Verify all environment variables are set

## 🔐 Security Best Practices

✅ **Never expose API keys in frontend code**
✅ **Use Edge Functions for all email sending**
✅ **Validate email addresses before sending**
✅ **Rate limit email sending to prevent abuse**
✅ **Log all email activity for compliance**
✅ **Include unsubscribe links in marketing emails**

## 📞 Getting Help

### Resend Support
- Docs: [resend.com/docs](https://resend.com/docs)
- Status: [resend.com/status](https://resend.com/status)
- Support: support@resend.com

### RealitiGrowth Support
- Email: hi@realitigrowth.com
- Phone: +91 70193 85981
- WhatsApp: +91 70193 85981

## 🎉 Next Steps

1. ✅ Complete Resend signup
2. ✅ Get API key
3. ✅ Add to environment variables
4. ✅ Deploy Edge Function
5. ✅ Send test email
6. ⏳ Integrate into enrollment flow
7. ⏳ Integrate into subscription flow
8. ⏳ Set up domain verification (production)
9. ⏳ Configure webhooks for tracking
10. ⏳ Build email preferences UI

## 📚 Additional Resources

- `EMAIL_INTEGRATION_SETUP.md` - Detailed setup instructions
- `EMAIL_TEMPLATES_COMPLETE.md` - All template designs and specs
- `src/lib/emailTemplates.ts` - Template code and HTML
- `supabase/functions/send-email/index.ts` - Email sending logic

---

**Ready to send your first email?** Follow the 5-minute setup above and you'll be sending professional transactional emails in no time! 🚀
