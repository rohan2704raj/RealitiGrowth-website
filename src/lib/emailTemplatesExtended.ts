/**
 * Extended Email Templates Library
 *
 * Additional email templates for:
 * - Billing & Subscription Management (5 templates)
 * - Course Progress & Engagement (2 templates)
 * - Re-engagement & Retention (2 templates)
 * - Administrative & Support (2 templates)
 */

import { EMAIL_HEADER, EMAIL_FOOTER } from './emailTemplates';

// ============================================================================
// BILLING & SUBSCRIPTION MANAGEMENT EMAILS
// ============================================================================

export const UPCOMING_RENEWAL_REMINDER = {
  template_key: 'upcoming_renewal_reminder',
  template_name: 'Upcoming Renewal Reminder',
  category: 'billing',
  subject: 'Subscription Renewal in 3 Days - {{service_name}}',
  variables: ['user_name', 'service_name', 'plan_type', 'renewal_date', 'amount', 'payment_method', 'subscription_url', 'update_payment_url', 'change_plan_url', 'pause_url', 'cancel_url', 'benefits_list'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p>Your <strong>{{service_name}}</strong> subscription will renew in <strong>3 days</strong>.</p>

    <div class="section">
      <p class="section-title">Renewal Details</p>
      <div class="info-box">
        <div class="detail-row">
          <span class="detail-label">Service:</span>
          <span class="detail-value">{{service_name}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Plan:</span>
          <span class="detail-value">{{plan_type}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Renewal Date:</span>
          <span class="detail-value">{{renewal_date}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Amount:</span>
          <span class="detail-value">₹{{amount}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Payment Method:</span>
          <span class="detail-value">{{payment_method}}</span>
        </div>
      </div>
      <div style="text-align: center;">
        <a href="{{subscription_url}}" class="button">View Subscription Details</a>
      </div>
    </div>

    <div class="section">
      <p class="section-title">No Action Needed</p>
      <p>Your subscription will automatically renew on {{renewal_date}}. You'll continue enjoying:</p>
      {{benefits_list}}
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="section-title">Need to Make Changes?</p>
      <ul>
        <li><a href="{{update_payment_url}}" style="color: #00FF88;">Update Payment Method</a></li>
        <li><a href="{{change_plan_url}}" style="color: #00FF88;">Change Plan</a> (Upgrade or Downgrade)</li>
        <li><a href="{{pause_url}}" style="color: #00FF88;">Pause Subscription</a> (1-3 months)</li>
        <li><a href="{{cancel_url}}" style="color: #00FF88;">Cancel Subscription</a> (Before Renewal)</li>
      </ul>
    </div>

    <p style="margin-top: 30px;">Questions about your subscription? We're here to help!</p>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

Your {{service_name}} subscription will renew in 3 days.

RENEWAL DETAILS
Service: {{service_name}}
Plan: {{plan_type}}
Renewal Date: {{renewal_date}}
Amount: ₹{{amount}}
Payment Method: {{payment_method}}

View Details: {{subscription_url}}

NO ACTION NEEDED
Your subscription will automatically renew. You'll continue enjoying all benefits.

NEED TO MAKE CHANGES?
- Update Payment Method: {{update_payment_url}}
- Change Plan: {{change_plan_url}}
- Pause Subscription: {{pause_url}}
- Cancel Subscription: {{cancel_url}}

Thanks for being a valued member!

Best regards,
The RealitiGrowth Team`
};

export const SUCCESSFUL_RENEWAL = {
  template_key: 'successful_renewal',
  template_name: 'Successful Renewal',
  category: 'billing',
  subject: 'Subscription Renewed - Thank You! ✓',
  variables: ['user_name', 'service_name', 'invoice_number', 'renewal_date', 'amount', 'payment_method', 'next_renewal_date', 'invoice_url', 'subscription_url'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p>Your <strong>{{service_name}}</strong> subscription has been renewed successfully.</p>

    <div class="section">
      <p class="section-title">Renewal Confirmation</p>
      <div class="info-box">
        <div class="detail-row">
          <span class="detail-label">Invoice Number:</span>
          <span class="detail-value">#{{invoice_number}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span class="detail-value">{{renewal_date}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Amount Charged:</span>
          <span class="detail-value">₹{{amount}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Payment Method:</span>
          <span class="detail-value">{{payment_method}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Next Renewal:</span>
          <span class="detail-value">{{next_renewal_date}}</span>
        </div>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{invoice_url}}" class="button">Download Invoice</a>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Your Subscription</p>
      <div class="info-box">
        <p><span class="checkmark">✓</span> Status: <strong>Active</strong></p>
        <p><span class="checkmark">✓</span> Access continues until: <strong>{{next_renewal_date}}</strong></p>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{subscription_url}}" class="button">View Subscription Dashboard</a>
      </div>
    </div>

    <p style="margin-top: 30px;">Thank you for continuing your trading journey with us!</p>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

Your {{service_name}} subscription has been renewed successfully.

RENEWAL CONFIRMATION
Invoice Number: #{{invoice_number}}
Date: {{renewal_date}}
Amount Charged: ₹{{amount}}
Payment Method: {{payment_method}}
Next Renewal: {{next_renewal_date}}

Download Invoice: {{invoice_url}}

YOUR SUBSCRIPTION
Status: ✓ Active
Access continues until: {{next_renewal_date}}

View Dashboard: {{subscription_url}}

Thank you for continuing your trading journey with us!

Best regards,
The RealitiGrowth Team`
};

export const PAYMENT_FAILED = {
  template_key: 'payment_failed',
  template_name: 'Payment Failed',
  category: 'billing',
  subject: 'Action Required: Payment Failed for Your Subscription',
  variables: ['user_name', 'service_name', 'attempt_date', 'amount', 'payment_method', 'failure_reason', 'update_payment_url', 'grace_period_days', 'grace_period_end_date'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p>We were unable to process payment for your <strong>{{service_name}}</strong> subscription.</p>

    <div class="warning-box">
      <p class="section-title">Payment Attempt Failed</p>
      <div class="detail-row">
        <span class="detail-label">Attempted on:</span>
        <span class="detail-value">{{attempt_date}}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Amount:</span>
        <span class="detail-value">₹{{amount}}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Payment Method:</span>
        <span class="detail-value">{{payment_method}}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Reason:</span>
        <span class="detail-value">{{failure_reason}}</span>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Action Required</p>
      <p>To continue your subscription, please update your payment method:</p>
      <div style="text-align: center;">
        <a href="{{update_payment_url}}" class="button">Update Payment Method</a>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Grace Period</p>
      <div class="info-box">
        <p>You have <strong>{{grace_period_days}} days</strong> to update your payment before your subscription is cancelled.</p>
        <ul style="list-style: none; padding: 0; margin-top: 15px;">
          <li><span class="checkmark">✓</span> Current access: Continues for {{grace_period_days}} days</li>
          <li><span class="checkmark">✓</span> Update by: <strong>{{grace_period_end_date}}</strong></li>
          <li>⚠️ After {{grace_period_days}} days: Subscription will be cancelled</li>
        </ul>
      </div>
    </div>

    <div class="divider"></div>

    <p class="section-title">Need Help?</p>
    <p>If you're experiencing issues, we're here to help resolve this quickly!</p>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

We were unable to process payment for your {{service_name}} subscription.

PAYMENT ATTEMPT FAILED
Attempted on: {{attempt_date}}
Amount: ₹{{amount}}
Payment Method: {{payment_method}}
Reason: {{failure_reason}}

ACTION REQUIRED
Update your payment method to continue:
{{update_payment_url}}

GRACE PERIOD
You have {{grace_period_days}} days to update payment before cancellation.
- Current access continues for {{grace_period_days}} days
- Update by: {{grace_period_end_date}}
- After deadline: Subscription will be cancelled

Need help? Contact us at {{email_from}} or {{support_phone}}

Best regards,
The RealitiGrowth Team`
};

export const SUBSCRIPTION_CANCELLED = {
  template_key: 'subscription_cancelled',
  template_name: 'Subscription Cancelled',
  category: 'billing',
  subject: 'Subscription Cancelled - We\'re Sorry to See You Go',
  variables: ['user_name', 'service_name', 'cancelled_date', 'access_until_date', 'cancellation_reason', 'reactivate_url', 'feedback_url', 'explore_options_url'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p>Your <strong>{{service_name}}</strong> subscription has been cancelled.</p>

    <div class="section">
      <p class="section-title">Cancellation Details</p>
      <div class="info-box">
        <div class="detail-row">
          <span class="detail-label">Service:</span>
          <span class="detail-value">{{service_name}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Cancelled on:</span>
          <span class="detail-value">{{cancelled_date}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Access continues until:</span>
          <span class="detail-value">{{access_until_date}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Reason:</span>
          <span class="detail-value">{{cancellation_reason}}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Your Access</p>
      <ul>
        <li><span class="checkmark">✓</span> You can continue using the service until {{access_until_date}}</li>
        <li><span class="checkmark">✓</span> No further charges will be made</li>
        <li><span class="checkmark">✓</span> Reactivate anytime before {{access_until_date}} to keep your settings</li>
      </ul>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{reactivate_url}}" class="button">Reactivate Subscription</a>
      </div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="section-title">We'd Love Your Feedback</p>
      <p>Help us improve! Why did you cancel?</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{feedback_url}}" class="button">Share Quick Feedback</a>
      </div>
      <p style="text-align: center; margin-top: 10px; font-size: 14px; color: rgba(255,255,255,0.6);">(Takes only 2 minutes)</p>
    </div>

    <div class="section">
      <p class="section-title">Come Back Anytime</p>
      <div class="info-box">
        <p>Changed your mind? Reactivate with one click!</p>
        <p style="margin-top: 15px;"><strong>Special Offer:</strong> Reactivate within 7 days and get <span style="color: #00FF88;">20% off</span> your next month!</p>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Alternative Options</p>
      <p>Not ready to leave? Consider:</p>
      <ul>
        <li>Pausing subscription (1-3 months)</li>
        <li>Downgrading to a lower plan</li>
        <li>Switching to a different service</li>
      </ul>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{explore_options_url}}" class="button">Explore Options</a>
      </div>
    </div>

    <p style="margin-top: 30px;">Thank you for being part of RealitiGrowth. We hope to see you again soon!</p>
    <p style="margin-top: 10px; font-size: 14px; color: rgba(255,255,255,0.6);">P.S. Your account and data remain safe. You can log back in anytime.</p>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

Your {{service_name}} subscription has been cancelled.

CANCELLATION DETAILS
Service: {{service_name}}
Cancelled on: {{cancelled_date}}
Access continues until: {{access_until_date}}
Reason: {{cancellation_reason}}

YOUR ACCESS
✓ Continue using until {{access_until_date}}
✓ No further charges
✓ Reactivate anytime to keep settings

Reactivate: {{reactivate_url}}

WE'D LOVE YOUR FEEDBACK
Help us improve! Share why you cancelled:
{{feedback_url}}

COME BACK ANYTIME
Special Offer: Reactivate within 7 days and get 20% off!

ALTERNATIVE OPTIONS
- Pause subscription (1-3 months)
- Downgrade to lower plan
- Switch to different service

Explore options: {{explore_options_url}}

Thank you for being part of RealitiGrowth!

P.S. Your account and data remain safe. Log back in anytime.

Best regards,
The RealitiGrowth Team`
};

export const SUBSCRIPTION_PAUSED = {
  template_key: 'subscription_paused',
  template_name: 'Subscription Paused',
  category: 'billing',
  subject: 'Subscription Paused - We\'ll Be Here When You\'re Ready',
  variables: ['user_name', 'service_name', 'paused_date', 'pause_duration', 'resume_date', 'resume_url', 'extend_pause_url', 'cancel_url', 'manage_url'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p>Your <strong>{{service_name}}</strong> subscription has been paused.</p>

    <div class="section">
      <p class="section-title">Pause Details</p>
      <div class="info-box">
        <div class="detail-row">
          <span class="detail-label">Paused on:</span>
          <span class="detail-value">{{paused_date}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Pause duration:</span>
          <span class="detail-value">{{pause_duration}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Resumes on:</span>
          <span class="detail-value">{{resume_date}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Billing:</span>
          <span class="detail-value">No charges during pause</span>
        </div>
      </div>
    </div>

    <div class="section">
      <p class="section-title">What This Means</p>
      <ul>
        <li>Access ends: Today/End of paid period</li>
        <li>No billing during pause</li>
        <li>Automatic resume: {{resume_date}}</li>
        <li>All your data is saved</li>
      </ul>
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="section-title">Manage Your Pause</p>
      <ul>
        <li><a href="{{resume_url}}" style="color: #00FF88;">Resume Early</a></li>
        <li><a href="{{extend_pause_url}}" style="color: #00FF88;">Extend Pause</a> (Add more time)</li>
        <li><a href="{{cancel_url}}" style="color: #00FF88;">Cancel Subscription</a> (Instead of pausing)</li>
      </ul>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{manage_url}}" class="button">Manage Subscription</a>
      </div>
    </div>

    <p style="margin-top: 30px;">See you soon!</p>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

Your {{service_name}} subscription has been paused.

PAUSE DETAILS
Paused on: {{paused_date}}
Pause duration: {{pause_duration}}
Resumes on: {{resume_date}}
No charges during pause period

WHAT THIS MEANS
- Access ends today/end of paid period
- No billing during pause
- Automatic resume: {{resume_date}}
- All your data is saved

MANAGE YOUR PAUSE
- Resume Early: {{resume_url}}
- Extend Pause: {{extend_pause_url}}
- Cancel Instead: {{cancel_url}}

Manage Subscription: {{manage_url}}

See you soon!

Best regards,
The RealitiGrowth Team`
};

// ============================================================================
// COURSE PROGRESS & ENGAGEMENT EMAILS
// ============================================================================

export const COURSE_PROGRESS_WEEK1 = {
  template_key: 'course_progress_week1',
  template_name: 'Course Progress - Week 1 Check-in',
  category: 'engagement',
  subject: 'How\'s Your First Week Going? 📚',
  variables: ['user_name', 'modules_completed', 'total_modules', 'lessons_watched', 'total_lessons', 'progress_percentage', 'time_invested', 'progress_url', 'next_module_url', 'live_session_topic', 'live_session_date', 'register_url', 'community_url', 'support_url'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p>It's been a week since you started your trading journey! How are you doing?</p>

    <div class="section">
      <p class="section-title">Your Progress</p>
      <div class="info-box">
        <div class="detail-row">
          <span class="detail-label">Modules Completed:</span>
          <span class="detail-value">{{modules_completed}} of {{total_modules}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Lessons Watched:</span>
          <span class="detail-value">{{lessons_watched}} of {{total_lessons}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Progress:</span>
          <span class="detail-value">{{progress_percentage}}%</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time Invested:</span>
          <span class="detail-value">{{time_invested}} hours</span>
        </div>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{progress_url}}" class="button">View Detailed Progress</a>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Week 1 Checklist</p>
      <ul style="list-style: none; padding-left: 0;">
        <li>☐ Complete Module 1</li>
        <li>☐ Download trading journal</li>
        <li>☐ Join community group</li>
        <li>☐ Attend first live session</li>
        <li>☐ Complete practice exercises</li>
      </ul>
    </div>

    <div class="section">
      <p class="section-title">Recommended Next Steps</p>
      <p>Based on your progress, we recommend:</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{next_module_url}}" class="button">Continue Learning</a>
      </div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="section-title">Join Live Session This Week</p>
      <div class="info-box">
        <p><strong>Topic:</strong> {{live_session_topic}}</p>
        <p><strong>Date:</strong> {{live_session_date}}</p>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{register_url}}" class="button">Register Now</a>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Connect in Community</p>
      <p>Share your progress and ask questions</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{community_url}}" class="button">Join Discussion</a>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Struggling with Something?</p>
      <p>Common Week 1 challenges:</p>
      <ul>
        <li><strong>Finding time to study?</strong> Try our 15-minute daily lessons</li>
        <li><strong>Concepts seem complex?</strong> Book a 1-on-1 support call</li>
        <li><strong>Technical issues?</strong> Check help center or contact support</li>
      </ul>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{support_url}}" class="button">Get Help</a>
      </div>
    </div>

    <div class="divider"></div>

    <div class="info-box" style="text-align: center;">
      <p style="font-size: 18px; font-weight: bold; color: #00FF88;">Keep Going!</p>
      <p style="font-style: italic; margin-top: 10px;">"Success in trading comes to those who persist."</p>
      <p style="margin-top: 15px;">You've got this! Keep learning, keep practicing!</p>
    </div>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

It's been a week since you started your trading journey!

YOUR PROGRESS
Modules: {{modules_completed}}/{{total_modules}}
Lessons: {{lessons_watched}}/{{total_lessons}}
Progress: {{progress_percentage}}%
Time: {{time_invested}} hours

View Progress: {{progress_url}}

WEEK 1 CHECKLIST
☐ Complete Module 1
☐ Download trading journal
☐ Join community group
☐ Attend first live session
☐ Complete practice exercises

CONTINUE LEARNING
{{next_module_url}}

LIVE SESSION THIS WEEK
Topic: {{live_session_topic}}
Date: {{live_session_date}}
Register: {{register_url}}

JOIN COMMUNITY
{{community_url}}

NEED HELP?
{{support_url}}

Keep going! You've got this!

Best regards,
The RealitiGrowth Team`
};

export const COURSE_COMPLETION = {
  template_key: 'course_completion',
  template_name: 'Course Completion Congratulations',
  category: 'engagement',
  subject: 'Congratulations! You\'ve Completed the Course! 🎉🏆',
  variables: ['user_name', 'total_modules', 'total_lessons', 'total_hours', 'exercises_completed', 'start_date', 'completion_date', 'duration_days', 'certificate_url', 'linkedin_share_url', 'twitter_share_url', 'resources_url', 'alumni_url', 'mentor_url', 'story_url', 'review_url'],
  html_body: EMAIL_HEADER + `
    <div style="text-align: center; margin: 30px 0;">
      <h1 style="font-size: 36px; color: #00FF88; margin-bottom: 10px;">CONGRATULATIONS! 🎉</h1>
      <p style="font-size: 18px;">You've successfully completed the A-Z Stock, Forex & Crypto Mastering Program!</p>
      <p style="margin-top: 15px; font-size: 16px; color: rgba(255,255,255,0.8);">This is a major achievement that many start but few finish. You should be incredibly proud!</p>
    </div>

    <div class="section">
      <p class="section-title">Your Achievement</p>
      <div class="info-box">
        <ul style="list-style: none; padding: 0;">
          <li><span class="checkmark">✓</span> {{total_modules}} Modules Completed</li>
          <li><span class="checkmark">✓</span> {{total_lessons}} Lessons Watched</li>
          <li><span class="checkmark">✓</span> {{total_hours}} Hours of Learning</li>
          <li><span class="checkmark">✓</span> {{exercises_completed}} Exercises Completed</li>
          <li><span class="checkmark">✓</span> Completion Rate: 100%</li>
        </ul>
        <div style="margin-top: 20px;">
          <div class="detail-row">
            <span class="detail-label">Started:</span>
            <span class="detail-value">{{start_date}}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Completed:</span>
            <span class="detail-value">{{completion_date}}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Duration:</span>
            <span class="detail-value">{{duration_days}} days</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Your Certificate</p>
      <p>Your certificate of completion is ready!</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="{{certificate_url}}" class="button">Download Certificate</a>
      </div>
      <p style="text-align: center;">Share your achievement:</p>
      <div style="text-align: center; margin-top: 15px;">
        <a href="{{linkedin_share_url}}" style="color: #00FF88; margin: 0 10px;">Share on LinkedIn</a>
        <a href="{{twitter_share_url}}" style="color: #00FF88; margin: 0 10px;">Share on Twitter</a>
      </div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="section-title">What's Next?</p>

      <p><strong>1. PUT YOUR KNOWLEDGE TO PRACTICE</strong></p>
      <p>Start with small positions and build confidence</p>
      <div style="text-align: center; margin: 15px 0;">
        <a href="{{resources_url}}" class="button">Access Trading Resources</a>
      </div>

      <p style="margin-top: 25px;"><strong>2. JOIN ALUMNI NETWORK</strong></p>
      <p>Connect with other graduates</p>
      <div style="text-align: center; margin: 15px 0;">
        <a href="{{alumni_url}}" class="button">Join Alumni Group</a>
      </div>

      <p style="margin-top: 25px;"><strong>3. BECOME A MENTOR</strong></p>
      <p>Help new students in their journey</p>
      <div style="text-align: center; margin: 15px 0;">
        <a href="{{mentor_url}}" class="button">Apply to Mentor Program</a>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Exclusive Graduate Benefits</p>
      <div class="info-box">
        <p>As a course graduate, you now get:</p>
        <ul>
          <li><span class="checkmark">✓</span> Lifetime access to course updates</li>
          <li><span class="checkmark">✓</span> Priority support</li>
          <li><span class="checkmark">✓</span> 30% discount on future courses</li>
          <li><span class="checkmark">✓</span> Access to private alumni community</li>
          <li><span class="checkmark">✓</span> Monthly graduate-only webinars</li>
          <li><span class="checkmark">✓</span> Trading performance tracking tools</li>
        </ul>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Share Your Success Story</p>
      <p>We'd love to hear about your journey! Share your key learnings, breakthrough moments, and tips for new students.</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{story_url}}" class="button">Submit Your Story</a>
      </div>
      <p style="text-align: center; font-size: 14px; color: rgba(255,255,255,0.6); margin-top: 10px;">Selected stories get featured on our website!</p>
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="section-title">One More Thing...</p>
      <p>Would you recommend this course to others? Your review helps future traders make informed decisions:</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{review_url}}" class="button">Leave a Review</a>
      </div>
    </div>

    <div style="text-align: center; margin: 40px 0;">
      <p style="font-size: 20px; color: #00FF88; font-weight: bold;">From all of us at RealitiGrowth,</p>
      <p style="font-size: 24px; margin-top: 10px;">CONGRATULATIONS AGAIN!</p>
      <p style="margin-top: 15px;">We're excited to see your trading success story unfold!</p>
    </div>

    <p style="text-align: center; font-size: 14px; color: rgba(255,255,255,0.6);">P.S. Don't forget to download your certificate and celebrate this achievement! 🏆</p>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

CONGRATULATIONS! 🎉

You've successfully completed the A-Z Stock, Forex & Crypto Mastering Program!

YOUR ACHIEVEMENT
✓ {{total_modules}} Modules Completed
✓ {{total_lessons}} Lessons Watched
✓ {{total_hours}} Hours of Learning
✓ {{exercises_completed}} Exercises Completed
✓ 100% Completion Rate

Started: {{start_date}}
Completed: {{completion_date}}
Duration: {{duration_days}} days

YOUR CERTIFICATE
Download: {{certificate_url}}
Share on LinkedIn: {{linkedin_share_url}}
Share on Twitter: {{twitter_share_url}}

WHAT'S NEXT?
1. Put knowledge to practice: {{resources_url}}
2. Join alumni network: {{alumni_url}}
3. Become a mentor: {{mentor_url}}

GRADUATE BENEFITS
✓ Lifetime access to updates
✓ Priority support
✓ 30% discount on future courses
✓ Alumni community access
✓ Monthly webinars
✓ Performance tracking tools

SHARE YOUR STORY
{{story_url}}

LEAVE A REVIEW
{{review_url}}

CONGRATULATIONS AGAIN!

Best regards,
The RealitiGrowth Team

P.S. Download your certificate! 🏆`
};

// Export all extended templates
export const BILLING_TEMPLATES = [
  UPCOMING_RENEWAL_REMINDER,
  SUCCESSFUL_RENEWAL,
  PAYMENT_FAILED,
  SUBSCRIPTION_CANCELLED,
  SUBSCRIPTION_PAUSED
];

export const ENGAGEMENT_TEMPLATES = [
  COURSE_PROGRESS_WEEK1,
  COURSE_COMPLETION
];

// Re-export with common email structure helpers
export { EMAIL_HEADER, EMAIL_FOOTER };
