// Configuration for different environments
const CONFIG = {
    development: {
        API_BASE_URL: 'http://localhost:4002',
        API_ENDPOINTS: {
            chat: '/bot/v1/message'
        }
    },
    production: {
        // ✅ UPDATED: Real deployed backend URL
        API_BASE_URL: 'https://sih-india2025.onrender.com',  // Your actual Render URL
        API_ENDPOINTS: {
            chat: '/bot/v1/message'
        }
    }
};

// Detect environment
const getEnvironment = () => {
    // Check if running on localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'development';
    }
    return 'production';
};

// Get current configuration
const getConfig = () => {
    const env = getEnvironment();
    return CONFIG[env];
};

// Export configuration
window.AppConfig = getConfig();