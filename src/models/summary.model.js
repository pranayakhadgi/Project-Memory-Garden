// src/models/summary.model.js
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "assistant", "system"], required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const SummarySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mood: { type: String, enum: ["sad", "neutral", "happy"], default: "neutral" },
    seed: { type: String, default: "" },
    summary: { type: String, required: true },   // AI-generated summary text
    transcript: { type: [MessageSchema], default: [] }, // raw chat history you sent
  },
  { timestamps: true }
);

export default mongoose.model("Summary", SummarySchema);
