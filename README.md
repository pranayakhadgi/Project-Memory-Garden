# Memory Garden 🌱

A therapeutic web application that combines journaling with AI-powered emotional coaching. Users can express their thoughts and feelings through a beautiful, plant-themed interface while receiving supportive guidance from an AI coach.

## Features

- **User Authentication**: Secure signup and login system
- **AI-Powered Coaching**: Get supportive responses from an AI coach based on your mood and messages
- **Session Summaries**: Automatic conversation summaries saved to your personal garden
- **Beautiful UI**: Plant-themed interface with calming colors and animations
- **Mood Tracking**: Express and track your emotional state
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **OpenAI API** for AI coaching
- **bcrypt** for password hashing
- **CORS** enabled for cross-origin requests

### Frontend
- **Vanilla JavaScript** (no frameworks)
- **HTML5** with semantic markup
- **CSS3** with modern styling
- **Local Storage** for session management

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Either:
  - MongoDB Atlas (cloud) - [Sign up here](https://www.mongodb.com/atlas)
  - MongoDB Community Server (local) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd HackMidwest
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/memory-garden?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# CORS Configuration (for development)
CORS_ORIGIN=http://localhost:5500,http://127.0.0.1:5500
```

### 4. Get Required API Keys

#### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the key and paste it in your `.env` file

#### MongoDB Database
**Option A: MongoDB Atlas (Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string and update `MONGODB_URI` in `.env`

**Option B: Local MongoDB**
1. Install MongoDB Community Server
2. Start MongoDB service
3. Use `MONGODB_URI=mongodb://localhost:27017/memory-garden`

### 5. Start the Application

#### Start Backend Server
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

#### Start Frontend Server
You can use any static file server. Here are a few options:

**Option A: Live Server (VS Code Extension)**
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"

**Option B: Python HTTP Server**
```bash
# Python 3
python -m http.server 5500

# Python 2
python -m SimpleHTTPServer 5500
```

**Option C: Node.js HTTP Server**
```bash
npx http-server -p 5500
```

The frontend will be available at `http://localhost:5500`

## Usage

1. **Open your browser** and navigate to `http://localhost:5500`
2. **Create an account** or **login** with existing credentials
3. **Start journaling** by clicking on the confession page
4. **Express your feelings** and get AI-powered coaching responses
5. **View your session summaries** in your personal garden

## Project Structure

```
HackMidwest/
├── src/                    # Backend source code
│   ├── app.js             # Express app configuration
│   ├── server.js          # Server entry point
│   ├── db.js              # Database connection
│   ├── models/            # Database models
│   │   ├── User.js        # User model
│   │   ├── entry.js       # Entry model
│   │   └── summary.model.js
│   ├── routes/            # API routes
│   │   ├── auth.routes.js # Authentication routes
│   │   └── ai.routes.js   # AI coaching routes
│   └── middleware/        # Custom middleware
│       └── auth.js        # Auth middleware
├── public/                # Frontend files
│   ├── index.html         # Login/Signup page
│   ├── home.html          # Main dashboard
│   ├── confession.html    # Journaling interface
│   ├── mood_progression.html
│   ├── app.js             # Frontend JavaScript
│   ├── home.js            # Home page logic
│   └── styles.css         # Styling
├── .env                   # Environment variables
├── .env.example           # Environment template
├── package.json           # Dependencies
└── README.md              # This file
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user info

### AI Coaching
- `POST /ai/coach` - Get AI coaching response
- `POST /ai/summarize` - Generate session summary

### Health Check
- `GET /health` - Server health status

## Troubleshooting

### Common Issues

#### 1. "AI Service error" or 500 errors
- **Check OpenAI API key**: Ensure it's valid and has credits
- **Check console logs**: Look for specific error messages
- **Verify API key format**: Should start with `sk-`

#### 2. CORS errors
- **Check CORS_ORIGIN**: Ensure your frontend URL is included
- **Verify port numbers**: Make sure frontend and backend ports match
- **Check browser console**: Look for CORS error messages

#### 3. Database connection issues
- **Check MongoDB URI**: Ensure connection string is correct
- **Verify network access**: For Atlas, check IP whitelist
- **Check credentials**: Ensure username/password are correct

#### 4. Authentication issues
- **Check JWT_SECRET**: Ensure it's set and consistent
- **Clear browser storage**: Clear localStorage if having login issues
- **Check token expiration**: Tokens expire after 7 days

#### 5. Port conflicts
- **Check if port 5000 is in use**: `lsof -ti:5000`
- **Kill existing processes**: `kill -9 $(lsof -ti:5000)`
- **Change port**: Update PORT in `.env` file

### Debug Mode

To enable debug logging:

```bash
NODE_ENV=development npm run dev
```

### Reset Database

To clear all data:

```bash
# Connect to MongoDB and drop database
mongo
use memory-garden
db.dropDatabase()
```

## Development

### Adding New Features

1. **Backend**: Add routes in `src/routes/`
2. **Frontend**: Add pages and update `app.js`
3. **Database**: Create models in `src/models/`

### Code Style

- Use ES6+ features
- Follow async/await pattern
- Add error handling to all routes
- Use meaningful variable names

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Look at the console logs for error messages
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed

## Acknowledgments

- OpenAI for the AI coaching capabilities
- MongoDB for the database solution
- Express.js community for the web framework
- All contributors who helped build this project

---

**Happy Gardening! 🌱✨**
