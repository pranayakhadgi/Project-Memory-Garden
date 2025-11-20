# Fixing CSP "default-src 'none'" Error on Vercel

## The Problem

If you're seeing `Content-Security-Policy: default-src 'none'` errors, Vercel might be applying security headers at the project level that override your application headers.

## Solution: Check Vercel Project Settings

### Step 1: Go to Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: **Project-Memory-Garden**

### Step 2: Check Security Headers Settings
1. Go to **Settings** → **Security**
2. Look for **"Security Headers"** or **"Content Security Policy"** section
3. Check if there are any default security headers enabled

### Step 3: Disable or Override Default Headers
If you see security headers enabled:
1. **Option A**: Disable them if they're blocking your app
2. **Option B**: Override them with your custom CSP

### Step 4: Alternative - Use Vercel's Headers Configuration
If the dashboard doesn't have security settings, the headers in `vercel.json` should work. Make sure:
- Your `vercel.json` has the headers configuration (already added)
- The deployment is using the latest version

## Current Configuration

We've set CSP headers in three places:
1. **vercel.json** - Headers configuration for all routes
2. **Express middleware** - Headers set in `src/app.js` 
3. **HTML meta tags** - Fallback in all HTML files

## Testing After Fix

1. **Clear browser cache** or use incognito mode
2. **Check response headers** in browser DevTools:
   - Open DevTools → Network tab
   - Reload page
   - Click on the HTML file request
   - Check "Response Headers" for `Content-Security-Policy`
   - It should show our policy, not `default-src 'none'`

## If Still Not Working

If the error persists after checking Vercel settings:

1. **Check Vercel Deployment Logs**:
   - Go to your deployment in Vercel dashboard
   - Check "Functions" tab to see if there are any errors
   - Check "Logs" to see what headers are being set

2. **Verify Environment Variables**:
   - Make sure all required env vars are set
   - Check that `CORS_ORIGIN` includes your Vercel URL

3. **Try a Different Approach**:
   - We might need to use Vercel's Edge Middleware
   - Or configure headers at the Vercel project level

## Contact Vercel Support

If none of the above works, the issue might be:
- Vercel applying headers at the edge/CDN level
- A Vercel account/plan limitation
- A bug in Vercel's header configuration

In this case, contact Vercel support with:
- Your project URL
- The error messages you're seeing
- Screenshots of your `vercel.json` configuration

