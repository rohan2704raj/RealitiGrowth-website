# Complete Email Templates Reference

This document contains ALL email templates for the RealitiGrowth email system.

## Template Implementation Status

### ✅ Implemented in Code (src/lib/emailTemplates.ts)
- Welcome & Email Verification
- Email Verified Confirmation
- Password Reset Request
- Password Reset Success

### 📋 Ready for Implementation
The templates below are designed and ready to be added to the email system. They follow the same HTML structure and styling as the authentication templates.

---

## ENROLLMENT EMAIL TEMPLATES

### EMAIL 5: ENROLLMENT PAYMENT CONFIRMATION

**Trigger:** Successful payment for A-Z Stock, Forex & Crypto Mastering Program
**Template Key:** `enrollment_payment_confirmation`
**Category:** enrollment
**Subject:** Payment Confirmed - Welcome to Trading Mastery! 🎉

**Variables:**
```json
{
  "user_name": "First Name",
  "order_id": "Order ID",
  "transaction_id": "Stripe Payment ID",
  "program_name": "A-Z Stock, Forex & Crypto Mastering Program",
  "amount_paid": "35,000",
  "payment_date": "Date & Time",
  "payment_method": "Card ending ****1234 / UPI",
  "receipt_url": "Link to receipt PDF",
  "dashboard_url": "Dashboard URL"
}
```

**Content Structure:**
```
Hi {{user_name}},

Thank you for enrolling in the A-Z Stock, Forex & Crypto Mastering Program!

Your payment has been processed successfully.

PAYMENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Order ID: #{{order_id}}
Transaction ID: {{transaction_id}}
Program: {{program_name}}
Amount Paid: ₹{{amount_paid}}
Payment Date: {{payment_date}}
Payment Method: {{payment_method}}

[Download Receipt Button] (PDF also attached)

WHAT'S NEXT?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Access Credentials (arriving in 2 minutes)
2. Welcome Package (arriving in 5 minutes)
3. Course Materials - 120+ video lessons
4. Community Access - 10,000+ traders

[Access Dashboard Button]

WHAT'S INCLUDED
✓ 120+ Video Lessons
✓ Live Trading Sessions
✓ Lifetime Access
✓ Certificate of Completion
✓ Community Access
✓ Downloadable Resources

MONEY-BACK GUARANTEE
Not satisfied? Get a full refund within 30 days, no questions asked.
```

---

### EMAIL 6: COURSE ACCESS CREDENTIALS

**Trigger:** 2 minutes after payment confirmation
**Template Key:** `course_access_credentials`
**Category:** enrollment
**Subject:** Your Login Credentials - Access Your Course Now 🚀

**Variables:**
```json
{
  "user_name": "First Name",
  "dashboard_url": "https://realitigrowth.com/dashboard",
  "username": "user@email.com",
  "temp_password": "Auto-generated password",
  "module_1_url": "Link to Module 1",
  "template_download_url": "Trading journal template",
  "next_session_date": "Date & Time",
  "calendar_url": "Add to calendar link"
}
```

**Content Structure:**
```
Hi {{user_name}},

Your RealitiGrowth dashboard is ready! Here are your login credentials:

LOGIN DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dashboard URL: {{dashboard_url}}
Username: {{username}}
Temporary Password: {{temp_password}}

[Login Now Button]

IMPORTANT: Change your password after first login for security.

ACCESSING YOUR COURSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Once logged in, you'll find:
📚 Course Modules - All 12 modules unlocked
🎥 Video Library - 120+ lessons ready
📅 Live Sessions - Schedule and join
💾 Downloads - Templates and resources
👥 Community - Connect with traders

START HERE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Module 1: Trading Fundamentals (2 hours, 8 lessons)
   [Start Module 1]

2. Download Your Trading Journal
   [Download Template]

3. Join Live Orientation Session
   Next session: {{next_session_date}}
   [Add to Calendar]

MOBILE ACCESS
Access on desktop, tablets, and mobile phones!
Login at: {{dashboard_url}}
```

---

### EMAIL 7: WELCOME & GETTING STARTED GUIDE

**Trigger:** 5 minutes after payment confirmation
**Template Key:** `enrollment_welcome_guide`
**Category:** enrollment
**Subject:** Your First Steps - Getting Started with Trading Mastery 📈

