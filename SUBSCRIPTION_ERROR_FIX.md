# 🐛 Subscription Error Fix Guide

## Error: "plan_details.plan_id : should not be empty"

This error means the Plan ID is not being passed to Cashfree correctly.

### Quick Diagnostic Steps:

1. **Check Console Logs**:
   - Open browser console (F12)
   - Refresh the page: `http://localhost:5173/`
   - Look for "=== CASHFREE PLAN IDS CHECK ===" in the console
   - Verify all 6 Plan IDs are displayed (not empty or undefined)

2. **Verify .env File Format**:

Your `.env` file should look EXACTLY like this (no quotes, no spaces around `=`):

```env
VITE_CASHFREE_PLAN_COPY_TRADES_MONTHLY=cmtpm1
VITE_CASHFREE_PLAN_COPY_TRADES_QUARTERLY=cmtpq1
VITE_CASHFREE_PLAN_COPY_TRADES_ANNUAL=cmtpy1
VITE_CASHFREE_PLAN_INDICATOR_MONTHLY=rgipm1
VITE_CASHFREE_PLAN_INDICATOR_QUARTERLY=rgipq1
VITE_CASHFREE_PLAN_INDICATOR_ANNUAL=rgipy1
```

**Common Mistakes**:
- ❌ `VITE_CASHFREE_PLAN_COPY_TRADES_MONTHLY="cmtpm1"` (quotes)
- ❌ `VITE_CASHFREE_PLAN_COPY_TRADES_MONTHLY = cmtpm1` (spaces)
- ❌ `VITE_CASHFREE_PLAN_COPY_TRADES_MONTHLY=` (missing value)

3. **Restart Dev Server**:

After ANY changes to `.env`:
```bash
# Stop the server (Ctrl+C in terminal)
npm run dev
```

## Debug Output Added:

I've added debug logging to help diagnose the issue. When you try to subscribe, you'll see:

```
Debug - Service Name: Copy My Trades Call's Group
Debug - Detected Service Type: copyTrades
Debug - Selected Plan Type: monthly
Debug - Retrieved Plan ID: cmtpm1
```

### If Plan ID shows as empty:

1. **Check the debug output** - What does it say for:
   - Service Name?
   - Detected Service Type?
   - Selected Plan Type?
   - Retrieved Plan ID?

2. **Verify environment variable name**:
   - For `copyTrades` + `monthly` → `VITE_CASHFREE_PLAN_COPY_TRADES_MONTHLY`
   - The variable name is case-sensitive and must match exactly

3. **Check the console startup logs**:
   - Look for "=== CASHFREE PLAN IDS CHECK ==="
   - If values are undefined, the .env file isn't being read

## Manual Test:

1. Open browser console
2. Type:
   ```javascript
   console.log(import.meta.env.VITE_CASHFREE_PLAN_COPY_TRADES_MONTHLY)
   ```
3. Press Enter
4. You should see: `cmtpm1`

If you see `undefined`, the environment variable isn't loaded.

## Possible Solutions:

### Solution 1: Check .env File Location
Ensure `.env` is in the **root directory** of your project:
```
RealitiGrowth-website-main/
├── .env                    ← Should be here!
├── package.json
├── src/
└── ...
```

### Solution 2: Check .env File Encoding
Sometimes encoding issues cause problems:

1. Open `.env` in Notepad (or any text editor)
2. Save As → Encoding: UTF-8 (no BOM)
3. Restart dev server

### Solution 3: Recreate .env File

Delete `.env` and create a new one:

```powershell
# In PowerShell
Remove-Item .env -Force
New-Item .env -ItemType File
```

Then paste this (replace with your actual values):
```env
VITE_SUPABASE_URL=https://lpbaeuopmfxtigxidscd.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_CASHFREE_APP_ID=your_app_id
VITE_CASHFREE_MODE=sandbox
VITE_CASHFREE_PLAN_COPY_TRADES_MONTHLY=cmtpm1
VITE_CASHFREE_PLAN_COPY_TRADES_QUARTERLY=cmtpq1
VITE_CASHFREE_PLAN_COPY_TRADES_ANNUAL=cmtpy1
VITE_CASHFREE_PLAN_INDICATOR_MONTHLY=rgipm1
VITE_CASHFREE_PLAN_INDICATOR_QUARTERLY=rgipq1
VITE_CASHFREE_PLAN_INDICATOR_ANNUAL=rgipy1
VITE_CASHFREE_RETURN_URL=http://localhost:5173/success
```

### Solution 4: Clear Vite Cache

Sometimes Vite caches old environment variables:

```powershell
# Delete node_modules/.vite folder
Remove-Item -Recurse -Force node_modules\.vite

# Restart dev server
npm run dev
```

## Verification Checklist:

- [ ] .env file is in the root directory
- [ ] No quotes around values in .env
- [ ] No spaces around `=` signs
- [ ] All 6 Plan IDs are set
- [ ] Dev server has been restarted
- [ ] Console shows Plan IDs on startup
- [ ] /env-check page shows all green

## Still Not Working?

If none of the above works:

1. Take a screenshot of:
   - Your console showing the startup logs
   - Your .env file (hide sensitive keys)
   - The error message

2. Check if other environment variables work:
   ```javascript
   console.log(import.meta.env.VITE_SUPABASE_URL)
   ```
   If this also shows undefined, Vite isn't reading .env at all.

3. Try setting a test variable:
   ```env
   VITE_TEST=hello
   ```
   Then check:
   ```javascript
   console.log(import.meta.env.VITE_TEST)
   ```
   If you see "hello", then env vars work and it's just a matter of fixing the Plan ID variables.

---

**Next Step**: Refresh your browser and check the console for the debug output!
