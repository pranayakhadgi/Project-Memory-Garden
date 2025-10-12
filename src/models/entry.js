// src/models/Entry.js
import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema({
  userId:   { type: String, required: true },
  kind:     { type: String, default: "summary" },
  title:    { type: String },
  mood:     { type: String },
  content:  { type: String },
  createdAt:{ type: Date, default: Date.now },
});

export default mongoose.models.Entry || mongoose.model("Entry", EntrySchema);
