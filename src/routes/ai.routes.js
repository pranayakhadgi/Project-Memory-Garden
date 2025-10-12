// src/routes/ai.routes.js
import { Router } from "express";
import OpenAI from "openai";
import Entry from "../models/entry.js"; // file must exist & path correct

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.get("/ping", (_req, res) => res.json({ pong: true }));

router.post("/coach", async (req, res) => {
  try {
    const { mood = "neutral", message = "", history = [] } = req.body || {};
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a supportive mental-health coach." },
        ...history,
        { role: "user", content: `Mood: ${mood}\nMessage: ${message}` },
      ],
      temperature: 0.7,
      max_tokens: 350,
    });
    const text = completion?.choices?.[0]?.message?.content?.trim() || "I’m here.";
    res.json({ text });
  } catch (err) {
    console.error("AI /coach error:", err);
    res.status(500).json({ error: "AI service error" });
  }
});

router.post("/summarize", async (req, res) => {
  try {
    const { title = "Untitled Session", mood = "neutral", history = [] } = req.body || {};
    const transcript = history.map(t => `${t.role === "user" ? "User" : "Guide"}: ${t.content}`).join("\n");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize the mental-health chat in 4–6 bullets: key feelings, triggers, coping ideas, and a gentle next step." },
        { role: "user", content: `Mood: ${mood}\n\nTranscript:\n${transcript}` },
      ],
      temperature: 0.4,
      max_tokens: 300,
    });

    const summary = completion?.choices?.[0]?.message?.content?.trim() || "No summary.";
    const userId = req.user?.id || "anon"; // replace with real auth if you have it

    const saved = await Entry.create({
      userId,
      kind: "summary",
      title,
      mood,
      content: summary,
      createdAt: new Date(),
    });

    res.json({ summary, id: saved._id });
  } catch (err) {
    console.error("AI /summarize error:", err);
    res.status(500).json({ error: "AI service error" });
  }
});

export default router; // <-- default export