**Variables:**
```json
{
  "user_name": "First Name",
  "dashboard_url": "Dashboard link",
  "roadmap_pdf_url": "90-day roadmap PDF",
  "journal_template_url": "Trading journal",
  "calculator_url": "Risk calculator",
  "checklist_url": "Market analysis checklist",
  "bonus_indicators_url": "Elite indicators pack",
  "bonus_ebook_url": "Trading strategies ebook",
  "bonus_webinars_url": "Webinar recordings",
  "whatsapp_group_url": "WhatsApp community",
  "telegram_url": "Telegram channel",
  "discord_url": "Discord server"
}
```

**Content Structure:**
```
Hi {{user_name}},

Welcome to the RealitiGrowth family! 🎉

YOUR 7-DAY SUCCESS PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DAY 1 (TODAY): Set Up & Explore
□ Login to your dashboard
□ Complete your profile
□ Download trading journal
□ Watch: Welcome & Overview (15 min)
□ Join the community

DAY 2: Foundation Building
□ Complete Module 1: Trading Fundamentals
□ Take notes in journal
□ Join Q&A session

DAY 3: Technical Analysis Basics
□ Start Module 2: Technical Analysis
□ Practice with demo charts
□ Complete module quiz

DAY 4: Chart Patterns
□ Module 3: Chart Patterns & Price Action
□ Identify patterns on real charts
□ Submit pattern analysis

DAY 5: Risk Management
□ Module 4: Position Sizing & Stop Loss
□ Calculate risk tolerance
□ Set up risk calculator

DAY 6: Strategy Development
□ Module 5: Support & Resistance
□ Watch live trading replay
□ Plan first paper trade

DAY 7: Review & Practice
□ Review Week 1 materials
□ Take progress assessment
□ Share wins in community

[Download Full 90-Day Roadmap PDF]

QUICK START RESOURCES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 Essential Downloads:
- Trading Journal Template [Download]
- Risk Calculator Spreadsheet [Download]
- Market Analysis Checklist [Download]
- Trading Plan Template [Download]

🎥 Must-Watch Videos:
- Course Orientation (15 min) [Watch]
- Platform Tutorial (8 min) [Watch]
- Trading Workspace Setup (12 min) [Watch]

📅 Live Sessions This Week:
- Tuesday, 7:00 PM IST - Chart Analysis [Register]
- Thursday, 7:00 PM IST - Q&A Session [Register]

BONUS MATERIALS UNLOCKED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎁 Bonus #1: Elite Trading Indicators Pack
   Value: ₹5,000 | [Download Now]

🎁 Bonus #2: 10 Proven Strategies eBook
   Value: ₹3,000 | [Download Now]

🎁 Bonus #3: Exclusive Webinar Recordings (5 hrs)
   Value: ₹8,000 | [Access Library]

JOIN THE COMMUNITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 WhatsApp Community: [Join Group]
📱 Telegram Channel: [Join Channel]
🎮 Discord Server: [Join Discord]

Community Benefits:
- Ask questions, get quick answers
- Share trade ideas and analysis
- Weekly challenges
- Network with experienced traders
- Real-time market updates

PRO TIPS FOR SUCCESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 "Schedule specific learning times daily"
💡 "Practice on demo before going live"
💡 "Join every live session - game changers"
💡 "Engage in community - learn from others"
💡 "Keep detailed trading journal from day one"

Let's master the markets together! 🚀
```

---

## SUBSCRIPTION EMAIL TEMPLATES

### EMAIL 8: SUBSCRIPTION CONFIRMATION (Copy Trades)

**Trigger:** Successful subscription for Copy My Trades
**Template Key:** `subscription_copy_trades`
**Category:** subscription
**Subject:** Subscription Active - Start Receiving Trade Alerts! 📊

**Variables:**
```json
{
  "user_name": "First Name",
  "subscription_id": "Sub ID",
  "plan_type": "Monthly/Quarterly/Annual",
  "amount": "1,999",
  "billing_period": "month/quarter/year",
  "status": "Active",
  "start_date": "Date",
  "next_billing": "Date",
  "payment_method": "Card/UPI ****1234",
  "invoice_url": "Invoice PDF link",
  "manage_url": "Subscription management",
  "whatsapp_url": "WhatsApp group link",
  "telegram_url": "Telegram channel link",
  "analysis_url": "Today's market analysis"
}
```

