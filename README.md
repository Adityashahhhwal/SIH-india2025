# SIH-india2025 - AI Disaster Management Bot

🚨 **Emergency Disaster Response Navigator with AI Chatbot**
## 📁 Project Structure

```
├── index.html              # Main disaster management interface
├── chatbot-popup.html      # Standalone chatbot page (inline JS)
├── script.js               # Main application logic
├── styles.css              # Main application styles
├── config.js               # Environment configuration
├── mock-api.js             # Offline/fallback API responses (dev only)
├── sw.js                   # Service worker stub (prevents 404s)
├── favicon.ico             # Favicon placeholder
├── netlify.toml            # Netlify deployment config
├── DEPLOYMENT.md           # Detailed deployment guide
└── README.md               # This file
```

A responsive disaster management system that provides real-time guidance, emergency resources, and AI-powered assistance for disaster preparedness and response.

## 🤖 **AI-Powered Chatbot Features**

### Frontend Chatbot
- ✅ **Smart Mock Responses** - Works offline with intelligent disaster guidance
- ✅ **Location Services** - GPS-based emergency recommendations  
- ✅ **Multi-Disaster Support** - Earthquakes, floods, fires, cyclones, etc.
- ✅ **Emergency Contacts** - India-specific emergency numbers

### Backend API (Optional)
- � **OpenAI Integration** - Real AI responses via OpenRouter
- � **GPT-5 Model** - Latest AI technology for emergency guidance
- � **Context Memory** - Remembers conversation history
- � **Location-Aware** - Tailored advice based on user location
- 🔥 **MongoDB Storage** - Message history and user data
- 🔥 **Fallback System** - Automatic mock responses if AI fails

## 🚀 Live Demo

**Frontend**: [https://disaster-managementweb.netlify.app](https://disaster-managementweb.netlify.app)  
**Backend**: Deploy following the guide below

## ⚡ Quick Start

### Frontend Only (Mock Responses)
The frontend is already deployed and works with intelligent mock responses.

### Full Setup (AI-Powered)
1. **Deploy Frontend**: Already live on Netlify ✅
2. **Deploy Backend**: Follow `DEPLOY-BACKEND-NOW.md` guide
3. **Update Config**: Add your backend URL to `config.js`
4. **Test**: Real AI responses with OpenAI/OpenRouter integration

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/SIH-india2025.git
   cd SIH-india2025
   ```

2. **Run locally:**
   - Easiest (Node):
   ```bash
   npm run serve
   ```
   - Or open `index.html` directly in a browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. **Access the application:**
   - If using `npm run serve`: `http://localhost:3000`
   - Python example: `http://localhost:8000`
   - Chatbot page: `/chatbot-popup.html`

## 🔧 Configuration

### API Configuration

The bot automatically detects the environment:

- Development (localhost): Loads `mock-api.js` and uses offline responses
- Production (deployed): Uses your backend API (configure in `config.js`)

To connect a real backend API:

1. Deploy your chatbot API to Railway, Render, or similar
2. Update `config.js` with your API URL:
   ```javascript
   production: {
       API_BASE_URL: 'https://your-api-domain.com',
       API_ENDPOINTS: {
           chat: '/bot/v1/message'
       }
   }
   ```

### Backend Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill real values:

```
PORT=4002
MONGO_URI="<your-mongodb-uri>"
OPENAI_API_KEY=<your-openrouter-api-key>
OPENAI_BASE_URL="https://openrouter.ai/api/v1"
OPENAI_MODEL=x-ai/grok-4-fast:free
OPENAI_HTTP_REFERER="https://your-frontend-domain"
OPENAI_X_TITLE="Disaster Management Bot"
```

## 📁 Project Structure

```
📦 SIH-india2025/
├── 🌐 index.html              # Main disaster management app
├── 💬 chatbot-popup.html      # Standalone chatbot page
├── 📜 script.js               # Main application logic
├── 🎨 styles.css              # Main application styles
├── ⚙️ config.js               # Environment configuration
├── 🔄 mock-api.js             # Offline/fallback API responses (dev only)
├── 🧭 sw.js                   # No-op service worker
├── 🖼️ favicon.ico             # Favicon
├── 🚀 netlify.toml            # Netlify deployment config
├── 📚 DEPLOYMENT.md           # Frontend deployment guide
├── 🛠️ DEPLOY-BACKEND-NOW.md   # Backend deployment guide
├── 📖 README.md               # Project documentation
└── 🖥️ backend/                # Chatbot API server
   ├── index.js               # Express server
   ├── package.json           # Dependencies
   ├── .env.example           # Example env file
   ├── controllers/           # API controllers
   ├── models/                # Database models
   └── routes/                # API routes
```

## 🌐 Supported Platforms

- ✅ **Netlify** - Recommended, easy setup
- ✅ **Vercel** - Great developer experience
- ✅ **GitHub Pages** - Free hosting
- ✅ **Firebase Hosting** - Google's platform
- ✅ **Surge.sh** - Simple static hosting
- ✅ **Any static hosting service**

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter issues:

1. **Check the [DEPLOYMENT.md](DEPLOYMENT.md)** for detailed instructions
2. **Open an issue** on GitHub with:
   - Your deployment platform
   - Error messages
   - Browser console logs
3. **Test locally first** to isolate the issue

## 🌟 Acknowledgments

- Built for Smart India Hackathon 2025
- Disaster management best practices from emergency response organizations
- Open source libraries and frameworks used

---

**🚨 In case of real emergency, always contact local emergency services first! 🚨**

**Emergency Numbers:**
- US: 911
- India: 100 (Police), 101 (Fire), 102 (Ambulance)
- EU: 112