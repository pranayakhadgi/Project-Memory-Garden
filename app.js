// ===== CONFIG =====
const BACKEND_URL = "http://localhost:5000";

// Log so we know the script ran
console.log("app.js loaded");

// Wait until DOM is ready (prevents null selectors)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  if (!form || !usernameInput || !passwordInput) {
    console.error("Form or inputs not found. Check class/id names in index.html.");
    return;
  }

  // inline message helper (no alerts)
  function showMessage(msg, ok = true) {
    let el = document.getElementById("login-msg");
    if (!el) {
      el = document.createElement("div");
      el.id = "login-msg";
      el.style.marginTop = "8px";
      el.style.fontWeight = "600";
      form.appendChild(el);
    }
    el.style.color = ok ? "#2d6a4f" : "#b00020";
    el.textContent = msg;
  }

  // prevent double-binding if the script somehow loads twice
  if (form.__bound) return;
  form.__bound = true;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("submit handler fired");

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if (!username || !password) {
      showMessage("Please enter a username and password.", false);
      return;
    }

    const btn = form.querySelector("button[type='submit']");
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Logging in...";

    try {
      console.log("POST", `${BACKEND_URL}/auth/login`, { username, password });
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      console.log("Response status:", res.status);
      const data = await res.json().catch(() => ({}));
      console.log("Response body:", data);

      if (!res.ok) {
        showMessage(data.error || `Login failed (${res.status})`, false);
        return;
      }

      localStorage.setItem("mg_token", data.token);
      localStorage.setItem("mg_user", JSON.stringify(data.user));

      // Differentiate first-time vs returning (after you updated the backend)
      if (data.created) {
        showMessage(`Account created — welcome, ${data.user.username}!`);
      } else {
        showMessage(`Welcome back, ${data.user.username}!`);
      }

      // Optional: redirect after a short pause
      // setTimeout(() => (window.location.href = "garden.html"), 600);
    } catch (err) {
      console.error("Fetch error:", err);
      showMessage("Network error. Is the backend running at http://localhost:5000?", false);
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  });
});
