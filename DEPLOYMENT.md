# Disaster Management Bot Deployment Guide

## Overview
This is a comprehensive disaster management bot with AI chatbot functionality. The frontend is built with HTML/CSS/JavaScript and requires a backend API for the chatbot feature.

## Deployment Options

### Option 1: Frontend + Backend Deployment (Recommended)

#### Frontend Deployment (Choose one):
- **Netlify** (Recommended for beginners)
- **Vercel** (Great for developers)
- **GitHub Pages** (Free, but limited)

#### Backend API Deployment (Choose one):
- **Railway** (Recommended)
- **Render** (Free tier available)
- **Railway.app** (Easy deployment)

### Option 2: Frontend Only with Mock API
If you don't have a backend ready, the chatbot will show mock responses.

## Quick Deployment Steps

### 1. Deploy Frontend to Netlify (Easiest)

1. **Sign up at [Netlify](https://netlify.com)**
2. **Connect your GitHub repository**
3. **Deploy settings:**
   - Build command: (leave empty)
   - Publish directory: `/` (root)
4. **Deploy!**
If you don't have a backend ready, on localhost the chatbot will load `mock-api.js` and show smart offline responses.
Your site will be available at: `https://your-site-name.netlify.app`

### 2. Deploy Backend API

If you have a backend API server, deploy it to Railway:

1. **Sign up at [Railway](https://railway.app)**
2. **Deploy from GitHub or upload your backend code**
3. **Get your deployed API URL** (e.g., `https://your-app.railway.app`)
4. **Update the config.js file** with your production API URL

### 3. Update Configuration

After deploying your backend, update `config.js`:

```javascript
production: {
    API_BASE_URL: 'https://your-deployed-api-url.com',  // Replace with actual URL
    API_ENDPOINTS: {
        chat: '/bot/v1/message'
    }
}
```

## Environment Configuration

The app automatically detects the environment:
- **localhost**: Uses development configuration
- **deployed domain**: Uses production configuration

## Features Included

- ✅ Emergency disaster response interface
- ✅ Interactive chatbot for disaster guidance
- ✅ Location-based services
- ✅ Offline mode capabilities
- ✅ Emergency contact management
- ✅ Real-time alerts and updates
- ✅ Multi-language support
- ✅ Accessibility features

## Files Structure
On localhost, `mock-api.js` is loaded automatically to provide offline responses. In production, only the real API is used.

```
├── index.html              # Main application
├── chatbot-popup.html      # Standalone chatbot page
├── chatbot-popup.js        # Chatbot functionality
├── config.js              # Environment configuration
├── styles.css              # Main styles
├── simple-chatbot.css      # Chatbot styles
└── script.js               # Main application logic
```

## Next Steps

1. Choose your deployment platform
2. Deploy the frontend
3. If you have a backend API, deploy it and update config.js
4. Test the deployed application

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Ensure CORS is properly configured on your backend
4. Test on different devices and browsers