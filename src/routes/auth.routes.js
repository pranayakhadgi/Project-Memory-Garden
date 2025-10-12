import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = Router();

// Signup expects username + email + password
const signupSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6).max(128),
});

// Login accepts identifier (username OR email) + password
const loginSchema = z.object({
  identifier: z.string().min(3).max(200), // username or email
  password: z.string().min(6).max(128),
});

/**
 * POST /auth/signup
 */
router.post("/signup", async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid payload" });
    const { username, email, password } = parsed.data;

    // Check for existing username OR email (email compared in lowercase)
    const conflict = await User.findOne({ $or: [{ username }, { email: email.toLowerCase() }] });
    if (conflict) return res.status(409).json({ error: "Username or email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email: email.toLowerCase(), passwordHash });

    // You can issue a token here, but your UX now goes back to login, so token isn't needed
    const token = jwt.sign(
      { sub: user._id.toString(), username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      created: true,
      message: "Account created",
      token, // client can ignore this if you prefer
      user: { id: user._id, username: user.username, email: user.email, createdAt: user.createdAt },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /auth/me
 * Verify token and return user info
 */
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.sub);
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json({
      user: { id: user._id, username: user.username, email: user.email, createdAt: user.createdAt }
    });
  } catch (e) {
    console.error(e);
    return res.status(401).json({ error: "Invalid token" });
  }
});

/**
 * POST /auth/login
 * identifier can be username OR email
 */
router.post("/login", async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid payload" });
    const { identifier, password } = parsed.data;

    const query = identifier.includes("@")
      ? { email: identifier.toLowerCase() }
      : { username: identifier };

    const user = await User.findOne(query);
    if (!user) return res.status(404).json({ error: "User not found" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid username/email or password" });

    const token = jwt.sign(
      { sub: user._id.toString(), username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      created: false,
      message: "Logged in",
      token,
      // We return username (for Welcome page) and email (optional use)
      user: { id: user._id, username: user.username, email: user.email, createdAt: user.createdAt },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
