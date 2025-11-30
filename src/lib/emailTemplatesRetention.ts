/**
 * Re-engagement and Support Email Templates
 *
 * Templates for:
 * - Re-engagement & Retention (2 templates)
 * - Administrative & Support (2 templates)
 */

import { EMAIL_HEADER, EMAIL_FOOTER } from './emailTemplates';

// ============================================================================
// RE-ENGAGEMENT & RETENTION EMAILS
// ============================================================================

export const INACTIVE_USER_REENGAGEMENT = {
  template_key: 'inactive_user_reengagement',
  template_name: 'Inactive User Re-engagement',
  category: 'retention',
  subject: 'We Miss You! Come Back to Your Trading Journey 💙',
  variables: ['user_name', 'days_inactive', 'progress_percentage', 'subscription_status', 'new_features', 'dashboard_url', 'next_action', 'time_needed', 'support_url', 'special_offer', 'preferences_url'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p>We noticed you haven't been active lately. Everything okay?</p>

    <div class="section">
      <p class="section-title">Your Account Status</p>
      <div class="info-box">
        <div class="detail-row">
          <span class="detail-label">Last login:</span>
          <span class="detail-value">{{days_inactive}} days ago</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Progress:</span>
          <span class="detail-value">{{progress_percentage}}% complete</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status:</span>
          <span class="detail-value">{{subscription_status}}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <p class="section-title">What You're Missing</p>
      {{new_features}}
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="section-title">Pick Up Where You Left Off</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="{{dashboard_url}}" class="button">Continue Learning / Return to Dashboard</a>
      </div>
      <div class="info-box">
        <p><strong>Next recommended:</strong> {{next_action}}</p>
        <p><strong>Time needed:</strong> Just {{time_needed}} minutes</p>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Need Help?</p>
      <p>Facing any challenges? We're here to help:</p>
      <ul>
        <li><strong>Too busy?</strong> Try our bite-sized lessons</li>
        <li><strong>Feeling overwhelmed?</strong> Book a support call</li>
        <li><strong>Technical issues?</strong> Contact our team</li>
        <li><strong>Lost motivation?</strong> Join community for support</li>
      </ul>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{support_url}}" class="button">Get Support</a>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Special Offer Just For You</p>
      <div class="info-box">
        <p>Come back this week and get:</p>
        <p style="font-size: 18px; color: #00FF88; font-weight: bold; margin-top: 10px;">{{special_offer}}</p>
      </div>
    </div>

    <p style="margin-top: 30px;">We're rooting for your success!</p>

    <p style="margin-top: 20px; font-size: 14px; color: rgba(255,255,255,0.6);">P.S. If you're no longer interested, we understand. <a href="{{preferences_url}}" style="color: #00FF88;">Update preferences</a></p>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

We noticed you haven't been active lately. Everything okay?

YOUR ACCOUNT STATUS
Last login: {{days_inactive}} days ago
Progress: {{progress_percentage}}% complete
Status: {{subscription_status}}

WHAT YOU'RE MISSING
{{new_features}}

PICK UP WHERE YOU LEFT OFF
{{dashboard_url}}

Next recommended: {{next_action}}
Time needed: {{time_needed}} minutes

NEED HELP?
- Too busy? Try bite-sized lessons
- Feeling overwhelmed? Book support call
- Technical issues? Contact our team
- Lost motivation? Join community

Get Support: {{support_url}}

SPECIAL OFFER
Come back this week: {{special_offer}}

We're rooting for your success!

P.S. Update preferences: {{preferences_url}}

Best regards,
The RealitiGrowth Team`
};

export const WINBACK_REACTIVATION = {
  template_key: 'winback_reactivation',
  template_name: 'Win-back Reactivation Offer',
  category: 'retention',
  subject: 'We Want You Back! Special 30% Off Offer 🎁',
  variables: ['user_name', 'service_name', 'days_since_cancel', 'whats_new', 'original_price', 'discounted_price', 'discount_percentage', 'bonus_offer', 'reactivate_url', 'offer_expiry_date', 'testimonial', 'guarantee_days'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p>We miss having you as part of the RealitiGrowth community!</p>

    <p>It's been {{days_since_cancel}} days since you cancelled your <strong>{{service_name}}</strong> subscription. We'd love to have you back!</p>

    <div class="section">
      <p class="section-title">What's New Since You Left</p>
      {{whats_new}}
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="section-title">Exclusive Welcome Back Offer</p>
      <div style="text-align: center; background: linear-gradient(135deg, rgba(0, 102, 255, 0.2) 0%, rgba(0, 255, 136, 0.2) 100%); padding: 30px; border-radius: 12px; margin: 20px 0;">
        <p style="font-size: 32px; font-weight: bold; color: #00FF88; margin: 0;">{{discount_percentage}}% OFF</p>
        <p style="font-size: 18px; margin: 10px 0;">YOUR FIRST MONTH</p>
        <div style="margin: 20px 0;">
          <span style="text-decoration: line-through; color: rgba(255,255,255,0.5); font-size: 20px;">₹{{original_price}}</span>
          <span style="font-size: 32px; font-weight: bold; color: #00FF88; margin-left: 15px;">₹{{discounted_price}}</span>
        </div>
        <p style="font-size: 16px; color: #00FF88; margin-top: 15px;">Plus: {{bonus_offer}}</p>
      </div>
      <div style="text-align: center;">
        <a href="{{reactivate_url}}" class="button" style="font-size: 18px; padding: 18px 40px;">Reactivate with {{discount_percentage}}% Off</a>
      </div>
      <p style="text-align: center; margin-top: 15px; font-size: 14px; color: rgba(255,255,255,0.6);">⏰ Offer expires on {{offer_expiry_date}}</p>
    </div>

    <div class="section">
      <p class="section-title">Why Come Back?</p>
      <ul>
        <li><span class="checkmark">✓</span> All your previous settings saved</li>
        <li><span class="checkmark">✓</span> Resume right where you left off</li>
        <li><span class="checkmark">✓</span> Improved features and performance</li>
        <li><span class="checkmark">✓</span> New community features</li>
        <li><span class="checkmark">✓</span> Better support options</li>
      </ul>
    </div>

    <div class="section">
      <p class="section-title">What Our Members Are Saying</p>
      <div class="info-box">
        <p style="font-style: italic;">"{{testimonial}}"</p>
      </div>
    </div>

    <div class="section">
      <p class="section-title">No Risk Guarantee</p>
      <div class="info-box">
        <p>Try it for <strong>{{guarantee_days}} days</strong>. If you're not satisfied, get a full refund. No questions asked.</p>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{reactivate_url}}" class="button">Claim Your Offer</a>
      </div>
    </div>

    <p style="margin-top: 30px;">We'd love to have you back!</p>

    <p style="margin-top: 20px; font-size: 14px; color: rgba(255,255,255,0.6);">P.S. This offer is exclusive and expires on {{offer_expiry_date}}. Don't miss out!</p>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

We miss having you as part of RealitiGrowth!

It's been {{days_since_cancel}} days since you cancelled {{service_name}}. We'd love to have you back!

WHAT'S NEW
{{whats_new}}

EXCLUSIVE OFFER
{{discount_percentage}}% OFF YOUR FIRST MONTH

Was: ₹{{original_price}}
Now: ₹{{discounted_price}}
Plus: {{bonus_offer}}

Reactivate: {{reactivate_url}}
Expires: {{offer_expiry_date}}

WHY COME BACK?
✓ All settings saved
✓ Resume where you left off
✓ Improved features
✓ New community features
✓ Better support

WHAT MEMBERS SAY
"{{testimonial}}"

NO RISK GUARANTEE
Try for {{guarantee_days}} days. Full refund if not satisfied.

Claim offer: {{reactivate_url}}

We'd love to have you back!

P.S. Offer expires {{offer_expiry_date}}!

Best regards,
The RealitiGrowth Team`
};

