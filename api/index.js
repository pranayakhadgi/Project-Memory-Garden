// Vercel serverless function entry point
import "dotenv/config";
import app from "../src/app.js";
import { connectDB } from "../src/db.js";

// Connect to database
if (process.env.MONGODB_URI) {
  connectDB(process.env.MONGODB_URI).catch((e) => {
    console.error("Database connection error:", e);
  });
}

// Export the Express app as a serverless function
export default app;

