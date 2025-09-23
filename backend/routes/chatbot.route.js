import express from 'express';
import { z } from 'zod';
import { Message } from '../controllers/chatbot.message.ai.js';

const router = express.Router();

const MessageSchema = z.object({
	text: z.string().min(1).max(2000),
	history: z.array(z.object({
		role: z.string().optional(),
		content: z.string().optional(),
		sender: z.string().optional(),
		text: z.string().optional(),
	})).max(20).optional(),
	location: z.object({
		latitude: z.number().optional(),
		longitude: z.number().optional(),
		accuracy: z.number().optional(),
		address: z.string().optional(),
		city: z.string().optional(),
		country: z.string().optional(),
		timestamp: z.string().optional(),
	}).partial().optional()
});

function validateMessage(req, res, next) {
	const result = MessageSchema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json({ error: 'Invalid request', details: result.error.issues });
	}
	next();
}

router.post("/message", validateMessage, Message)

export default router;