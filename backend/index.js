import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import rateLimit from 'express-rate-limit';
import chatbotRoutes from './routes/chatbot.route.js';

const app = express()
dotenv.config()

const port =process.env.PORT || 3000

// middleware
app.use(express.json({ limit: '100kb' }));

// CORS allowlist
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
  'https://disaster-managementweb.netlify.app',
  process.env.FRONTEND_ORIGIN
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS: ' + origin), false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));

// Security headers
app.use(helmet({
  contentSecurityPolicy: false
}));

// Basic request logging
app.use(pinoHttp({
  autoLogging: true,
  serializers: {
    req(req) { return { id: req.id, method: req.method, url: req.url }; },
    res(res) { return { statusCode: res.statusCode }; }
  }
}));

// Rate limiting for API endpoints
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

//Database Connection code (optional - server works without it)
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB")
    }).catch((error)=>{
        console.log("Error connecting to MongoDB:", error)
        console.log("Continuing without database connection...")
    })
} else {
    console.log("No MongoDB URI provided, running without database")
}

// Defining Routes
app.use("/bot/v1/", chatLimiter, chatbotRoutes)

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Disaster Management Bot API is running",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    service: "disaster-chatbot-api",
    timestamp: new Date().toISOString()
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is Running on Port ${port}`)
  console.log(`Health check available at: http://localhost:${port}/health`)
  console.log(`API available at: http://localhost:${port}/bot/v1/message`)
})
