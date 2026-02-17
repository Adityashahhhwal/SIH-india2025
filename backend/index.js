import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import rateLimit from 'express-rate-limit';
import chatbotRoutes from './routes/chatbot.route.js';
import apiRoutes from './routes/api.route.js';

const app = express()
dotenv.config()

const port = process.env.PORT || 4002

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

// Rate limiting for chatbot endpoint
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for general API endpoints
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

//Database Connection code (optional - server works without it)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB")
    }).catch((error) => {
      console.log("Error connecting to MongoDB:", error)
      console.log("Continuing without database connection...")
    })
} else {
  console.log("No MongoDB URI provided, running without database")
}

// Defining Routes
app.use("/bot/v1/", chatLimiter, chatbotRoutes)
app.use("/api/v1/", apiLimiter, apiRoutes)

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

// Debug endpoint (non-production): check OpenRouter connectivity
if (process.env.NODE_ENV !== 'production') {
  app.get('/debug/openrouter', async (req, res) => {
    try {
      const base = process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1';
      const resp = await fetch(`${base}/models`, {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY || ''}`,
          'HTTP-Referer': process.env.OPENAI_HTTP_REFERER || 'https://disaster-managementweb.netlify.app',
          'X-Title': process.env.OPENAI_X_TITLE || 'Disaster Management Bot',
        }
      });
      const text = await resp.text();
      const bodyPreview = text.length > 1500 ? text.slice(0, 1500) + '…' : text;
      res.status(resp.status).json({ ok: resp.ok, status: resp.status, bodyPreview });
    } catch (e) {
      res.status(500).json({ ok: false, error: String(e?.message || e) });
    }
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is Running on Port ${port}`)
  console.log(`Health check available at: http://localhost:${port}/health`)
  console.log(`API available at: http://localhost:${port}/bot/v1/message`)
})