**Content Structure:**
```
Hi {{user_name}},

Welcome to Copy My Trades Call's Group! Your subscription is now active.

SUBSCRIPTION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subscription ID: #{{subscription_id}}
Plan: {{plan_type}} Plan
Amount: ₹{{amount}}/{{billing_period}}
Status: ✓ Active
Started: {{start_date}}
Next Billing: {{next_billing}}
Payment Method: {{payment_method}}

[Download Invoice] [Manage Subscription]

WHAT YOU GET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Real-time trade alerts from expert traders
✓ Entry and exit points for every trade
✓ Risk management guidance
✓ Win rate: 78% average
✓ All markets (Stocks, Forex, Crypto)
✓ Daily market analysis

JOIN THE GROUP NOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Join WhatsApp Group Button]
or
[Join Telegram Channel Button]

Group Rules:
- Alerts only (no chat in alert channel)
- Follow risk management guidelines
- Trade at your own risk
- Questions? Use discussion group

ENABLE NOTIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Never miss an alert!

📱 WhatsApp: Enable in group settings
🔔 Telegram: Turn on notifications
💻 Browser: [Enable Push Notifications]
📧 Email: Alerts sent to this email

SAMPLE ALERT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 TRADE ALERT - BUY
Symbol: RELIANCE
Entry: ₹2,450 - ₹2,460
Target 1: ₹2,500
Target 2: ₹2,550
Stop Loss: ₹2,420
Risk:Reward - 1:2.5
Timeframe: Intraday

📝 Rationale: Breakout above resistance...

TODAY'S MARKET OUTLOOK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Brief analysis]
[View Full Analysis]

TRADING GUIDELINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Always use stop loss
2. Never risk more than 2% per trade
3. Follow position sizing recommendations
4. Don't overtrade
5. Keep a trading journal

[Download Trading Guide PDF]

YOUR SUBSCRIPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Billing: Automatic on {{next_billing}}
- Cancel anytime from dashboard
- No cancellation fees
- Access continues until period end

[Manage Subscription Settings]

Happy Trading! 📈
```

---

### EMAIL 9: SUBSCRIPTION CONFIRMATION (Indicator)

**Trigger:** Successful subscription for Indicator
**Template Key:** `subscription_indicator`
**Category:** subscription
**Subject:** Your Indicator is Ready - Download Now! 🚀

**Variables:**
```json
{
  "user_name": "First Name",
  "subscription_id": "Sub ID",
  "plan_type": "Monthly/Quarterly/Annual",
  "amount": "1,999",
  "billing_period": "month/quarter/year",
  "status": "Active",
  "start_date": "Date",
  "next_billing": "Date",
  "platforms": ["MT4", "MT5", "TradingView", "NinjaTrader"],
  "license_key": "RTIG-XXXX-XXXX-XXXX",
  "valid_until": "Date",
  "devices_allowed": "3",
  "mt4_download_url": "MT4 file",
  "mt4_guide_url": "MT4 installation guide",
  "mt4_video_url": "MT4 video tutorial",
  "mt5_download_url": "MT5 file",
  "tradingview_invite_url": "TradingView link",
  "ninjatrader_download_url": "NT8 zip",
  "user_manual_url": "User manual PDF",
  "settings_guide_url": "Settings guide PDF",
  "strategy_pack_url": "Strategy templates",
  "discord_url": "Discord community",
  "telegram_url": "Telegram group",
  "manage_devices_url": "Device management",
  "manage_subscription_url": "Subscription settings"
}
```

