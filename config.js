// config.js - Dynamic backend URL configuration
// Automatically detects if running on Vercel or locally

(function() {
  // Detect if we're on Vercel (production) or local
  const isVercel = window.location.hostname.includes('vercel.app') || 
                   window.location.hostname.includes('vercel.dev') ||
                   window.location.protocol === 'https:';
  
  // Set backend URL based on environment
  const BACKEND_URL = isVercel 
    ? window.location.origin  // Use same origin on Vercel (API is on same domain)
    : 'http://localhost:5000'; // Local development
  
  // Make it globally available
  window.BACKEND_URL = BACKEND_URL;
  window.API_BASE = BACKEND_URL;
  
  console.log('🌱 Backend URL configured:', BACKEND_URL);
})();

