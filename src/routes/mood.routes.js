// src/routes/mood.routes.js
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Mock JWT verification function
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.sub };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Generate dummy mood data
function generateMoodData(days = 7) {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      mood: Math.floor(Math.random() * 11) // 0-10 scale
    });
  }
  
  return data.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// GET /api/mood-history
router.get("/mood-history", verifyToken, (req, res) => {
  const { userId, days = 7 } = req.query;
  
  console.log(`📊 Mood history requested for user: ${userId}, days: ${days}`);
  
  const moodData = generateMoodData(parseInt(days));
  
  res.json(moodData);
});

// GET /api/mood-stats
router.get("/mood-stats", verifyToken, (req, res) => {
  const { userId } = req.query;
  
  console.log(`📈 Mood stats requested for user: ${userId}`);
  
  const moodData = generateMoodData(30); // Last 30 days
  const moods = moodData.map(d => d.mood);
  
  const stats = {
    average: Math.round((moods.reduce((a, b) => a + b, 0) / moods.length) * 10) / 10,
    highest: Math.max(...moods),
    lowest: Math.min(...moods),
    totalEntries: moodData.length,
    trend: moods.length > 1 ? 
      (moods[moods.length - 1] > moods[0] ? 'improving' : 
       moods[moods.length - 1] < moods[0] ? 'declining' : 'stable') : 'stable'
  };
  
  res.json(stats);
});

export default router;