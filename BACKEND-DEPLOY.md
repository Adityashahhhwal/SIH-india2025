# Quick Backend Deployment Guide

## Option 1: Railway (Recommended)

1. **Sign up at [Railway](https://railway.app)**
2. **Deploy from GitHub:**
   - Connect your GitHub account
   - Select this repository
   - Choose the `chatbot-main/DisasterManagement-bot/backend` folder
   - Railway will auto-detect the Node.js app

3. **Set Environment Variables:**
   ```
   PORT=4002
   OPENAI_API_KEY=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
   OPENAI_BASE_URL=https://openrouter.ai/api/v1
   OPENAI_MODEL=openai/gpt-5-chat
   OPENAI_HTTP_REFERER=https://your-frontend-domain.netlify.app
   OPENAI_X_TITLE=Disaster Management Bot
   ```

4. **Deploy and get your URL** (e.g., `https://your-app.up.railway.app`)

## Option 2: Render

1. **Go to [Render](https://render.com)**
2. **Create Web Service from GitHub**
3. **Configure:**
   - Root Directory: `chatbot-main/DisasterManagement-bot/backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

## Update Frontend Configuration

After deploying backend, update `config.js`:

```javascript
production: {
    API_BASE_URL: 'https://your-backend-url.com',  // Your deployed backend URL
    API_ENDPOINTS: {
        chat: '/bot/v1/message'
    }
}
```

## Test Your Deployment

1. Deploy backend to Railway/Render
2. Update config.js with your backend URL
3. Commit and push changes
4. Netlify will auto-deploy your updated frontend
5. Test the chatbot functionality

Your chatbot will now work with:
- ✅ Real AI responses (when backend is available)
- ✅ Smart fallback responses (when backend is down)
- ✅ Location-aware guidance
- ✅ Emergency contact information