// Chatbot Popup JavaScript
class ChatbotPopup {
    constructor() {
        this.messages = [];
        this.isLoading = false;
        this.isMinimized = false;
        // Use configuration-based API URL
        this.apiUrl = window.AppConfig ? 
            window.AppConfig.API_BASE_URL + window.AppConfig.API_ENDPOINTS.chat : 
            'http://localhost:4002/bot/v1/message';
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadFromStorage();
    }

    initializeElements() {
        this.toggleBtn = document.getElementById('chatbot-toggle');
        this.popup = document.getElementById('chatbot-popup');
        this.minimizeBtn = document.getElementById('chatbot-minimize');
        this.closeBtn = document.getElementById('chatbot-close');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
        this.locationBtn = document.getElementById('location-share-btn');
        this.loadingIndicator = document.getElementById('chatbot-loading');
        
        // Debug: Check if all elements are found
        console.log('Chatbot elements:', {
            toggleBtn: !!this.toggleBtn,
            popup: !!this.popup,
            minimizeBtn: !!this.minimizeBtn,
            closeBtn: !!this.closeBtn,
            messagesContainer: !!this.messagesContainer,
            input: !!this.input,
            sendBtn: !!this.sendBtn,
            locationBtn: !!this.locationBtn,
            loadingIndicator: !!this.loadingIndicator
        });
    }

