# SIH-india2025 - AI Disaster Management Bot

🚨 **Emergency Disaster Response Navigator with AI Chatbot**
## 📁 Project Structure

```
├── index.html              # Main disaster management interface
├── chatbot-popup.html      # Standalone chatbot page
├── chatbot-popup.js        # Chatbot functionality
├── script.js               # Main application logic
├── styles.css              # Main application styles
├── simple-chatbot.css      # Chatbot-specific styles
├── config.js               # Environment configuration
├── mock-api.js             # Offline/fallback API responses
├── netlify.toml           # Netlify deployment config
├── DEPLOYMENT.md          # Detailed deployment guide
└── README.md              # This file
```ve disaster management system that provides real-time guidance, emergency resources, and AI-powered assistance for disaster preparedness and response.

## 🌟 Features

- 🤖 **AI-Powered Chatbot** - Get instant disaster guidance and emergency assistance
- 🌍 **Multi-Disaster Support** - Earthquakes, floods, hurricanes, wildfires, tornadoes
- 📱 **Responsive Design** - Works on all devices and screen sizes
- 🌐 **Offline Mode** - Continue using core features without internet
- 🗺️ **Location Services** - Get location-specific emergency information
- 🚨 **Emergency Contacts** - Quick access to emergency services
- 📋 **Safety Checklists** - Comprehensive disaster preparation guides
- 🔔 **Real-time Alerts** - Stay updated with emergency notifications
- 🌎 **Multi-language Support** - Accessible in multiple languages
- ♿ **Accessibility Features** - Designed for users with disabilities

## 🚀 Live Demo

The bot is deployed and ready to use! Choose from these options:

### Quick Deploy Links:
- **Netlify**: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Adityashahhhwal/SIH-india2025)
- **Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Adityashahhhwal/SIH-india2025)
- **GitHub Pages**: Available in repository settings

## 📦 Quick Start

### Option 1: Deploy to Netlify (Recommended)

1. **Fork this repository**
2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your forked repository
   - Deploy!

Your site will be live at: `https://your-site-name.netlify.app`

### Option 2: Deploy to Vercel

1. **Fork this repository**
2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Deploy!

### Option 3: GitHub Pages

1. **Fork this repository**
2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to Pages section
   - Select source: Deploy from branch
   - Choose `main` branch
   - Save

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/SIH-india2025.git
   cd SIH-india2025
   ```

2. **Open in browser:**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. **Access the application:**
   - Main app: `http://localhost:8000`
   - Chatbot only: `http://localhost:8000/chatbot-popup.html`

## 🔧 Configuration

### API Configuration

The bot automatically detects the environment:

- **Development** (localhost): Uses mock API responses
- **Production** (deployed): Configure your API URL in `config.js`

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

### Environment Variables (Optional)

For advanced configurations, you can set:
- `API_URL` - Custom API endpoint
- `ENVIRONMENT` - Force environment (development/production)

## 📁 Project Structure

```
├── index.html              # Main disaster management interface
├── chatbot-popup.html      # Standalone chatbot page
├── chatbot-popup.js        # Chatbot functionality
├── config.js              # Environment configuration
├── mock-api.js             # Offline/fallback API responses
├── styles.css              # Main application styles
├── simple-chatbot.css      # Chatbot-specific styles
├── script.js               # Main application logic
├── netlify.toml           # Netlify deployment config
├── vercel.json            # Vercel deployment config
└── DEPLOYMENT.md          # Detailed deployment guide
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