**Content Structure:**
```
Hi {{user_name}},

Your RealitiGrowth Indicator subscription is active!

SUBSCRIPTION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subscription ID: #{{subscription_id}}
Plan: {{plan_type}} Plan
Amount: ₹{{amount}}/{{billing_period}}
Status: ✓ Active
Started: {{start_date}}
Next Billing: {{next_billing}}
Platforms: [Badges for selected platforms]

[Download Invoice] [Manage Subscription]

YOUR LICENSE KEY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
License Key: {{license_key}}

[Copy License Key Button]

Keep safe - needed for activation.
Valid until: {{valid_until}}
Devices allowed: {{devices_allowed}}

DOWNLOAD YOUR INDICATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[If MT4 selected:]
📥 MetaTrader 4
File: RealitiGrowth_MT4_v2.3.ex4 (2.4 MB)
[Download] [Installation Guide] [Watch Video]

[If MT5 selected:]
📥 MetaTrader 5
File: RealitiGrowth_MT5_v2.3.ex5 (2.6 MB)
[Download] [Installation Guide] [Watch Video]

[If TradingView selected:]
📥 TradingView
Invite Link: {{tradingview_invite_url}}
[Copy Invite] [Setup Guide] [Watch Video]

[If NinjaTrader selected:]
📥 NinjaTrader
File: RealitiGrowth_NT8.zip (3.1 MB)
[Download] [Installation Guide] [Watch Video]

QUICK INSTALLATION (MT4/MT5)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Download indicator file
2. Open MT4/MT5 → File → Open Data Folder
3. Go to MQL4/MQL5 → Indicators folder
4. Paste downloaded file
5. Restart platform
6. Drag indicator to chart
7. Enter license key when prompted

[Watch Installation Video - 3 min]

INDICATOR FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Multi-timeframe analysis
✓ Custom alert system
✓ 73% accuracy rate
✓ Precision entry/exit signals
✓ Trend detection
✓ Risk management calculator
✓ Support/resistance levels
✓ Real-time notifications

RESOURCES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 Documentation:
- User Manual (50 pages) [Download]
- Quick Reference Card [Download]
- Settings Guide [Download]

🎥 Tutorials:
- Setup Tutorial (15 min) [Watch]
- Understanding Signals (10 min) [Watch]
- Advanced Settings (12 min) [Watch]
- Trading Strategies (20 min) [Watch]

📈 Strategy Guides:
- Scalping Strategy [Download]
- Swing Trading Strategy [Download]
- Day Trading Blueprint [Download]

CUSTOMIZATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Color Schemes: 5 themes
- Alerts: Sound, popup, email, push
- Sensitivity: Aggressive/moderate/conservative
- Timeframes: M1 to MN1
- Signal Filters: Custom confirmation

[View Full Guide]

TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ Indicator not showing?
→ Check file in correct folder
→ Enable "Allow DLL imports"
→ Restart platform

❓ License key not working?
→ Copy exactly (no spaces)
→ Check subscription active
→ Contact support

❓ No alerts?
→ Enable in indicator settings
→ Check platform alerts
→ Verify sound not muted

[View All FAQs] [Contact Support]

JOIN THE COMMUNITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2,000+ indicator users:

🎮 Discord: [Join Now]
Share setups, get help

💬 Telegram: [Join Now]
Updates, tips, support

SUBSCRIPTION MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Manage devices: [View Devices]
- Update payment: [Update Card]
- Change plan: [Upgrade/Downgrade]
- Cancel anytime: [Manage]

WHAT'S NEXT?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Download for your platform(s)
2. Follow installation instructions
3. Watch setup tutorial
4. Test on demo account first
5. Join community for support
6. Start trading with confidence!

Get ready to trade with an edge! 📈

P.S. Installation > 5 minutes? Watch our 3-minute tutorial!
```

---

## EMAIL TEMPLATE VARIABLES REFERENCE

### Common Variables (All Templates)
- `user_name` - User's first name
- `email_from` - hi@realitigrowth.com
- `support_phone` - +91 70193 85981
- `support_whatsapp` - +91 70193 85981
- `company_address` - No 639, 3rd Cross, 1st Main, Mahalakshmi Layout, Bangalore - 560086
- `site_url` - https://realitigrowth.com

### Authentication Variables
- `verification_url`, `verification_token`
- `reset_url`, `reset_token`
- `login_url`, `dashboard_url`
- `change_date`, `ip_address`, `device_info`

### Enrollment Variables
- `order_id`, `transaction_id`
- `program_name`, `amount_paid`
- `payment_date`, `payment_method`
- `receipt_url`, `username`, `temp_password`
- All resource download URLs

### Subscription Variables
- `subscription_id`, `plan_type`
- `amount`, `billing_period`
- `start_date`, `next_billing`
- `license_key`, `valid_until`, `devices_allowed`
- Platform-specific download URLs
- Community invite URLs

---

## Implementation Notes

1. **Template Storage**: All templates should be inserted into the `email_templates` table in Supabase

2. **Variable Replacement**: Use `{{variable}}` syntax for dynamic content. The email sending function will replace these with actual values.

3. **HTML Structure**: All templates follow the same layout:
   - Email header with logo and branding
   - Main content area
   - Footer with contact info and links

4. **Responsive Design**: All emails are mobile-responsive and will adapt to different screen sizes.

5. **Plain Text Fallback**: Each HTML template should have a corresponding plain text version for email clients that don't support HTML.

6. **Attachments**: Some emails include PDF attachments (receipts, guides, etc.). These should be generated separately and included when sending.

7. **Tracking**: All emails are logged in the `email_logs` table for tracking delivery status, opens, and clicks.
