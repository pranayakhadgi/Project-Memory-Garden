// server.js
import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db.js";

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
  } catch (e) {
    console.log("⚠️  Continuing without database connection...");
  }

  app.listen(PORT, () => {
    console.log(`🚀 API on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
  });
})();
