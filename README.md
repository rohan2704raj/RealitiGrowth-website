# RealitiGrowth - Trading Education Platform

A comprehensive trading education platform offering courses, live copy trading alerts, and professional trading indicators. Built with React, TypeScript, and Supabase.

![RealitiGrowth](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-Proprietary-blue)

## 🎯 Overview

RealitiGrowth is a full-featured trading education platform that provides:
- **A-Z Stock, Forex & Crypto Mastering Program** - Comprehensive 120+ lesson course
- **Copy My Trades Call's Group** - Real-time trade alerts with 78% win rate
- **RealitiGrowth Indicator** - Professional trading indicator for multiple platforms

## ✨ Features

### 🎓 Course Management
- 12 comprehensive modules with 120+ video lessons
- Progress tracking and completion certificates
- Live trading sessions and Q&A
- Downloadable resources and templates
- Community access for students

### 💰 Payment & Subscriptions
- **Cashfree Payment Gateway** for secure payments (optimized for India)
- One-time course purchases (₹35,000)
- Monthly/Quarterly/Annual subscriptions (₹1,999+)
- Multiple payment methods: Cards, UPI, Net Banking, Wallets
- Automated billing and renewal management
- Invoice generation and receipt downloads
- Payment success rate tracking

### 📧 Email Automation (20 Templates)
- **Authentication**: Welcome, verification, password reset
- **Enrollment**: Payment confirmations, credentials, welcome guides
- **Subscriptions**: Service confirmations, setup instructions
- **Billing**: Renewal reminders, payment failures, cancellations
- **Engagement**: Progress check-ins, course completion
- **Retention**: Re-engagement campaigns, win-back offers
- **Support**: Ticket confirmations, resolution updates

### 🔐 User Authentication
- Supabase Auth with email/password
- Protected routes and role-based access
- User profile management
- Session management

### 📊 Analytics & Tracking
- Email delivery and engagement tracking
- User progress monitoring
- Subscription analytics
- Payment history

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Progressive web app capabilities

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide React** - Icon library

### Backend & Services
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Row Level Security
  - Edge Functions
- **Cashfree** - Payment processing (India-optimized)
- **Resend** - Email delivery service

### Infrastructure
- **Netlify** - Hosting and CDN (recommended)
- **GitHub** - Version control
- **Environment Variables** - Configuration management

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Cashfree account (for payments)
- Resend account (for emails)

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd realitigrowth
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cashfree Payment Gateway Configuration
VITE_CASHFREE_APP_ID=your_app_id
VITE_CASHFREE_MODE=sandbox
# Note: For production, use VITE_CASHFREE_MODE=production

# Cashfree Subscription Plan IDs
VITE_CASHFREE_PLAN_COPY_TRADES_MONTHLY=plan_id
VITE_CASHFREE_PLAN_COPY_TRADES_QUARTERLY=plan_id
VITE_CASHFREE_PLAN_COPY_TRADES_ANNUAL=plan_id
VITE_CASHFREE_PLAN_INDICATOR_MONTHLY=plan_id
VITE_CASHFREE_PLAN_INDICATOR_QUARTERLY=plan_id
VITE_CASHFREE_PLAN_INDICATOR_ANNUAL=plan_id

# Email Service Configuration (Optional - for emails)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM_ADDRESS=hi@realitigrowth.com
EMAIL_FROM_NAME=RealitiGrowth Team
EMAIL_REPLY_TO=hi@realitigrowth.com
SITE_URL=https://realitigrowth.com
SUPPORT_PHONE=+91 70193 85981
SUPPORT_WHATSAPP=+91 70193 85981
COMPANY_ADDRESS=No 639, 3rd Cross, 1st Main, Mahalakshmi Layout, Bangalore - 560086
```

4. **Set up Supabase database**

Run the migrations in order:
```bash
# Navigate to Supabase Dashboard → SQL Editor
# Run each migration file in supabase/migrations/ in order
```

Or use Supabase CLI:
```bash
supabase db push
```

5. **Deploy Edge Functions** (Optional - for email and payments)
```bash
# Deploy Cashfree order creation function
supabase functions deploy create-cashfree-order

# Deploy Cashfree webhook handler
supabase functions deploy cashfree-webhook

