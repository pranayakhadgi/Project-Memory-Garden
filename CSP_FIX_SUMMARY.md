# Content Security Policy (CSP) Fix Summary

## Issues Fixed

### 1. Content-Security-Policy Errors
**Problem:** Vercel was blocking inline scripts and images due to strict CSP headers.

**Solution:** Updated `vercel.json` to include proper CSP headers that allow:
- Inline scripts (`'unsafe-inline'`)
- Inline styles (`'unsafe-inline'`)
- External CDN scripts (Chart.js from cdn.jsdelivr.net)
- Images from various sources
- API connections to the same origin

### 2. Backend URL Configuration
**Problem:** All HTML files had hardcoded `http://localhost:5000` which wouldn't work on Vercel.

**Solution:** 
- Created `config.js` that automatically detects if running on Vercel or locally
- Updated all HTML files to include `config.js` and use `window.BACKEND_URL`
- On Vercel, the backend URL automatically uses the same origin (since API is on same domain)

### 3. Static File Serving
**Problem:** Vercel wasn't properly serving HTML, CSS, and JS files.

**Solution:**
- Updated `src/app.js` to serve static files from the root directory
- Configured `vercel.json` routes to handle both API calls and static files

## Files Modified

1. **vercel.json** - Added CSP headers and proper routing
2. **config.js** - NEW: Dynamic backend URL configuration
3. **src/app.js** - Enabled static file serving
4. **index.html** - Added config.js and updated BACKEND_URL
5. **home.html** - Added config.js
6. **confession.html** - Added config.js and updated BACKEND
7. **mood_progression.html** - Added config.js and updated BACKEND_URL
8. **home.js** - Updated to use window.BACKEND_URL
9. **app.js** - Updated to use window.BACKEND_URL

## How It Works

### Local Development
- `config.js` detects `http://` protocol or `localhost` hostname
- Uses `http://localhost:5000` as backend URL
- Frontend runs on port 5500, backend on port 5000

### Vercel Production
- `config.js` detects `https://` protocol or `vercel.app`/`vercel.dev` hostname
- Uses `window.location.origin` (same domain) as backend URL
- Both frontend and API are served from the same Vercel deployment

## CSP Headers Applied

```
Content-Security-Policy: default-src 'self'; 
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; 
  style-src 'self' 'unsafe-inline'; 
  img-src 'self' data: https: blob:; 
  font-src 'self' https://cdn.jsdelivr.net data:; 
  connect-src 'self' https:; 
  frame-ancestors 'none'; 
  base-uri 'self'; 
  form-action 'self';
```

## Next Steps

1. **Commit and push** these changes to your GitHub repository
2. **Redeploy on Vercel** - the deployment should now work without CSP errors
3. **Verify** that:
   - HTML pages load correctly
   - Inline scripts execute
   - Images display properly
   - API calls work (check browser console)
   - No CSP errors in browser console

## Testing

After deployment, check:
- ✅ No CSP errors in browser console
- ✅ All pages load (index.html, home.html, confession.html, mood_progression.html)
- ✅ Login/signup functionality works
- ✅ API calls succeed (check Network tab)
- ✅ Images and styles load correctly

## Troubleshooting

If you still see CSP errors:
1. Check browser console for specific CSP violations
2. Verify `config.js` is loading (check Network tab)
3. Ensure all environment variables are set in Vercel
4. Check that `vercel.json` is in the root directory
5. Verify the deployment logs in Vercel dashboard

