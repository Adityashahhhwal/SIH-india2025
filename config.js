// Configuration for different environments
const CONFIG = {
    development: {
        API_BASE_URL: 'http://localhost:4002',
        API_ENDPOINTS: {
            chat: '/bot/v1/message'
        }
    },
    production: {
        // This will be updated with your actual deployed API URL
        API_BASE_URL: 'https://your-api-domain.com',  // Update this with your deployed API URL
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