// ============================================================================
// ADMINISTRATIVE & SUPPORT EMAILS
// ============================================================================

export const SUPPORT_TICKET_RECEIVED = {
  template_key: 'support_ticket_received',
  template_name: 'Support Ticket Received',
  category: 'support',
  subject: 'Support Ticket Received - #{{ticket_number}}',
  variables: ['user_name', 'ticket_number', 'ticket_subject', 'priority', 'submitted_date', 'expected_response_time', 'user_message', 'ticket_url', 'help_article_url', 'faq_url', 'video_url'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p>We've received your support request and our team is on it!</p>

    <div class="section">
      <p class="section-title">Ticket Details</p>
      <div class="info-box">
        <div class="detail-row">
          <span class="detail-label">Ticket ID:</span>
          <span class="detail-value">#{{ticket_number}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Subject:</span>
          <span class="detail-value">{{ticket_subject}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Priority:</span>
          <span class="detail-value">{{priority}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Submitted:</span>
          <span class="detail-value">{{submitted_date}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Expected Response:</span>
          <span class="detail-value">Within {{expected_response_time}}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Your Message</p>
      <div style="background-color: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; margin: 15px 0;">
        <p style="color: rgba(255,255,255,0.9); font-style: italic;">{{user_message}}</p>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{ticket_url}}" class="button">View Full Ticket</a>
      </div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="section-title">What's Next?</p>
      <p>Our support team is reviewing your request. You'll receive an email once we have an update.</p>
      <p style="margin-top: 20px;">Meanwhile, these resources might help:</p>
      <ul>
        <li><a href="{{help_article_url}}" style="color: #00FF88;">Relevant Help Article</a></li>
        <li><a href="{{faq_url}}" style="color: #00FF88;">Frequently Asked Questions</a></li>
        <li><a href="{{video_url}}" style="color: #00FF88;">Video Tutorial</a></li>
      </ul>
    </div>

    <div class="section">
      <p class="section-title">Need Urgent Help?</p>
      <div class="info-box">
        <p>For immediate assistance:</p>
        <p style="margin-top: 10px;">📞 Call: {{support_phone}} (Mon-Sat, 9 AM - 7 PM IST)</p>
        <p>💬 WhatsApp: {{support_whatsapp}}</p>
      </div>
    </div>

    <p style="margin-top: 30px;">Thank you for your patience!</p>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

We've received your support request and our team is on it!

TICKET DETAILS
Ticket ID: #{{ticket_number}}
Subject: {{ticket_subject}}
Priority: {{priority}}
Submitted: {{submitted_date}}
Expected Response: Within {{expected_response_time}}

YOUR MESSAGE
"{{user_message}}"

View Ticket: {{ticket_url}}

WHAT'S NEXT?
Our support team is reviewing your request. You'll get an update via email.

Meanwhile, these might help:
- Help Article: {{help_article_url}}
- FAQ: {{faq_url}}
- Video Tutorial: {{video_url}}

NEED URGENT HELP?
📞 Call: {{support_phone}} (Mon-Sat, 9 AM - 7 PM IST)
💬 WhatsApp: {{support_whatsapp}}

Thank you for your patience!

Best regards,
RealitiGrowth Support Team`
};

export const SUPPORT_TICKET_RESOLVED = {
  template_key: 'support_ticket_resolved',
  template_name: 'Support Ticket Resolved',
  category: 'support',
  subject: 'Support Ticket Resolved - #{{ticket_number}}',
  variables: ['user_name', 'ticket_number', 'issue_summary', 'resolved_by', 'resolution_time', 'solution_summary', 'conversation_url', 'rating_5_url', 'rating_4_url', 'rating_3_url', 'rating_2_url', 'rating_1_url', 'reopen_url', 'new_ticket_url'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p>Great news! Your support ticket has been resolved.</p>

    <div class="section">
      <p class="section-title">Resolution Details</p>
      <div class="info-box">
        <div class="detail-row">
          <span class="detail-label">Ticket ID:</span>
          <span class="detail-value">#{{ticket_number}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Issue:</span>
          <span class="detail-value">{{issue_summary}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Resolved by:</span>
          <span class="detail-value">{{resolved_by}}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Resolution time:</span>
          <span class="detail-value">{{resolution_time}}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <p class="section-title">Solution Provided</p>
      <div style="background-color: rgba(0,255,136,0.1); padding: 16px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #00FF88;">
        <p style="color: rgba(255,255,255,0.9);">{{solution_summary}}</p>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{conversation_url}}" class="button">View Full Conversation</a>
      </div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="section-title">Was This Helpful?</p>
      <p style="text-align: center;">Please rate your support experience:</p>
      <div style="text-align: center; margin: 20px 0; font-size: 32px;">
        <a href="{{rating_5_url}}" style="text-decoration: none; margin: 0 5px;">⭐⭐⭐⭐⭐</a>
      </div>
      <div style="text-align: center; font-size: 14px;">
        <a href="{{rating_5_url}}" style="color: #00FF88; margin: 0 8px;">5 Stars</a>
        <a href="{{rating_4_url}}" style="color: #00FF88; margin: 0 8px;">4 Stars</a>
        <a href="{{rating_3_url}}" style="color: #00FF88; margin: 0 8px;">3 Stars</a>
        <a href="{{rating_2_url}}" style="color: #00FF88; margin: 0 8px;">2 Stars</a>
        <a href="{{rating_1_url}}" style="color: #00FF88; margin: 0 8px;">1 Star</a>
      </div>
      <p style="text-align: center; margin-top: 15px; font-size: 14px; color: rgba(255,255,255,0.6);">Your feedback helps us improve!</p>
    </div>

    <div class="section">
      <p class="section-title">Still Need Help?</p>
      <p>If your issue isn't fully resolved:</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="{{reopen_url}}" class="button">Reopen Ticket</a>
        <a href="{{new_ticket_url}}" class="button" style="background: rgba(255,255,255,0.1); margin-left: 10px;">Submit New Ticket</a>
      </div>
    </div>

    <p style="margin-top: 30px;">Thank you for choosing RealitiGrowth!</p>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

Great news! Your support ticket has been resolved.

RESOLUTION DETAILS
Ticket ID: #{{ticket_number}}
Issue: {{issue_summary}}
Resolved by: {{resolved_by}}
Resolution time: {{resolution_time}}

SOLUTION PROVIDED
{{solution_summary}}

View Conversation: {{conversation_url}}

WAS THIS HELPFUL?
Rate your experience:
5 Stars: {{rating_5_url}}
4 Stars: {{rating_4_url}}
3 Stars: {{rating_3_url}}
2 Stars: {{rating_2_url}}
1 Star: {{rating_1_url}}

Your feedback helps us improve!

STILL NEED HELP?
Reopen Ticket: {{reopen_url}}
New Ticket: {{new_ticket_url}}

Thank you for choosing RealitiGrowth!

Best regards,
RealitiGrowth Support Team`
};

// Export all retention and support templates
export const RETENTION_TEMPLATES = [
  INACTIVE_USER_REENGAGEMENT,
  WINBACK_REACTIVATION
];

export const SUPPORT_TEMPLATES = [
  SUPPORT_TICKET_RECEIVED,
  SUPPORT_TICKET_RESOLVED
];
