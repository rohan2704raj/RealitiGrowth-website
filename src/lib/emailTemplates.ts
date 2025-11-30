/**
 * Email Templates Library
 *
 * This file contains all email template HTML and text versions for:
 * - Authentication emails (welcome, verification, password reset)
 * - Enrollment emails (payment confirmation, credentials, welcome guide)
 * - Subscription emails (copy trades, indicator)
 *
 * Templates use {{variable}} syntax for dynamic content replacement
 */

// ============================================================================
// EMAIL LAYOUT WRAPPER
// ============================================================================

export const EMAIL_HEADER = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{{subject}}</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0A1628; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #0F1F3A; }
    .header { background: linear-gradient(135deg, #0A1628 0%, #0F1F3A 100%); padding: 40px 20px; text-align: center; border-bottom: 2px solid #00FF88; }
    .logo { width: 60px; height: 60px; margin: 0 auto 16px; background: linear-gradient(135deg, #0066FF 0%, #00FF88 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; color: white; }
    .brand-name { font-size: 24px; font-weight: bold; color: white; margin-top: 8px; }
    .content { padding: 40px 30px; color: #ffffff; }
    .greeting { font-size: 18px; margin-bottom: 24px; color: #ffffff; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 16px; font-weight: bold; color: #00FF88; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #00FF88; padding-bottom: 8px; }
    .button { display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #0066FF 0%, #00FF88 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0; text-align: center; }
    .button:hover { box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3); }
    .info-box { background-color: rgba(0, 255, 136, 0.1); border-left: 4px solid #00FF88; padding: 16px; margin: 20px 0; border-radius: 4px; }
    .warning-box { background-color: rgba(255, 165, 0, 0.1); border-left: 4px solid #FFA500; padding: 16px; margin: 20px 0; border-radius: 4px; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .detail-label { color: rgba(255, 255, 255, 0.6); }
    .detail-value { color: #ffffff; font-weight: 600; }
    .checkmark { color: #00FF88; margin-right: 8px; }
    ul { list-style: none; padding: 0; }
    li { padding: 8px 0; color: rgba(255, 255, 255, 0.8); }
    .footer { background-color: #0A1628; padding: 30px 20px; text-align: center; color: rgba(255, 255, 255, 0.6); font-size: 14px; }
    .footer-links { margin: 20px 0; }
    .footer-links a { color: #00FF88; text-decoration: none; margin: 0 10px; }
    .social-icons { margin: 20px 0; }
    .divider { height: 2px; background: linear-gradient(90deg, transparent 0%, #00FF88 50%, transparent 100%); margin: 30px 0; }
    @media only screen and (max-width: 600px) {
      .content { padding: 30px 20px !important; }
      .button { display: block; width: 100%; box-sizing: border-box; }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">R</div>
      <div class="brand-name">RealitiGrowth</div>
    </div>
    <div class="content">
`;

export const EMAIL_FOOTER = `
    </div>
    <div class="footer">
      <p><strong>Need help?</strong></p>
      <p>Email: <a href="mailto:{{email_from}}">{{email_from}}</a></p>
      <p>Phone: {{support_phone}}</p>
      <p>WhatsApp: {{support_whatsapp}}</p>
      <div class="divider"></div>
      <p>{{company_address}}</p>
      <p>&copy; 2025 RealitiGrowth. All rights reserved.</p>
      <div class="footer-links">
        <a href="{{site_url}}/privacy">Privacy Policy</a>
        <a href="{{site_url}}/terms">Terms of Service</a>
        <a href="{{site_url}}/unsubscribe">Unsubscribe</a>
      </div>
    </div>
  </div>
</body>
</html>
`;

// ============================================================================
// AUTHENTICATION EMAILS
// ============================================================================

export const WELCOME_VERIFICATION_EMAIL = {
  template_key: 'welcome_verification',
  template_name: 'Welcome & Email Verification',
  category: 'authentication',
  subject: 'Welcome to RealitiGrowth - Verify Your Email',
  variables: ['user_name', 'verification_url', 'verification_token'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p>Welcome to RealitiGrowth! We're excited to have you join our trading community.</p>

    <p>To complete your registration and secure your account, please verify your email address by clicking the button below:</p>

    <div style="text-align: center;">
      <a href="{{verification_url}}" class="button">Verify Email Address</a>
    </div>

    <div class="warning-box">
      <p><strong>⏰ This verification link will expire in 24 hours.</strong></p>
    </div>

    <p>If the button doesn't work, copy and paste this link into your browser:</p>
    <p style="word-break: break-all; background-color: rgba(255,255,255,0.05); padding: 12px; border-radius: 4px; font-family: monospace;">{{verification_url}}</p>

    <div class="divider"></div>

    <p class="section-title">Why Verify?</p>
    <ul>
      <li><span class="checkmark">✓</span> Secure your account access</li>
      <li><span class="checkmark">✓</span> Receive important course updates</li>
      <li><span class="checkmark">✓</span> Enable password recovery</li>
    </ul>

    <p style="margin-top: 30px; color: rgba(255,255,255,0.6); font-size: 14px;">If you didn't create this account, please ignore this email.</p>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

Welcome to RealitiGrowth! We're excited to have you join our trading community.

To complete your registration and secure your account, please verify your email address by visiting this link:

{{verification_url}}

This verification link will expire in 24 hours.

Why verify?
- Secure your account access
- Receive important course updates
- Enable password recovery

If you didn't create this account, please ignore this email.

Best regards,
The RealitiGrowth Team

Need help? Contact us at {{email_from}} or {{support_phone}}`
};

export const EMAIL_VERIFIED_CONFIRMATION = {
  template_key: 'email_verified',
  template_name: 'Email Verified Confirmation',
  category: 'authentication',
  subject: 'Email Verified Successfully! 🎉',
  variables: ['user_name', 'dashboard_url'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p><strong>Great news!</strong> Your email has been verified successfully.</p>

    <div class="info-box">
      <p><span class="checkmark">✓</span> Your account is now fully activated</p>
      <p><span class="checkmark">✓</span> You can access all your enrolled courses</p>
      <p><span class="checkmark">✓</span> You'll receive important updates and notifications</p>
    </div>

    <div style="text-align: center;">
      <a href="{{dashboard_url}}" class="button">Go to Dashboard</a>
    </div>

    <div class="divider"></div>

    <p class="section-title">Ready to Start?</p>
    <p>Here's what to do next:</p>
    <ul>
      <li><strong>1.</strong> Complete your profile</li>
      <li><strong>2.</strong> Explore your enrolled courses</li>
      <li><strong>3.</strong> Join our trading community</li>
    </ul>

    <p style="margin-top: 30px;">If you have any questions, we're here to help!</p>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

Great news! Your email has been verified successfully.

✓ Your account is now fully activated
✓ You can access all your enrolled courses
✓ You'll receive important updates and notifications

Go to your dashboard: {{dashboard_url}}

Ready to start? Here's what to do next:
1. Complete your profile
2. Explore your enrolled courses
3. Join our trading community

If you have any questions, we're here to help!

Best regards,
The RealitiGrowth Team`
};

export const PASSWORD_RESET_REQUEST = {
  template_key: 'password_reset_request',
  template_name: 'Password Reset Request',
  category: 'authentication',
  subject: 'Reset Your Password - RealitiGrowth',
  variables: ['user_name', 'reset_url', 'reset_token'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p>We received a request to reset your password for your RealitiGrowth account.</p>

    <p>Click the button below to create a new password:</p>

    <div style="text-align: center;">
      <a href="{{reset_url}}" class="button">Reset Password</a>
    </div>

    <div class="warning-box">
      <p><strong>⏰ This link will expire in 1 hour</strong> for security reasons.</p>
    </div>

    <p>If the button doesn't work, copy and paste this link into your browser:</p>
    <p style="word-break: break-all; background-color: rgba(255,255,255,0.05); padding: 12px; border-radius: 4px; font-family: monospace;">{{reset_url}}</p>

    <div class="divider"></div>

    <p class="section-title">Security Tips</p>
    <ul>
      <li><span class="checkmark">✓</span> Use a strong, unique password</li>
      <li><span class="checkmark">✓</span> Enable two-factor authentication (if available)</li>
      <li><span class="checkmark">✓</span> Never share your password with anyone</li>
    </ul>

    <p style="margin-top: 30px; color: rgba(255,255,255,0.6); font-size: 14px;"><strong>If you didn't request a password reset,</strong> please ignore this email. Your password will remain unchanged.</p>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

We received a request to reset your password for your RealitiGrowth account.

Reset your password by visiting this link:
{{reset_url}}

This link will expire in 1 hour for security reasons.

Security Tips:
- Use a strong, unique password
- Enable two-factor authentication (if available)
- Never share your password with anyone

If you didn't request a password reset, please ignore this email. Your password will remain unchanged.

Best regards,
The RealitiGrowth Team`
};

export const PASSWORD_RESET_SUCCESS = {
  template_key: 'password_reset_success',
  template_name: 'Password Reset Successful',
  category: 'authentication',
  subject: 'Password Changed Successfully',
  variables: ['user_name', 'change_date', 'ip_address', 'device_info', 'login_url'],
  html_body: EMAIL_HEADER + `
    <p class="greeting">Hi {{user_name}},</p>

    <p>Your RealitiGrowth account password has been changed successfully.</p>

    <div class="info-box">
      <div class="detail-row">
        <span class="detail-label">Changed on:</span>
        <span class="detail-value">{{change_date}}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">IP Address:</span>
        <span class="detail-value">{{ip_address}}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Device:</span>
        <span class="detail-value">{{device_info}}</span>
      </div>
    </div>

    <p>If you made this change, no further action is needed.</p>

    <div class="warning-box">
      <p><strong>⚠️ If you did NOT change your password,</strong> please contact us immediately:</p>
      <ul>
        <li>Email: {{email_from}}</li>
        <li>Phone: {{support_phone}}</li>
        <li>WhatsApp: {{support_whatsapp}}</li>
      </ul>
    </div>

    <p>For your security, all active sessions have been logged out. Please login with your new password.</p>

    <div style="text-align: center;">
      <a href="{{login_url}}" class="button">Login to Account</a>
    </div>
  ` + EMAIL_FOOTER,
  text_body: `Hi {{user_name}},

Your RealitiGrowth account password has been changed successfully.

Changed on: {{change_date}}
IP Address: {{ip_address}}
Device: {{device_info}}

If you made this change, no further action is needed.

If you did NOT change your password, please contact us immediately:
- Email: {{email_from}}
- Phone: {{support_phone}}
- WhatsApp: {{support_whatsapp}}

For your security, all active sessions have been logged out. Please login with your new password.

Login: {{login_url}}

Best regards,
The RealitiGrowth Team`
};

// Export all authentication templates
export const AUTHENTICATION_TEMPLATES = [
  WELCOME_VERIFICATION_EMAIL,
  EMAIL_VERIFIED_CONFIRMATION,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS
];