# Deploy email sending function
supabase functions deploy send-email
```

6. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🏗️ Project Structure

```
realitigrowth/
├── src/
│   ├── components/          # React components
│   │   ├── enrollment/      # Course enrollment flow
│   │   ├── subscription/    # Subscription flows
│   │   └── syllabus/        # Syllabus and lead capture
│   ├── contexts/            # React contexts (Auth, etc.)
│   ├── lib/                 # Utilities and configurations
│   │   ├── emailTemplates.ts           # Email templates (Auth)
│   │   ├── emailTemplatesExtended.ts   # Email templates (Billing/Engagement)
│   │   ├── emailTemplatesRetention.ts  # Email templates (Retention/Support)
│   │   ├── stripe.ts                   # Stripe configuration
│   │   └── supabase.ts                 # Supabase client
│   ├── pages/               # Route pages
│   ├── App.tsx              # Main app component
│   └── main.tsx             # App entry point
├── supabase/
│   ├── functions/           # Edge Functions
│   │   ├── create-payment-intent/
│   │   ├── send-email/
│   │   └── stripe-webhook/
│   └── migrations/          # Database migrations
├── public/                  # Static assets
├── dist/                    # Build output
└── docs/                    # Documentation
    ├── EMAIL_QUICK_START.md
    ├── EMAIL_INTEGRATION_SETUP.md
    ├── EMAIL_TEMPLATES_COMPLETE.md
    ├── EMAIL_AUTOMATION_COMPLETE.md
    └── EMAIL_SYSTEM_SUMMARY.md
```

## 🗄️ Database Schema

### Core Tables
- `enrollments` - Course enrollments and purchases
- `leads` - Lead capture from syllabus downloads
- `user_courses` - User course access and progress
- `subscriptions` - Subscription management
- `subscription_plans` - Available subscription tiers
- `indicator_platforms` - Trading platform configurations

### Email System
- `email_templates` - Reusable email templates
- `email_logs` - Email delivery tracking

### Security
- `user_sessions` - Session management
- `audit_logs` - Activity tracking

All tables have Row Level Security (RLS) enabled for data protection.

## 📧 Email System

The platform includes a complete automated email system with 20 professional templates:

### Quick Setup
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env`: `RESEND_API_KEY=re_your_key`
4. Deploy the `send-email` Edge Function

### Sending Emails
```typescript
await supabase.functions.invoke('send-email', {
  body: {
    template_key: 'welcome_verification',
    to: user.email,
    variables: {
      user_name: user.full_name,
      verification_url: verificationLink
    }
  }
});
```

See [EMAIL_QUICK_START.md](./EMAIL_QUICK_START.md) for detailed setup.

## 💳 Payment Integration (Cashfree)

