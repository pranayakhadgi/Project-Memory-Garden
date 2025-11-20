// src/app.js
import express from "express";
import cors from "cors";

// ✅ Import your route modules (make sure these files exist)
import authRoutes from "./routes/auth.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import moodRoutes from "./routes/mood.routes.js";
import flowersRoutes from "./routes/flowers.routes.js";
// If you have entries or other routes, import them too:
// import entryRoutes from "./routes/entries.routes.js";

const app = express();

/**
 * Middleware - Set security headers FIRST, before anything else
 * IMPORTANT: This must run before static file serving
 */
app.use((req, res, next) => {
  // Set CSP for all non-API routes (HTML, CSS, JS files)
  const isApiRoute = req.path.startsWith('/api/') || 
                     req.path.startsWith('/auth/') || 
                     req.path.startsWith('/ai/') ||
                     req.path === '/health' ||
                     req.path === '/debug-headers';
  
  if (!isApiRoute) {
    // CRITICAL: Remove any existing CSP header first, then set our own
    // This ensures we override Vercel's default 'default-src none'
    const existingHeaders = res.getHeaders();
    if (existingHeaders['content-security-policy']) {
      res.removeHeader('content-security-policy');
    }
    if (existingHeaders['Content-Security-Policy']) {
      res.removeHeader('Content-Security-Policy');
    }
    
    // Set our permissive CSP header
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' https://cdn.jsdelivr.net data:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
    );
  }
  
  // Set other security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  next();
});

app.use(
  cors({
    // Allow both localhost and Vercel deployment URLs
    origin: process.env.CORS_ORIGIN 
      ? process.env.CORS_ORIGIN.split(",").map(url => url.trim())
      : ["http://localhost:5500", "http://127.0.0.1:5500", /\.vercel\.app$/, /\.vercel\.dev$/],
    credentials: false,
  })
);
app.use(express.json());

// Serve static files (HTML, CSS, JS, images, etc.) from root directory
// This allows Vercel to serve frontend files through the Express app
app.use(express.static(process.cwd(), {
  index: ['index.html'],
  extensions: ['html', 'css', 'js', 'ico', 'png', 'jpg', 'jpeg', 'gif', 'svg']
}));

/**
 * Routes
 */
app.use("/auth", authRoutes);
app.use("/ai", aiRoutes);
app.use("/api", moodRoutes);
app.use("/api/flowers", flowersRoutes);
// app.use("/entries", entryRoutes);

/**
 * Health check
 */
app.get("/health", (_req, res) => res.json({ ok: true }));

/**
 * Debug endpoint to check headers
 */
app.get("/debug-headers", (_req, res) => {
  res.json({
    csp: res.getHeader('Content-Security-Policy'),
    allHeaders: res.getHeaders(),
    requestHeaders: _req.headers
  });
});

export default app;
