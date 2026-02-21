# Deploy Your Chatbot Backend to Railway

## Quick Deploy (3 minutes)

### Step 1: Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Sign in with GitHub**
3. **Create New Project** → "Deploy from GitHub repo"
4. **Select** your repository: `Adityashahhhwal/SIH-india2025`
5. **Choose** the folder: `backend`

### Step 2: Set Environment Variables

In Railway dashboard, go to **Variables** tab and add:

```
PORT=4002
MONGO_URI=mongodb+srv://... (from Atlas)
OPENAI_API_KEY=your-openrouter-api-key-here
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_MODEL=openai/gpt-5-chat
OPENAI_HTTP_REFERER=https://disaster-managementweb.netlify.app
OPENAI_X_TITLE=Disaster Management Bot
NODE_ENV=production
```

### Step 3: Get Your Deployed URL

After deployment, Railway will give you a URL like:
`https://your-backend-name.up.railway.app`

### Step 4: Update Frontend Config

Copy your Railway URL and update the `config.js` file:

```javascript
production: {
    API_BASE_URL: 'https://your-backend-name.up.railway.app',  // Replace with your Railway URL
    API_ENDPOINTS: {
        chat: '/bot/v1/message'
    }
}
```

### Step 5: Test Your Chatbot

Visit `https://disaster-managementweb.netlify.app` and test the chatbot - it will now use real AI responses!

## Alternative: Render Deployment

If Railway doesn't work, use [Render.com](https://render.com):

1. **New Web Service** from GitHub
2. **Root Directory**: `backend`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Add Environment Variables** (same as above)

## Troubleshooting

- **CORS errors**: Make sure `OPENAI_HTTP_REFERER` matches your Netlify URL
- **Connection refused**: Check if Railway service is running
- **API key errors**: Verify your OpenAI API key is valid

Your chatbot will work with both:
- ✅ **Real AI responses** (when backend is deployed)
- ✅ **Smart mock responses** (when backend is down)

The fallback system ensures your chatbot always works!