    attachEventListeners() {
        // Toggle popup
        this.toggleBtn.addEventListener('click', () => this.togglePopup());
        
        // Minimize popup
        this.minimizeBtn.addEventListener('click', () => this.minimizePopup());
        
        // Close popup
        this.closeBtn.addEventListener('click', () => this.closePopup());
        
        // Send message
        this.sendBtn.addEventListener('click', () => {
            console.log('Send button clicked!');
            this.sendMessage();
        });
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log('Enter key pressed!');
                this.sendMessage();
            }
        });
        
        // Location sharing
        this.locationBtn.addEventListener('click', () => this.shareLocation());
        
        // Prevent popup from closing when clicking inside
        this.popup.addEventListener('click', (e) => e.stopPropagation());
        
        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.popup.contains(e.target) && !this.toggleBtn.contains(e.target)) {
                if (this.popup.classList.contains('show') && !this.isMinimized) {
                    this.closePopup();
                }
            }
        });
    }

    togglePopup() {
        if (this.popup.classList.contains('show')) {
            this.closePopup();
        } else {
            this.openPopup();
        }
    }

    openPopup() {
        this.popup.classList.add('show');
        this.popup.classList.remove('minimized');
        this.isMinimized = false;
        this.toggleBtn.style.display = 'none';
        this.input.focus();
        this.scrollToBottom();
    }

    closePopup() {
        this.popup.classList.remove('show');
        this.popup.classList.remove('minimized');
        this.isMinimized = false;
        this.toggleBtn.style.display = 'flex';
        this.saveToStorage();
    }

    minimizePopup() {
        this.popup.classList.add('minimized');
        this.isMinimized = true;
    }

    async sendMessage(messageText = null, locationData = null) {
        console.log('sendMessage called with:', messageText, locationData);
        
        if (this.isLoading) {
            console.log('Already loading, returning');
            return;
        }
        
        const messageToSend = messageText || this.input.value.trim();
        console.log('Message to send:', messageToSend);
        
        if (!messageToSend && !locationData) {
            console.log('No message to send');
            return;
        }
        
        this.isLoading = true;
        this.showLoading(true);
        this.updateSendButton();
        
        // Add user message to UI
        if (messageToSend) {
            this.addMessage(messageToSend, 'user');
            this.input.value = '';
        }
        
        try {
            const requestBody = {
                text: messageToSend
            };
            
            // Include recent history (lightweight memory)
            const history = this.messages
                .slice(-8)
                .map(m => ({
                    role: m.sender === 'bot' ? 'assistant' : 'user',
                    content: (m.text || '').toString()
                }));
                
            if (history.length) {
                requestBody.history = history;
            }
            
            // Add location data if provided
            if (locationData) {
                requestBody.location = locationData;
            }
            
            console.log('Sending request to:', this.apiUrl);
            console.log('Request body:', requestBody);
            
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Response data:', data);
            
            if (data.botMessage) {
                this.addMessage(data.botMessage, 'bot');
            } else {
                this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            console.log('Attempting to use mock API as fallback...');
            
            // Try mock API as fallback
            try {
                if (window.MockChatbotAPI) {
                    const mockResponse = await window.MockChatbotAPI.sendMessage(message, locationData);
                    if (mockResponse.success) {
                        this.addMessage('🤖 ' + mockResponse.data.message, 'bot');
                        this.addMessage('ℹ️ Note: Using offline mode - connect to internet for full functionality.', 'bot');
                        return;
                    }
                }
            } catch (mockError) {
                console.error('Mock API also failed:', mockError);
            }
            
            this.addMessage('Sorry, I\'m having trouble connecting right now. Please check your internet connection or try again later.', 'bot');
        } finally {
            this.isLoading = false;
            this.showLoading(false);
            this.updateSendButton();
            this.saveToStorage();
        }
    }

    addMessage(text, sender) {
        // Remove welcome message if it exists
        const welcomeMsg = this.messagesContainer.querySelector('.chatbot-welcome');
        if (welcomeMsg) {
            welcomeMsg.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        
        this.messagesContainer.appendChild(messageDiv);
        
        // Store message
        this.messages.push({ text, sender });
        
        this.scrollToBottom();
    }

    showLoading(show) {
        this.loadingIndicator.style.display = show ? 'flex' : 'none';
        if (show) {
            this.scrollToBottom();
        }
    }

    updateSendButton() {
        this.sendBtn.disabled = this.isLoading;
        this.input.disabled = this.isLoading;
        console.log('Send button disabled:', this.sendBtn.disabled);
        console.log('Input disabled:', this.input.disabled);
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }

    async shareLocation() {
        if (!navigator.geolocation) {
            this.addMessage('Geolocation is not supported by this browser.', 'bot');
            return;
        }

        this.locationBtn.disabled = true;
        this.locationBtn.classList.add('loading');
        
        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        };

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                
                try {
                    // Get address from coordinates using reverse geocoding
                    const response = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const addressData = await response.json();
                    
                    const locationData = {
                        latitude,
                        longitude,
                        accuracy,
                        address: addressData.display_name || `${addressData.city || ''}, ${addressData.countryName || ''}`,
                        city: addressData.city,
                        country: addressData.countryName,
                        timestamp: new Date().toISOString()
                    };

                    const locationMessage = `📍 **My Current Location**\n\n**Address:** ${locationData.address}\n**Coordinates:** ${latitude.toFixed(6)}, ${longitude.toFixed(6)}\n**Accuracy:** ±${Math.round(accuracy)}m\n\nI'm sharing my location for emergency assistance. What should I do in my current situation?`;
                    
                    await this.sendMessage(locationMessage, locationData);
                    
                } catch (error) {
                    console.error('Error getting address:', error);
                    
                    const locationData = {
                        latitude,
                        longitude,
                        accuracy,
                        timestamp: new Date().toISOString()
                    };
                    
                    const locationMessage = `📍 **My Current Location**\n\n**Coordinates:** ${latitude.toFixed(6)}, ${longitude.toFixed(6)}\n**Accuracy:** ±${Math.round(accuracy)}m\n\nI'm sharing my location for emergency assistance. What should I do in my current situation?`;
                    
                    await this.sendMessage(locationMessage, locationData);
                }
                
                this.locationBtn.disabled = false;
                this.locationBtn.classList.remove('loading');
            },
            (error) => {
                let errorMessage = '';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location access denied. Please enable location permissions in your browser.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        break;
                    default:
                        errorMessage = 'An unknown error occurred while retrieving location.';
                        break;
                }
                
                this.addMessage(errorMessage, 'bot');
                this.locationBtn.disabled = false;
                this.locationBtn.classList.remove('loading');
            },
            options
        );
    }

    saveToStorage() {
        try {
            localStorage.setItem('chatbot-messages', JSON.stringify(this.messages.slice(-20))); // Keep last 20 messages
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    loadFromStorage() {
        try {
            const savedMessages = localStorage.getItem('chatbot-messages');
            if (savedMessages) {
                const messages = JSON.parse(savedMessages);
                if (Array.isArray(messages) && messages.length > 0) {
                    // Remove welcome message
                    const welcomeMsg = this.messagesContainer.querySelector('.chatbot-welcome');
                    if (welcomeMsg) {
                        welcomeMsg.remove();
                    }
                    
                    // Restore messages
                    messages.forEach(msg => {
                        const messageDiv = document.createElement('div');
                        messageDiv.className = `message ${msg.sender}`;
                        messageDiv.textContent = msg.text;
                        this.messagesContainer.appendChild(messageDiv);
                    });
                    
                    this.messages = messages;
                    this.scrollToBottom();
                }
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }
    }

    // Method to clear chat history
    clearHistory() {
        this.messages = [];
        this.messagesContainer.innerHTML = `
            <div class="chatbot-welcome">
                <div class="welcome-icon">🤖</div>
                <div class="welcome-text">
                    Hi, I'm your <span class="highlight">Disaster Management Assistant</span>.
                    <br><br>
                    I can help with emergency protocols, safety tips, and disaster preparedness.
                    <br><br>
                    <small>Try asking: "help", "emergency", "earthquake", "flood", "fire", or "first aid"</small>
                </div>
            </div>
        `;
        this.saveToStorage();
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing chatbot...');
    
    try {
        window.chatbot = new ChatbotPopup();
        console.log('Chatbot initialized successfully!');
        
        // Add some helpful quick actions
        window.chatbot.sendQuickMessage = function(message) {
            this.input.value = message;
            this.sendMessage();
        };
        
        // Add test function
        window.testChatbot = function() {
            console.log('Testing chatbot...');
            window.chatbot.sendMessage('test message');
        };
        
        console.log('🤖 Disaster Management Chatbot initialized successfully!');
        console.log('You can test the chatbot by calling: testChatbot() in the console');
    } catch (error) {
        console.error('Error initializing chatbot:', error);
    }
});