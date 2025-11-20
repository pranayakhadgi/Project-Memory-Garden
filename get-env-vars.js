#!/usr/bin/env node
/**
 * Script to extract environment variables from .env file
 * Run: node get-env-vars.js
 * This will help you copy the values to Vercel's environment variables
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const envPath = join(__dirname, ".env");
  const envContent = readFileSync(envPath, "utf-8");
  
  console.log("\n📋 Environment Variables for Vercel:\n");
  console.log("=" .repeat(60));
  
  const requiredVars = [
    "MONGODB_URI",
    "JWT_SECRET",
    "OPENAI_API_KEY",
    "CORS_ORIGIN"
  ];
  
  const envVars = {};
  envContent.split("\n").forEach((line) => {
    line = line.trim();
    if (line && !line.startsWith("#")) {
      const [key, ...valueParts] = line.split("=");
      if (key && valueParts.length > 0) {
        const value = valueParts.join("=").trim();
        // Remove quotes if present
        const cleanValue = value.replace(/^["']|["']$/g, "");
        envVars[key.trim()] = cleanValue;
      }
    }
  });
  
  requiredVars.forEach((varName) => {
    const value = envVars[varName];
    if (value) {
      console.log(`\n✅ ${varName}:`);
      console.log(`   ${value}`);
    } else {
      console.log(`\n⚠️  ${varName}: NOT FOUND`);
    }
  });
  
  console.log("\n" + "=".repeat(60));
  console.log("\n📝 Instructions:");
  console.log("1. Go to your Vercel project dashboard");
  console.log("2. Navigate to Settings > Environment Variables");
  console.log("3. Add each variable above with its value");
  console.log("4. Make sure to add them for Production, Preview, and Development");
  console.log("\n💡 Tip: For CORS_ORIGIN, add your Vercel deployment URL");
  console.log("   Example: https://your-project.vercel.app\n");
  
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("❌ .env file not found!");
    console.log("\n📝 Create a .env file with the following variables:\n");
    console.log("MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database");
    console.log("JWT_SECRET=your-secret-key-here");
    console.log("OPENAI_API_KEY=sk-your-api-key-here");
    console.log("CORS_ORIGIN=https://your-project.vercel.app,http://localhost:5500");
    console.log("\nThen run this script again.\n");
  } else {
    console.error("Error reading .env file:", error.message);
  }
  process.exit(1);
}

