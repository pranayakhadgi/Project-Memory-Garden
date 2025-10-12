// home.js (auth guard + optional token check)
const BACKEND_URL = "http://localhost:5000"; // set "" if serving via Express static

const token = localStorage.getItem("mg_token");
const user  = JSON.parse(localStorage.getItem("mg_user") || "null");

if (!token || !user) {
  window.location.href = "index.html";
}

// Optional: verify token still valid with /me
(async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.status === 401) {
      localStorage.removeItem("mg_token");
      localStorage.removeItem("mg_user");
      window.location.href = "index.html";
    }
  } catch (_) {
    // API offline? keep page usable; skip hard fail
  }
})();
