import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:     { type: String, required: true, unique: true, trim: true },
  // New: optional but unique when present
  email:        { type: String, unique: true, sparse: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

// (Optional) If you want an explicit partial index instead of 'sparse':
// userSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { email: { $type: "string" } } });

export const User = mongoose.model("User", userSchema);
