# Brevo Email Integration - Quick Start

## ⚡ Quick Setup (5 Minutes)

### Step 1: Get Your Brevo API Key

1. Go to https://app.brevo.com
2. Click **Settings** (gear icon) → **SMTP & API**
3. Click **API Keys** tab
4. Click **Create a new API key**
5. Copy your API key (starts with `xkeysib-`)

### Step 2: Add API Key to Environment

Open your `.env` file and add:

```bash
VITE_BREVO_API_KEY=xkeysib-your-actual-api-key-here
```

### Step 3: Verify Sender Email (Important!)

1. In Brevo dashboard, go to **Senders**
2. Click **Add a new sender**
3. Add email: `noreply@realitigrowth.com`
4. Verify the email (check your inbox)
5. Repeat for `hi@realitigrowth.com`

### Step 4: Test Email Sending

Create a test file `src/test-email.ts`:

```typescript
import { sendSubscriptionConfirmation } from './lib/brevo';

const testEmail = async () => {
  try {
    await sendSubscriptionConfirmation(
      'your-email@example.com', // Use your real email
      'Test User',
      {
        id: 'TEST-12345',
        plan: 'Monthly Plan',
        amount: '₹4,999/month',
        startDate: new Date().toLocaleDateString('en-IN'),
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')
      }
    );
    console.log('✅ Test email sent successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

testEmail();
```

Run the test:
```bash
npx tsx src/test-email.ts
```

## 📧 Available Email Functions

### 1. Subscription Confirmation
```typescript
import { sendSubscriptionConfirmation } from './lib/brevo';

await sendSubscriptionConfirmation(
  'customer@example.com',
  'Customer Name',
  {
    id: 'SUB-12345',
    plan: 'Monthly Plan',
    amount: '₹4,999/month',
    startDate: '1 January 2025',
    nextBilling: '1 February 2025'
  }
);
```

### 2. Payment Receipt
```typescript
import { sendPaymentReceipt } from './lib/brevo';

await sendPaymentReceipt(
  'customer@example.com',
  'Customer Name',
  {
    orderId: 'ORD-12345',
    amount: '₹35,000',
    date: '1 January 2025',
    paymentMethod: 'Cashfree',
    courseName: 'A-Z Stock, Forex & Crypto Mastering Program'
  }
);
```

### 3. Course Welcome
```typescript
import { sendCourseWelcomeEmail } from './lib/brevo';

await sendCourseWelcomeEmail(
  'customer@example.com',
  'Customer Name',
  'A-Z Stock, Forex & Crypto Mastering Program'
);
```

## 🔌 Integration Points

### Add to Subscription Flow

In `src/components/subscription/IndicatorSubscriptionFlow.tsx`:

```typescript
import { sendSubscriptionConfirmation } from '../../lib/brevo';

// After successful subscription creation:
sendSubscriptionConfirmation(
  customerData.email,
  customerData.name,
  subscriptionData
).catch(error => console.error('Email failed:', error));
```

### Add to Payment Success

In your payment success handler:

```typescript
import { sendPaymentReceipt, sendCourseWelcomeEmail } from '../lib/brevo';

// After payment success:
sendPaymentReceipt(/* ... */).catch(console.error);
sendCourseWelcomeEmail(/* ... */).catch(console.error);
```

## ✅ Checklist

- [ ] Brevo SDK installed (`@getbrevo/brevo`)
- [ ] API key added to `.env`
- [ ] Sender emails verified in Brevo dashboard
- [ ] Test email sent successfully
- [ ] Integrated into subscription flow
- [ ] Integrated into payment flow
- [ ] Tested in development
- [ ] Ready for production

## 🚨 Important Notes

1. **Never commit `.env` file** - It contains your API key
2. **Verify sender emails** - Emails won't send without verification
3. **Don't block user flow** - Send emails asynchronously
4. **Handle errors gracefully** - Use `.catch()` or try-catch
5. **Test before production** - Send test emails to yourself

## 📊 Monitor Emails

Check email status in Brevo dashboard:
- **Statistics** → Delivery rates, opens, clicks
- **Logs** → All sent emails and their status
- **Reports** → Performance analytics

## 🆘 Troubleshooting

**Email not sending?**
- Check API key is correct
- Verify sender email in Brevo
- Check Brevo logs for errors

**Email going to spam?**
- Verify your domain (add SPF/DKIM records)
- Avoid spam trigger words
- Use verified sender addresses

## 📚 Full Documentation

See `BREVO_EMAIL_INTEGRATION.md` for complete documentation.

## 🎯 Next Steps

1. Add your API key to `.env`
2. Verify sender emails
3. Run test email
4. Integrate into your flows
5. Deploy to production

---

**Need Help?** Contact hi@realitigrowth.com
