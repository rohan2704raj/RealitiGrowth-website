# Brevo Email Integration Guide

## Overview

This guide explains how to integrate Brevo (formerly Sendinblue) for sending transactional emails in your RealitiGrowth application.

## Setup

### 1. Install Dependencies

The Brevo SDK has been installed:
```bash
npm install @getbrevo/brevo --save
```

### 2. Get Your Brevo API Key

1. Go to [Brevo Dashboard](https://app.brevo.com)
2. Navigate to **Settings** → **SMTP & API**
3. Click on **API Keys** tab
4. Create a new API key or copy an existing one
5. Copy your API key (it looks like: `xkeysib-xxxxxxxxxxxxxxxxxxxxx`)

### 3. Configure Environment Variables

Add your Brevo API key to your `.env` file:

```bash
VITE_BREVO_API_KEY=your_brevo_api_key_here
```

**Important:** Never commit your `.env` file to version control!

## Email Service Functions

The Brevo service (`src/lib/brevo.ts`) provides the following functions:

### 1. Send Subscription Confirmation

```typescript
import { sendSubscriptionConfirmation } from './lib/brevo';

await sendSubscriptionConfirmation(
  'customer@example.com',
  'John Doe',
  {
    id: 'SUB-12345',
    plan: 'Monthly Plan',
    amount: '₹4,999/month',
    startDate: '1 January 2025',
    nextBilling: '1 February 2025'
  }
);
```

### 2. Send Payment Receipt

```typescript
import { sendPaymentReceipt } from './lib/brevo';

await sendPaymentReceipt(
  'customer@example.com',
  'John Doe',
  {
    orderId: 'ORD-12345',
    amount: '₹35,000',
    date: '1 January 2025',
    paymentMethod: 'Cashfree',
    courseName: 'A-Z Stock, Forex & Crypto Mastering Program'
  }
);
```

### 3. Send Course Welcome Email

```typescript
import { sendCourseWelcomeEmail } from './lib/brevo';

await sendCourseWelcomeEmail(
  'customer@example.com',
  'John Doe',
  'A-Z Stock, Forex & Crypto Mastering Program'
);
```

### 4. Send Custom Transactional Email

```typescript
import { sendTransactionalEmail } from './lib/brevo';

await sendTransactionalEmail({
  to: [
    { email: 'customer@example.com', name: 'John Doe' }
  ],
  subject: 'Your Custom Subject',
  htmlContent: '<h1>Hello!</h1><p>Your custom HTML content here</p>',
  sender: {
    name: 'RealitiGrowth',
    email: 'noreply@realitigrowth.com'
  },
  replyTo: {
    email: 'hi@realitigrowth.com',
    name: 'RealitiGrowth Support'
  }
});
```

## Integration Examples

### Example 1: Send Email After Subscription

Update your subscription flow to send confirmation emails:

```typescript
// In IndicatorSubscriptionFlow.tsx or SubscriptionFlow.tsx
import { sendSubscriptionConfirmation } from '../lib/brevo';

const handlePlanSelectionContinue = async (planType, amount) => {
  try {
    // ... existing subscription creation logic ...
    
    // Send confirmation email
    await sendSubscriptionConfirmation(
      customerData.email,
      customerData.name,
      {
        id: subscriptionData.id,
        plan: subscriptionData.plan,
        amount: subscriptionData.amount,
        startDate: subscriptionData.startDate,
        nextBilling: subscriptionData.nextBilling
      }
    );
    
    console.log('Confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Continue even if email fails - don't block the subscription
  }
};
```

### Example 2: Send Email After Course Payment

```typescript
// In your payment success handler
import { sendPaymentReceipt, sendCourseWelcomeEmail } from '../lib/brevo';

const handlePaymentSuccess = async (paymentData) => {
  try {
    // Send payment receipt
    await sendPaymentReceipt(
      paymentData.email,
      paymentData.name,
      {
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        date: new Date().toLocaleDateString('en-IN'),
        paymentMethod: 'Cashfree',
        courseName: paymentData.courseName
      }
    );
    
    // Send welcome email
    await sendCourseWelcomeEmail(
      paymentData.email,
      paymentData.name,
      paymentData.courseName
    );
    
    console.log('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};
```

## Using Brevo Templates (Optional)

If you prefer to use Brevo's email template builder:

1. Create templates in Brevo dashboard
2. Get the template ID
3. Use the template in your code:

```typescript
import { sendTransactionalEmail } from './lib/brevo';

await sendTransactionalEmail({
  to: [{ email: 'customer@example.com', name: 'John Doe' }],
  templateId: 1, // Your Brevo template ID
  params: {
    // Template variables
    name: 'John Doe',
    subscriptionId: 'SUB-12345',
    amount: '₹4,999'
  }
});
```

## Email Templates

The service includes pre-built HTML email templates with:

- ✅ Responsive design (mobile-friendly)
- ✅ Professional branding with RealitiGrowth colors
- ✅ Clear call-to-action buttons
- ✅ Proper email structure
- ✅ Support contact information

### Customizing Templates

To customize the email templates, edit the HTML content in `src/lib/brevo.ts`:

```typescript
const htmlContent = `
  <!DOCTYPE html>
  <html>
  <!-- Your custom HTML here -->
  </html>
`;
```

## Sender Email Configuration

### Setting Up Sender Email in Brevo

1. Go to Brevo Dashboard → **Senders**
2. Add and verify your domain (e.g., `realitigrowth.com`)
3. Add sender emails:
   - `noreply@realitigrowth.com` (for automated emails)
   - `hi@realitigrowth.com` (for support replies)

### Domain Verification

To improve deliverability, verify your domain:

1. Add SPF record to your DNS
2. Add DKIM record to your DNS
3. Wait for verification (usually 24-48 hours)

Brevo will provide the exact DNS records in their dashboard.

## Testing

### Test in Development

```typescript
// Test sending an email
import { sendSubscriptionConfirmation } from './lib/brevo';

const testEmail = async () => {
  try {
    await sendSubscriptionConfirmation(
      'your-test-email@example.com',
      'Test User',
      {
        id: 'TEST-12345',
        plan: 'Monthly Plan',
        amount: '₹4,999/month',
        startDate: new Date().toLocaleDateString('en-IN'),
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')
      }
    );
    console.log('Test email sent!');
  } catch (error) {
    console.error('Test failed:', error);
  }
};

testEmail();
```

## Error Handling

The service includes error handling. Always wrap email calls in try-catch:

```typescript
try {
  await sendSubscriptionConfirmation(/* ... */);
} catch (error) {
  console.error('Email failed:', error);
  // Log to error tracking service
  // Don't block the user flow
}
```

**Important:** Email failures should not block critical user flows like payments or subscriptions.

## Monitoring

Monitor your emails in Brevo Dashboard:

1. **Statistics** → View delivery rates, opens, clicks
2. **Logs** → See all sent emails and their status
3. **Reports** → Analyze email performance

## Best Practices

1. **Don't Block User Flow**: Send emails asynchronously, don't wait for confirmation
2. **Handle Failures Gracefully**: Log errors but don't show them to users
3. **Test Thoroughly**: Test all email templates before going live
4. **Monitor Deliverability**: Check Brevo dashboard regularly
5. **Verify Domain**: Always verify your sending domain for better deliverability
6. **Use Reply-To**: Set proper reply-to addresses for customer responses
7. **Keep Templates Simple**: Avoid complex CSS that might break in email clients

## Troubleshooting

### Email Not Sending

1. Check API key is correct in `.env`
2. Verify sender email is verified in Brevo
3. Check Brevo dashboard logs for errors
4. Ensure you're not exceeding rate limits

### Email Going to Spam

1. Verify your domain in Brevo
2. Add SPF and DKIM records
3. Avoid spam trigger words
4. Include unsubscribe link (for marketing emails)
5. Maintain good sender reputation

### Template Not Rendering

1. Test HTML in email testing tools
2. Use inline CSS (not external stylesheets)
3. Avoid JavaScript in emails
4. Test in multiple email clients

## Rate Limits

Brevo free tier includes:
- 300 emails/day
- Unlimited contacts

For higher volumes, upgrade to a paid plan.

## Support

- **Brevo Documentation**: https://developers.brevo.com/
- **Brevo Support**: support@brevo.com
- **RealitiGrowth Support**: hi@realitigrowth.com

## Next Steps

1. ✅ Install Brevo SDK (Done)
2. ✅ Create email service (Done)
3. ⏳ Add your Brevo API key to `.env`
4. ⏳ Verify sender email in Brevo dashboard
5. ⏳ Integrate email calls in your subscription/payment flows
6. ⏳ Test email sending
7. ⏳ Deploy to production

---

**Created:** December 2025  
**Last Updated:** December 2025
