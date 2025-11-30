# Email Integration Setup Guide

## Overview
Complete email service integration for RealitiGrowth with all transactional emails including authentication, enrollment, and subscription notifications.

## ✅ Completed

### 1. Database Infrastructure
- ✅ Created `email_templates` table for storing reusable templates
- ✅ Created `email_logs` table for tracking all sent emails
- ✅ Set up RLS policies for security
- ✅ Added indexes for performance

### 2. Environment Configuration
- ✅ Added email service environment variables to `.env`
- ✅ Configured sender details (hi@realitigrowth.com)
- ✅ Added support contact information

### 3. Email Templates Library
- ✅ Created `src/lib/emailTemplates.ts` with HTML templates
- ✅ Implemented responsive email design
- ✅ Created authentication email templates:
  - Welcome & Email Verification
  - Email Verified Confirmation
  - Password Reset Request
  - Password Reset Success

## 📋 Setup Required

### Step 1: Choose Email Service Provider

**Recommended: Resend** (Modern, developer-friendly, excellent deliverability)

**Alternative options:**
- SendGrid (Easy integration, reliable)
- AWS SES (Cost-effective, scalable)
- Mailgun (Powerful API)
- Postmark (Transactional focused)

### Step 2: Sign Up for Resend

1. Go to https://resend.com
2. Create an account
3. Verify your account

### Step 3: Domain Verification

1. **Add Your Domain** in Resend Dashboard:
   - Domain: `realitigrowth.com`

2. **Configure DNS Records** (Add these to your domain's DNS):

   ```
   Type: TXT
   Name: @ or realitigrowth.com
   Value: [Provided by Resend]

   Type: TXT
   Name: resend._domainkey
   Value: [DKIM key provided by Resend]

   Type: MX
   Name: @
   Priority: 10
   Value: [MX record provided by Resend]
   ```

3. **Wait for Verification** (Usually 15-60 minutes)

### Step 4: Get API Key

1. Go to Resend Dashboard → API Keys
2. Create a new API key
3. Copy the key (starts with `re_`)

### Step 5: Configure Environment Variables

Update your `.env` file:

```env
# Uncomment and add your Resend API key
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Step 6: Deploy Email Sending Edge Function

The Edge Function `send-email` needs to be deployed with the following secrets:

```bash
# These will be configured in Supabase automatically
RESEND_API_KEY=re_xxxxxxxxxxxxx
SUPABASE_URL=https://xciaubvwqddcpirfkdnf.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[Your service role key]
```

## 📧 Email Templates Created

### Authentication Emails (4 templates)

1. **Welcome & Email Verification**
   - Trigger: User creates account
   - Subject: "Welcome to RealitiGrowth - Verify Your Email"
   - Features: Verification button, 24-hour expiry notice

2. **Email Verified Confirmation**
   - Trigger: User clicks verification link
   - Subject: "Email Verified Successfully! 🎉"
   - Features: Dashboard link, next steps guide

3. **Password Reset Request**
   - Trigger: User requests password reset
   - Subject: "Reset Your Password - RealitiGrowth"
   - Features: Reset button, 1-hour expiry, security tips

4. **Password Reset Success**
   - Trigger: Password successfully changed
   - Subject: "Password Changed Successfully"
   - Features: Change details, security alert, login link

### Enrollment Emails (3 templates)
*To be implemented in next phase*

### Subscription Emails (2 templates)
*To be implemented in next phase*

## 🚀 How to Use

### Sending an Email (Example)

```typescript
import { supabase } from './lib/supabase';

// Queue an email to be sent
const { data, error } = await supabase.functions.invoke('send-email', {
  body: {
    template_key: 'welcome_verification',
    to: 'user@example.com',
    variables: {
      user_name: 'John Doe',
      verification_url: 'https://realitigrowth.com/verify?token=xxx',
      verification_token: 'xxx'
    },
    user_id: 'user-uuid' // Optional: for tracking
  }
});
```

### Checking Email Status

```typescript
// Get email logs for a user
const { data: emails } = await supabase
  .from('email_logs')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });
```

## 🎨 Email Design Features

### Visual Design
- ✅ Dark navy blue gradient background (#0A1628, #0F1F3A)
- ✅ Cyan/green accent color (#00FF88)
- ✅ Responsive design (mobile-friendly)
- ✅ Professional typography
- ✅ Brand logo and colors

### Email Components
- Header with RealitiGrowth logo and branding
- Clear call-to-action buttons
- Information boxes with checkmarks
- Warning boxes for time-sensitive content
- Detail rows for transaction/change information
- Responsive footer with contact details
- Fallback plain text version

### Accessibility
- ✅ Inline CSS for email client compatibility
- ✅ Plain text fallback version
- ✅ Touch-friendly buttons (44px+ height)
- ✅ Web-safe fonts
- ✅ High contrast text

## 📊 Email Tracking

All emails are logged with:
- Recipient email
- Template used
- Send status (pending, sent, failed, bounced)
- External message ID
- Metadata (order ID, subscription ID, etc.)
- Timestamps (sent, opened, clicked)

## 🔒 Security Features

- ✅ Row Level Security (RLS) enabled
- ✅ Users can only view their own email logs
- ✅ Service role required for sending emails
- ✅ Secure token handling for verification/reset links
- ✅ IP address and device tracking for password changes

## 📝 Next Steps

1. ✅ Complete domain verification in Resend
2. ✅ Add RESEND_API_KEY to environment variables
3. ⏳ Create enrollment email templates
4. ⏳ Create subscription email templates
5. ⏳ Deploy `send-email` Edge Function
6. ⏳ Integrate emails into enrollment flow
7. ⏳ Integrate emails into subscription flow
8. ⏳ Set up email webhooks for tracking opens/clicks
9. ⏳ Add email preferences for users
10. ⏳ Create email analytics dashboard

## 🐛 Troubleshooting

### Emails not sending?
- Check RESEND_API_KEY is configured
- Verify domain is verified in Resend
- Check email_logs table for error messages
- Ensure Edge Function is deployed

### Emails going to spam?
- Complete domain verification (SPF, DKIM, DMARC)
- Warm up your sending domain gradually
- Avoid spam trigger words
- Include unsubscribe link

### Template not rendering?
- Check template exists in email_templates table
- Verify all required variables are provided
- Check HTML syntax in template
- Test with plain text version

## 📞 Support

For questions about email integration:
- Email: hi@realitigrowth.com
- Phone: +91 70193 85981

## 📚 Resources

- [Resend Documentation](https://resend.com/docs)
- [Email Best Practices](https://resend.com/docs/best-practices)
- [SPF/DKIM/DMARC Setup](https://resend.com/docs/knowledge-base/dns-records)
