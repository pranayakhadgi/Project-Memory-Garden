import { Router } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/User.js";
import { Flower } from "../models/Flower.js";

const router = Router();

// Simple token verification middleware
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.sub;
    next();
  } catch (e) {
    console.error("Token verification error:", e);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// GET /api/flowers - Get all flowers for a user
router.get("/", verifyToken, async (req, res) => {
  try {
    const userFlowers = await Flower.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .lean();
    
    console.log(`🌸 Loaded ${userFlowers.length} flowers for user: ${req.userId}`);
    res.json(userFlowers);
  } catch (e) {
    console.error("Get flowers error:", e);
    res.status(500).json({ error: "Failed to fetch flowers" });
  }
});

// POST /api/flowers/save - Save a new flower
router.post("/save", verifyToken, async (req, res) => {
  try {
    const { mood, title, content, summary } = req.body;
    
    if (!mood || !title || !content || !summary) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate unique entry ID
    const entryId = new mongoose.Types.ObjectId();
    
    // Map mood to flower type
    const moodToFlower = {
      'extremely_sad': 'wilted',
      'sad': 'tulip', 
      'neutral': 'rose',
      'slightly_happy': 'daisy',
      'very_happy': 'sunflower'
    };
    
    // Map mood to color
    const moodColors = {
      'extremely_sad': '#8B0000',
      'sad': '#4682B4', 
      'neutral': '#F5A9B8',
      'slightly_happy': '#98FB98',
      'very_happy': '#FFD700'
    };

    const newFlower = new Flower({
      userId: req.userId,
      entryId: entryId,
      mood,
      flowerType: moodToFlower[mood] || 'rose',
      color: moodColors[mood] || '#F5A9B8',
      position: {
        x: Math.random() * 80 + 10, // Random position for display
        y: Math.random() * 60 + 20
      },
      title,
      content,
      summary
    });

    await newFlower.save();
    
    console.log(`🌸 New flower saved: ${title} (${mood}) - ${newFlower.flowerType}`);
    
    res.status(201).json({ 
      success: true, 
      flower: newFlower,
      message: "Flower saved successfully" 
    });
  } catch (e) {
    console.error("Save flower error:", e);
    res.status(500).json({ error: "Failed to save flower" });
  }
});

export default router;
