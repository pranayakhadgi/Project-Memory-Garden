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
 * Middleware
 */
app.use(
  cors({
    // Allow both localhost and 127.0.0.1 for Live Server compatibility
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    credentials: false,
  })
);
app.use(express.json());

// (Optional) serve static files if you want to host the frontend from Express
// app.use(express.static("public"));

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

export default app;
