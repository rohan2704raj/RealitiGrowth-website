# CORS Error Fix Guide - "Failed to Fetch" on Login/Signup

## 🔴 Error Description

**Error Message:**
```
Access to fetch at 'https://[project].supabase.co/auth/v1/...' from origin 'https://www.realitigrowth.com' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**What This Means:**
Supabase is blocking requests from your production domain because it's not configured as an allowed origin.

---

## ✅ Complete Fix (Step-by-Step)

### **Step 1: Update Supabase Site URL** ⭐ CRITICAL

1. **Go to Supabase Dashboard:**
   - Visit: https://app.supabase.com
   - Login with your account
   - Select your **RealitiGrowth** project

2. **Navigate to Authentication Settings:**
   - Click **Authentication** in the left sidebar
   - Click **URL Configuration** tab

3. **Update Site URL:**
   ```
   Site URL: https://www.realitigrowth.com
   ```
   ⚠️ **Important:** 
   - Remove `http://localhost:5173` if it's there
   - Use your production domain
   - Include `https://` protocol
   - Do NOT include trailing slash

4. **Click Save** ✅

---

### **Step 2: Add Redirect URLs**

In the same **URL Configuration** section:

1. **Find:** "Redirect URLs" section
2. **Click:** "Add URL" for each of these:

```
https://www.realitigrowth.com
https://www.realitigrowth.com/**
https://realitigrowth.com
https://realitigrowth.com/**
https://realitigrowth-website-*.vercel.app/**
http://localhost:5173/**
```

3. **Click Save** ✅

---

### **Step 3: Configure Additional Allowed Origins**

1. **Go to:** Settings → API (in left sidebar)

2. **Scroll to:** "Additional Allowed Origins" or "CORS Settings"

3. **Add these origins:**
   ```
   https://www.realitigrowth.com
   https://realitigrowth.com
   ```

4. **Click Save** ✅

---

### **Step 4: Verify Vercel Environment Variables**

Make sure these are set in **Vercel Dashboard:**

1. **Go to:** https://vercel.com/dashboard
2. **Select:** Your RealitiGrowth project
3. **Go to:** Settings → Environment Variables

**Required Variables:**
```
VITE_SUPABASE_URL=https://[your-project].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
VITE_CASHFREE_APP_ID=[your-cashfree-id]
VITE_CASHFREE_MODE=production
VITE_BREVO_API_KEY=[your-brevo-key]
```

**Set for:**
- ✅ Production
- ✅ Preview
- ✅ Development

---

### **Step 5: Redeploy Application**

After making Supabase changes:

1. **Go to Vercel Dashboard**
2. **Click:** "Deployments" tab
3. **Click:** "Redeploy" on latest deployment
4. **Or run locally:**
   ```bash
   vercel --prod
   ```

---

## 🔍 Verification Steps

### **1. Check Supabase Configuration**

**Site URL should be:**
```
https://www.realitigrowth.com
```

**Redirect URLs should include:**
- ✅ https://www.realitigrowth.com
- ✅ https://www.realitigrowth.com/**
- ✅ https://realitigrowth.com
- ✅ https://realitigrowth.com/**

### **2. Test Authentication**

1. **Open:** https://www.realitigrowth.com
2. **Try to:** Sign up with a new email
3. **Expected:** No CORS error, signup succeeds
4. **Try to:** Login with existing credentials
5. **Expected:** No CORS error, login succeeds

### **3. Check Browser Console**

1. **Open:** Developer Tools (F12)
2. **Go to:** Console tab
3. **Try:** Login/Signup
4. **Expected:** No CORS errors
5. **Should see:** Successful authentication logs

---

## 🚨 Common Issues & Solutions

### **Issue 1: Still Getting CORS Error**

**Solution:**
1. Clear browser cache (Ctrl + Shift + Delete)
2. Try incognito/private mode
3. Wait 5 minutes for Supabase changes to propagate
4. Redeploy on Vercel

### **Issue 2: "Invalid API Key" Error**

