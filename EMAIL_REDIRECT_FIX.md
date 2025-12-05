# Email Confirmation Redirect Fix Guide

## 🔴 Issue: Email Confirmation Redirects to Localhost

### Problem Description
When users click the email confirmation link, they are redirected to `localhost` instead of the production domain `www.realitigrowth.com`.

### Root Cause
Supabase uses the **Site URL** configured in the dashboard for email confirmation redirects. If this is set to `localhost`, all email links will redirect there.

---

## ✅ Complete Fix (3 Steps)

### **Step 1: Update Supabase Dashboard Settings** ⭐ MOST IMPORTANT

1. **Go to Supabase Dashboard:**
   - Visit: https://app.supabase.com
   - Select your project: `RealitiGrowth`

2. **Navigate to Authentication → URL Configuration:**
   - Click **Authentication** in left sidebar
   - Click **URL Configuration**

3. **Update Site URL:**
   ```
   Site URL: https://www.realitigrowth.com
   ```
   ⚠️ **Important:** Remove `http://localhost:5173` if it's there

4. **Add Redirect URLs:**
   Click **Add URL** and add each of these:
   ```
   https://www.realitigrowth.com
   https://www.realitigrowth.com/**
   https://realitigrowth.com
   https://realitigrowth.com/**
   https://realitigrowth-website-*.vercel.app/**
   http://localhost:5173/**  (for local development)
   ```

5. **Click Save** ✅

---

### **Step 2: Update Email Templates** (Optional but Recommended)

1. **Go to:** Authentication → Email Templates

2. **Update "Confirm signup" template:**
   
   Make sure it uses the correct variables:
   ```html
   <h2>Confirm your signup</h2>
   <p>Follow this link to confirm your user:</p>
   <p><a href="{{ .ConfirmationURL }}">Confirm your email</a></p>
   ```

3. **Update "Magic Link" template (if using):**
   ```html
   <h2>Magic Link</h2>
   <p>Follow this link to login:</p>
   <p><a href="{{ .TokenHash }}">Log In</a></p>
   ```

4. **Update "Reset Password" template:**
   ```html
   <h2>Reset Password</h2>
   <p>Follow this link to reset your password:</p>
   <p><a href="{{ .TokenHash }}">Reset Password</a></p>
   ```

---

### **Step 3: Code Update** ✅ (Already Done)

Updated `src/contexts/AuthContext.tsx` to include proper redirect:

```tsx
const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${window.location.origin}/dashboard`, // ✅ Added
    },
  });
  // ...
};
```

This ensures that:
- In production: redirects to `https://www.realitigrowth.com/dashboard`
- In development: redirects to `http://localhost:5173/dashboard`

---

## 🎯 Alternative Solution: Disable Email Confirmation

If you want users to sign up instantly without email confirmation:

1. **Go to:** Authentication → Settings
2. **Find:** "Enable email confirmations"
3. **Toggle it OFF** ❌
4. **Click Save**

**Pros:**
- ✅ Users can login immediately
- ✅ No email confirmation wait
- ✅ Faster signup flow
- ✅ No redirect issues

**Cons:**
- ⚠️ Less secure (no email verification)
- ⚠️ Possible fake email signups

**Recommendation:** Keep it **OFF** for now to avoid redirect issues, enable later when everything is stable.

---

## 🧪 Testing the Fix

### **Test 1: New User Signup**

1. Go to: https://www.realitigrowth.com/signup
2. Create a new account with a real email
3. Check your email for confirmation link
4. Click the confirmation link
5. **Expected:** Should redirect to `https://www.realitigrowth.com/dashboard`
6. **Not:** `http://localhost:5173`

### **Test 2: Password Reset**

1. Go to: https://www.realitigrowth.com/forgot-password
2. Enter your email
3. Check email for reset link
4. Click the reset link
5. **Expected:** Should redirect to `https://www.realitigrowth.com/reset-password`

### **Test 3: Magic Link (if enabled)**

1. Try to login with magic link
2. Check email
3. Click magic link
4. **Expected:** Should redirect to production URL

---

## 📋 Verification Checklist

After making changes, verify:

- [ ] Site URL is set to `https://www.realitigrowth.com`
- [ ] Redirect URLs include production domain
- [ ] Email templates use correct variables
- [ ] Code includes `emailRedirectTo` option
- [ ] Test signup with real email
- [ ] Confirmation link redirects correctly
- [ ] No localhost references in emails

---

## 🚨 Common Issues & Solutions

### Issue: Still redirecting to localhost

**Solution:**
1. Clear browser cache
2. Try incognito mode
3. Check Supabase dashboard settings again
4. Wait 5 minutes for settings to propagate
5. Test with a new email address

### Issue: Email not received

**Solution:**
1. Check spam folder
2. Verify email is correct
3. Check Supabase logs for email sending errors
4. Verify sender email is configured in Supabase

### Issue: "Invalid redirect URL" error

**Solution:**
1. Make sure the redirect URL is in the allowed list
2. Check for typos in URL configuration
3. Include both `www` and non-`www` versions
4. Include wildcard patterns (`/**`)

---

## 🔍 Debugging

### Check Current Configuration

1. **Supabase Dashboard:**
   - Go to Settings → API
   - Check "Site URL" value
   - Should be: `https://www.realitigrowth.com`

2. **Check Email Logs:**
   - Go to Logs → Auth Logs
   - Look for signup events
   - Check confirmation URL in logs

3. **Test in Browser Console:**
   ```javascript
   console.log(window.location.origin);
   // Should show: https://www.realitigrowth.com (in production)
   ```

---

## 📞 Support

If issues persist after following this guide:

1. **Check Supabase Status:** https://status.supabase.com
2. **Review Supabase Docs:** https://supabase.com/docs/guides/auth
3. **Contact Support:** hi@realitigrowth.com

---

## 🚀 Deployment

After making code changes:

```bash
# Build the project
npm run build

# Deploy to production
vercel --prod
```

---

## ✅ Expected Behavior After Fix

1. **User signs up on production:**
   - Receives email with confirmation link
   - Link points to `https://www.realitigrowth.com/dashboard`
   - Clicking link redirects to production site
   - User is logged in and sees dashboard

2. **User signs up locally:**
   - Receives email with confirmation link
   - Link points to `http://localhost:5173/dashboard`
   - Clicking link redirects to local development
   - User is logged in and sees dashboard

3. **No localhost references in production emails** ✅

---

**Last Updated:** December 2025  
**Status:** ✅ Code Fix Applied - Awaiting Supabase Dashboard Configuration
