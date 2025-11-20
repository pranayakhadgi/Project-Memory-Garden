# Vercel Deployment Guide

This guide will help you deploy the Memory Garden project to Vercel and configure the required environment variables.

## Prerequisites

1. **MongoDB Atlas Account** (or MongoDB connection string)
2. **OpenAI API Key**
3. **Vercel Account** (connected to your GitHub)

## Step 1: Get Your MongoDB URI

### If you already have MongoDB Atlas:

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Log in to your account
3. Click on your cluster
4. Click **"Connect"** button
5. Choose **"Connect your application"**
6. Select **"Node.js"** and the latest driver version
7. Copy the connection string
8. Replace `<password>` with your database password
9. Replace `<database>` with your database name (e.g., `memory-garden`)

**Example format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/memory-garden?retryWrites=true&w=majority
```

### If you don't have MongoDB Atlas:

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier is fine)
4. Create a database user:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Save the username and password
5. Whitelist IP addresses:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for Vercel)
6. Get your connection string (follow steps above)

## Step 2: Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. **Important:** Save it immediately - you won't be able to see it again!

## Step 3: Generate JWT Secret

Generate a secure random string for JWT authentication:

```bash
# On macOS/Linux:
openssl rand -base64 32

# Or use Node.js:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Save this value - you'll need it for the `JWT_SECRET` environment variable.

## Step 4: Extract Environment Variables (If you have a local .env file)

If you have a `.env` file locally, run:

```bash
node get-env-vars.js
```

This will display all the environment variables you need to add to Vercel.

## Step 5: Configure Vercel Environment Variables

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

### Required Variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB connection string |
| `JWT_SECRET` | `your-secret-key` | Random secret for JWT tokens |
| `OPENAI_API_KEY` | `sk-...` | Your OpenAI API key |
| `CORS_ORIGIN` | `https://your-project.vercel.app,http://localhost:5500` | Allowed origins (comma-separated) |

### Important Notes:

- **Add variables for all environments**: Production, Preview, and Development
- **For CORS_ORIGIN**: 
  - Add your Vercel deployment URL (e.g., `https://your-project.vercel.app`)
  - You can add multiple URLs separated by commas
  - Include `http://localhost:5500` if you want to test locally

## Step 6: Deploy to Vercel

1. Push your code to GitHub (if not already done)
2. In Vercel, go to your project
3. Click **"Deployments"**
4. Click **"Redeploy"** on the latest deployment (or push a new commit)
5. Wait for deployment to complete

## Step 7: Update CORS_ORIGIN After Deployment

After your first deployment:

1. Note your Vercel deployment URL (e.g., `https://your-project.vercel.app`)
2. Go to **Settings** → **Environment Variables**
3. Update `CORS_ORIGIN` to include your Vercel URL:
   ```
   https://your-project.vercel.app,http://localhost:5500
   ```
4. Redeploy your project

## Troubleshooting

### Error: "FUNCTION_INVOCATION_FAILED"

This usually means:
1. **Missing environment variables** - Check that all required variables are set
2. **Invalid MongoDB URI** - Verify your connection string is correct
3. **Database connection issues** - Check MongoDB Atlas network access settings

### Error: "AI service error"

- Check that `OPENAI_API_KEY` is set correctly
- Verify your OpenAI account has credits
- Check the API key format (should start with `sk-`)

### CORS Errors

- Make sure `CORS_ORIGIN` includes your frontend URL
- Check that the URL format is correct (no trailing slashes)
- Redeploy after updating CORS_ORIGIN

### Database Connection Issues

- Verify MongoDB Atlas IP whitelist includes Vercel's IPs (or allow all)
- Check that database user credentials are correct
- Ensure the database name in the URI matches your actual database

## Quick Reference: Environment Variables

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/memory-garden?retryWrites=true&w=majority
JWT_SECRET=your-generated-secret-key-here
OPENAI_API_KEY=sk-your-openai-api-key-here
CORS_ORIGIN=https://your-project.vercel.app,http://localhost:5500
```

## Need Help?

1. Check Vercel deployment logs in the dashboard
2. Check function logs for specific error messages
3. Verify all environment variables are set correctly
4. Test your MongoDB connection string locally first