**Solution:**
1. Check Vercel environment variables
2. Make sure `VITE_SUPABASE_ANON_KEY` is set correctly
3. Get the key from Supabase Dashboard → Settings → API
4. Redeploy after updating

### **Issue 3: Localhost Works, Production Doesn't**

**Solution:**
1. Site URL is probably set to `http://localhost:5173`
2. Change it to `https://www.realitigrowth.com`
3. Keep localhost in Redirect URLs for development

### **Issue 4: "Email Not Confirmed" Error**

**Solution:**
1. Go to: Authentication → Settings
2. Find: "Enable email confirmations"
3. Turn it **OFF**
4. Users can login immediately without email verification

---

## 📋 Supabase Configuration Checklist

- [ ] Site URL set to `https://www.realitigrowth.com`
- [ ] Redirect URLs include production domain
- [ ] Redirect URLs include Vercel preview domains
- [ ] Additional allowed origins configured
- [ ] Email confirmation disabled (optional)
- [ ] Environment variables set in Vercel
- [ ] Application redeployed after changes

---

## 🔧 Quick Fix Commands

If you need to redeploy:

```bash
# Build locally
npm run build

# Deploy to production
vercel --prod
```

---

## 📞 Where to Find Supabase Credentials

### **Supabase URL:**
1. Go to: https://app.supabase.com
2. Select your project
3. Go to: Settings → API
4. Copy: "Project URL"
5. Format: `https://[project-id].supabase.co`

### **Anon Key:**
1. Same page: Settings → API
2. Copy: "anon public" key
3. This is safe to use in frontend

---

## ✅ Expected Behavior After Fix

### **Signup Flow:**
1. User enters email, password, details
2. Click "Continue to Payment"
3. ✅ Account created successfully
4. ✅ No CORS errors
5. ✅ Redirected to payment page

### **Login Flow:**
1. User enters email, password
2. Click "Login"
3. ✅ Login successful
4. ✅ No CORS errors
5. ✅ Redirected to dashboard

---

## 🎯 Testing Checklist

After applying fixes, test:

- [ ] Signup with new email
- [ ] Login with existing account
- [ ] Logout
- [ ] Password reset (if implemented)
- [ ] Magic link login (if implemented)
- [ ] Test on mobile device
- [ ] Test in incognito mode
- [ ] Test on different browser

---

## 📊 Debugging Tools

### **Browser Console:**
```javascript
// Check if Supabase is initialized
console.log(supabase)

// Check current user
supabase.auth.getUser().then(console.log)

// Check session
supabase.auth.getSession().then(console.log)
```

### **Network Tab:**
1. Open DevTools (F12)
2. Go to Network tab
3. Try login/signup
4. Look for failed requests
5. Check response headers for CORS info

---

## 🔄 Propagation Time

After making changes in Supabase:
- **Immediate:** Most changes take effect right away
- **Cache:** May need to clear browser cache
- **CDN:** Vercel CDN may cache for 1-5 minutes
- **DNS:** Domain changes can take up to 24 hours

**Recommendation:** Wait 5 minutes, then test in incognito mode

---

## 💡 Prevention Tips

1. **Always set Site URL to production domain**
2. **Keep localhost in Redirect URLs for development**
3. **Test in production before launch**
4. **Monitor Supabase logs for auth errors**
5. **Keep environment variables in sync**

---

## 🎉 Success Indicators

You'll know it's fixed when:
- ✅ No CORS errors in console
- ✅ Signup completes successfully
- ✅ Login works without errors
- ✅ User is redirected properly
- ✅ Session persists across page refreshes

---

**Last Updated:** December 2025  
**Status:** ⚠️ Requires Supabase Dashboard Configuration

## 🚀 Quick Summary

**The Fix:**
1. Go to Supabase Dashboard
2. Set Site URL to `https://www.realitigrowth.com`
3. Add production URLs to Redirect URLs
4. Save changes
5. Wait 5 minutes
6. Test in incognito mode

**That's it!** 🎉
