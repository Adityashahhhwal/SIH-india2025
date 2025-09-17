import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import chatbotRoutes from './routes/chatbot.route.js';

const app = express()
dotenv.config()

const port =process.env.PORT || 3000

// middleware
app.use(express.json());
app.use(cors())

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
app.use("/bot/v1/", chatbotRoutes)

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
