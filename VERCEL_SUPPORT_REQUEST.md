# Vercel Support Request Template

## Issue Summary
Content-Security-Policy header `default-src 'none'` is being applied at the edge/CDN level, blocking all resources including inline scripts and images. This cannot be overridden through code or dashboard settings.

## Project Details
- **Project Name**: Project-Memory-Garden
- **Project URL**: https://project-memory-garden.vercel.app
- **Repository**: https://github.com/pranayakhadgi/Project-Memory-Garden
- **Vercel Account**: pranayas-projects-110992b8

## Error Messages
```
Content-Security-Policy: The page's settings blocked an inline script (script-src-elem) from being executed because it violates the following directive: "default-src 'none'".

Content-Security-Policy: The page's settings blocked the loading of a resource (img-src) at https://project-memory-garden-9wz3dau3a-pranayas-projects-110992b8.vercel.app/favicon.ico because it violates the following directive: "default-src 'none'"
```

## What We've Tried

### 1. Code-Level Solutions
- ✅ Set CSP headers in `vercel.json` configuration
- ✅ Set CSP headers in Express middleware (first middleware, before static files)
- ✅ Added CSP meta tags to all HTML files
- ✅ Attempted to remove existing headers before setting new ones
- ✅ Verified headers are being set (check `/debug-headers` endpoint)

### 2. Dashboard Settings
- ✅ Checked Security settings in Vercel dashboard
- ❌ No option to configure or disable Content-Security-Policy headers
- Security section only shows:
  - Build Logs and Source Protection
  - Git Fork Protection
  - Secure Backend Access with OIDC Federation
  - Deployment Retention Policy

### 3. Configuration Files
Our `vercel.json` includes:
```json
{
  "headers": [
    {
      "source": "/(.*\\.html)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' https://cdn.jsdelivr.net data:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
        }
      ]
    }
  ]
}
```

## Request
Please help us:
1. **Disable** the default `default-src 'none'` CSP header being applied at the edge level, OR
2. **Override** it with our custom CSP policy defined in `vercel.json`, OR
3. **Provide guidance** on how to configure CSP headers for Express.js applications on Vercel

## Debug Information
- Visit `/debug-headers` endpoint to see what headers our Express app is setting
- Check Network tab in browser DevTools to see actual response headers
- Build logs show no errors, deployment completes successfully

## Expected Behavior
The application should load with our custom CSP policy that allows:
- Inline scripts (`'unsafe-inline'`)
- Inline styles (`'unsafe-inline'`)
- Images from various sources
- External CDN scripts (Chart.js from cdn.jsdelivr.net)
- API connections to the same origin

## Current Behavior
All resources are blocked due to `default-src 'none'` being applied at the edge level, preventing the application from functioning.

---

**Contact Vercel Support**: https://vercel.com/support