### Cashfree Setup
1. Create a Cashfree account at [merchant.cashfree.com](https://merchant.cashfree.com)
2. Complete KYC verification
3. Get App ID and Secret Key from Developers section
4. Create subscription plans in Cashfree Dashboard
5. Add credentials to `.env` (see configuration above)
6. Configure webhook URL for payment notifications

### Payment Features
- **One-time payments**: Course enrollment (₹35,000)
  - Cards, UPI, Net Banking, Wallets, Pay Later
  - Seamless checkout integration
  - Automatic enrollment on success

- **Recurring subscriptions**: Copy Trades & Indicator (₹1,999+)
  - Monthly, Quarterly, Annual plans
  - Automatic authorization flow
  - Automated renewals and reminders

- **Payment methods**: All major Indian payment options
- **Security**: PCI DSS compliant, RBI approved
- **Settlements**: Fast T+2 day settlements
- **Analytics**: Real-time payment tracking

See [CASHFREE_INTEGRATION_GUIDE.md](./CASHFREE_INTEGRATION_GUIDE.md) for detailed setup.

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify

1. **Via Netlify CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

2. **Via GitHub Integration**
- Connect your GitHub repository to Netlify
- Configure build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
- Add environment variables in Netlify dashboard
- Deploy automatically on push to main branch

### Environment Variables in Production
Set these in your hosting provider's dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_CASHFREE_APP_ID`
- `VITE_CASHFREE_MODE` (set to `production`)
- All `VITE_CASHFREE_PLAN_*` variables

Edge Function secrets (set in Supabase dashboard):
- `CASHFREE_APP_ID`
- `CASHFREE_SECRET_KEY`
- `CASHFREE_WEBHOOK_SECRET`
- `CASHFREE_MODE` (set to `production`)
- `RESEND_API_KEY`

## 🧪 Testing

### Run Type Checking
```bash
npm run typecheck
```

### Run Linter
```bash
npm run lint
```

### Build Test
```bash
npm run build
npm run preview
```

## 📱 Features by Page

### Home Page (`/`)
- Hero section with clear value proposition
- Trust indicators and social proof
- Service showcase (Course, Copy Trades, Indicator)
- Curriculum overview
- Testimonials
- Pricing comparison
- FAQ section
- Multiple CTAs throughout

### Course Enrollment Flow
1. **Service Selection** - Choose between 3 offerings
2. **Registration** - Create account with email/password
3. **Payment** - Secure Stripe checkout
4. **Success** - Confirmation with next steps

### Subscription Flows
**Copy Trades:**
1. Plan selection (Monthly/Quarterly/Annual)
2. Registration
3. Payment
4. Success with group invite links

**Indicator:**
1. Platform selection (MT4/MT5/TradingView/NinjaTrader)
2. Plan selection
3. Registration
4. Payment
5. Success with download links and license key

### Dashboard (`/dashboard`)
- Enrolled courses overview
- Active subscriptions
- Progress tracking
- Quick access to resources

### Profile (`/profile`)
- Personal information management
- Subscription management
- Payment history
- Email preferences

## 🔒 Security Features

- **Row Level Security (RLS)** on all database tables
- **Protected routes** with authentication checks
- **Secure payment processing** via Stripe
- **Environment variable protection** for sensitive data
- **CORS configuration** for API security
- **Input validation** on all forms
- **SQL injection prevention** via Supabase
- **XSS protection** via React's built-in escaping

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0066FF to #00FF88)
- **Background**: Dark navy (#0A1628, #0F1F3A)
- **Accent**: Cyan/Green (#00FF88)
- **Text**: White with varying opacity

### Typography
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable sans-serif
- **Size scale**: Responsive across breakpoints

### Components
- Reusable button components with hover effects
- Card layouts with glass-morphism effects
- Modal dialogs for confirmations
- Toast notifications for feedback
- Loading states and skeletons

## 📊 Analytics & Monitoring

### Email Analytics
- Delivery rates
- Open rates
- Click-through rates
- Bounce tracking
- Error monitoring

### User Analytics
- Enrollment conversions
- Course completion rates
- Subscription retention
- Payment success rates

View analytics in:
- Supabase Dashboard (Database metrics)
- Stripe Dashboard (Payment metrics)
- Resend Dashboard (Email metrics)

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Supabase Connection Issues**
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Check network connectivity
- Ensure RLS policies are correctly set

**Email Not Sending**
- Verify `RESEND_API_KEY` is configured
- Check Edge Function is deployed
- Review `email_logs` table for errors
- Verify domain is verified in Resend (production)

**Payment Failures**
- Check Stripe API keys are correct
- Verify webhook endpoint is configured
- Test with Stripe test cards
- Review Stripe dashboard logs

## 🤝 Contributing

This is a proprietary project. For internal contributors:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request
5. Get approval before merging

## 📄 License

Proprietary - All rights reserved © 2025 RealitiGrowth

## 📞 Support

### For Users
- **Email**: hi@realitigrowth.com
- **Phone**: +91 70193 85981
- **WhatsApp**: +91 70193 85981

### For Developers
- **Documentation**: See `/docs` folder
- **Email Setup**: [EMAIL_QUICK_START.md](./EMAIL_QUICK_START.md)
- **Database Schema**: [DATABASE_AUTH_SUMMARY.md](./DATABASE_AUTH_SUMMARY.md)

## 🗺️ Roadmap

### Current Features ✅
- Course enrollment system
- Subscription management
- Payment processing
- Email automation
- User authentication
- Progress tracking

### Upcoming Features 🚀
- Video streaming platform integration
- Live session scheduling
- Community forum
- Mobile app (iOS/Android)
- Advanced analytics dashboard
- Gamification and achievements
- Referral program
- Multi-language support

## 📚 Additional Documentation

### Email System
- [Email Quick Start Guide](./EMAIL_QUICK_START.md)
- [Email Integration Setup](./EMAIL_INTEGRATION_SETUP.md)
- [Complete Email Templates](./EMAIL_TEMPLATES_COMPLETE.md)
- [Email Automation Guide](./EMAIL_AUTOMATION_COMPLETE.md)
- [Email System Summary](./EMAIL_SYSTEM_SUMMARY.md)

### Payment Integration
- [Cashfree Integration Guide](./CASHFREE_INTEGRATION_GUIDE.md)
- [Cashfree Migration Summary](./CASHFREE_MIGRATION_SUMMARY.md)

### General
- [Database & Auth Summary](./DATABASE_AUTH_SUMMARY.md)
- [Setup Guide](./SETUP_GUIDE.md)
- [Success Page Features](./SUCCESS_PAGE_FEATURES.md)

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.com/)
- [Cashfree](https://cashfree.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Resend](https://resend.com/)

---

**Made with ❤️ by RealitiGrowth**

For questions or support, reach out at hi@realitigrowth.com
