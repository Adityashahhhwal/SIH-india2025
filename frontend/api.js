
class EmergencyAlertSystem {
    constructor() {
        this.alerts = [];
        this.notificationPermission = 'default';
        this.alertSettings = {
            weatherAlerts: true,
            emergencyAlerts: true,
            evacuationAlerts: true,
            roadClosures: true
        };
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.requestNotificationPermission();
        this.loadAlertSettings();
        this.startAlertPolling();
        this.updateLastAlertTime();
    }

    setupEventListeners() {
        // Enable notifications button
        const enableBtn = document.getElementById('enable-notifications');
        if (enableBtn) {
            enableBtn.addEventListener('click', () => this.requestNotificationPermission());
        }

        // Alert settings checkboxes
        ['weather-alerts', 'emergency-alerts', 'evacuation-alerts', 'road-closures'].forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener('change', (e) => this.updateAlertSetting(id, e.target.checked));
            }
        });
    }

    async requestNotificationPermission() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            this.notificationPermission = permission;
            this.updateNotificationStatus();
            return permission === 'granted';
        }
        return false;
    }

    updateNotificationStatus() {
        const statusIndicator = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-indicator span');
        const enableBtn = document.getElementById('enable-notifications');

        if (this.notificationPermission === 'granted') {
            statusIndicator.className = 'status-dot active';
            statusText.textContent = 'Alerts Active';
            if (enableBtn) {
                enableBtn.innerHTML = '<i class="fas fa-check"></i> Notifications Enabled';
                enableBtn.disabled = true;
            }
        } else {
            statusIndicator.className = 'status-dot inactive';
            statusText.textContent = 'Alerts Disabled';
            if (enableBtn) {
                enableBtn.innerHTML = '<i class="fas fa-bell"></i> Enable Push Notifications';
                enableBtn.disabled = false;
            }
        }
    }

    updateAlertSetting(settingId, enabled) {
        const settingKey = settingId.replace('-', '');
        this.alertSettings[settingKey] = enabled;
        localStorage.setItem('alertSettings', JSON.stringify(this.alertSettings));
    }

    loadAlertSettings() {
        const saved = localStorage.getItem('alertSettings');
        if (saved) {
            this.alertSettings = { ...this.alertSettings, ...JSON.parse(saved) };
        }

        // Update checkboxes
        Object.entries(this.alertSettings).forEach(([key, value]) => {
            const checkbox = document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase());
            if (checkbox) checkbox.checked = value;
        });
    }

    async fetchAlerts() {
        try {
            // Simulate API call to government/weather services
            const mockAlerts = await this.generateMockAlerts();
            return mockAlerts;
        } catch (error) {
            console.error('Error fetching alerts:', error);
            return [];
        }
    }

    async generateMockAlerts() {
        // Simulate different types of alerts
        const alertTypes = [
            {
                type: 'critical',
                icon: 'fas fa-exclamation-triangle',
                title: 'Severe Weather Warning',
                message: 'Tornado watch issued for your area. Take shelter immediately.',
                source: 'National Weather Service',
                category: 'weather'
            },
            {
                type: 'warning',
                icon: 'fas fa-road',
                title: 'Road Closure Alert',
                message: 'Main Street bridge closed due to high water levels.',
                source: 'Department of Transportation',
                category: 'road'
            },
            {
                type: 'info',
                icon: 'fas fa-home',
                title: 'Shelter Status Update',
                message: 'Additional emergency shelter opened at Community Center.',
                source: 'Emergency Management',
                category: 'emergency'
            },
            {
                type: 'warning',
                icon: 'fas fa-fire',
                title: 'Wildfire Alert',
                message: 'Wildfire detected 5 miles northeast. Evacuation may be necessary.',
                source: 'Fire Department',
                category: 'emergency'
            }
        ];

        // Randomly select and return some alerts
        const numAlerts = Math.floor(Math.random() * 3) + 1;
        const selectedAlerts = [];
        
        for (let i = 0; i < numAlerts; i++) {
            const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
            selectedAlerts.push({
                ...alert,
                id: Date.now() + i,
                timestamp: new Date(Date.now() - Math.random() * 3600000) // Random time within last hour
            });
        }

        return selectedAlerts;
    }

    async addAlert(alert) {
        this.alerts.unshift(alert);
        this.renderAlerts();
        this.updateLastAlertTime();

        // Show browser notification if enabled
        if (this.notificationPermission === 'granted' && this.shouldShowAlert(alert)) {
            this.showNotification(alert);
        }
    }

    shouldShowAlert(alert) {
        const settings = this.alertSettings;
        switch (alert.category) {
            case 'weather':
                return settings.weatherAlerts;
            case 'emergency':
                return settings.emergencyAlerts;
            case 'evacuation':
                return settings.evacuationAlerts;
            case 'road':
                return settings.roadClosures;
            default:
                return true;
        }
    }

    showNotification(alert) {
        const notification = new Notification(alert.title, {
            body: alert.message,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: alert.id,
            requireInteraction: alert.type === 'critical'
        });

        notification.onclick = () => {
            window.focus();
            document.getElementById('alerts').scrollIntoView({ behavior: 'smooth' });
            notification.close();
        };

        // Auto-close non-critical notifications
        if (alert.type !== 'critical') {
            setTimeout(() => notification.close(), 10000);
        }
    }

    renderAlerts() {
        const alertList = document.getElementById('alert-list');
        if (!alertList) return;

        // Combine current alerts with new ones and sort by timestamp
        const allAlerts = [...this.alerts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        alertList.innerHTML = allAlerts.map(alert => `
            <div class="alert-item ${alert.type}" data-alert-id="${alert.id}">
                <div class="alert-icon">
                    <i class="${alert.icon}"></i>
                </div>
                <div class="alert-content">
                    <h4>${alert.title}</h4>
                    <p>${alert.message}</p>
                    <div class="alert-meta">
                        <span class="alert-source">${alert.source}</span>
                        <span class="alert-time">${this.formatAlertTime(alert.timestamp)}</span>
                    </div>
                </div>
                <div class="alert-actions">
                    <button class="btn btn-small" onclick="alertSystem.viewAlertDetails('${alert.id}')">View Details</button>
                    <button class="btn btn-small btn-outline" onclick="alertSystem.dismissAlert('${alert.id}')">Dismiss</button>
                </div>
            </div>
        `).join('');
    }

    formatAlertTime(timestamp) {
        const now = new Date();
        const alertTime = new Date(timestamp);
        const diffMinutes = Math.floor((now - alertTime) / 60000);

        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes} min ago`;
        
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }

    updateLastAlertTime() {
        const lastAlertElement = document.getElementById('last-alert-time');
        if (lastAlertElement && this.alerts.length > 0) {
            const latestAlert = this.alerts[0];
            lastAlertElement.textContent = this.formatAlertTime(latestAlert.timestamp);
        }
    }

    viewAlertDetails(alertId) {
        const alert = this.alerts.find(a => a.id == alertId);
        if (alert) {
            // Create a detailed view modal or navigate to details page
            this.showAlertModal(alert);
        }
    }

    showAlertModal(alert) {
        // Create modal for alert details
        const modal = document.createElement('div');
        modal.className = 'alert-modal';
        modal.innerHTML = `
            <div class="alert-modal-content">
                <div class="alert-modal-header">
                    <h3>${alert.title}</h3>
                    <button class="close-modal" onclick="this.closest('.alert-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="alert-modal-body">
                    <div class="alert-severity ${alert.type}">
                        <i class="${alert.icon}"></i>
                        <span>${alert.type.toUpperCase()}</span>
                    </div>
                    <p class="alert-description">${alert.message}</p>
                    <div class="alert-details">
                        <div class="detail-item">
                            <strong>Source:</strong> ${alert.source}
                        </div>
                        <div class="detail-item">
                            <strong>Time:</strong> ${new Date(alert.timestamp).toLocaleString()}
                        </div>
                        <div class="detail-item">
                            <strong>Category:</strong> ${alert.category}
                        </div>
                    </div>
                </div>
                <div class="alert-modal-footer">
                    <button class="btn btn-primary" onclick="this.closest('.alert-modal').remove()">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    dismissAlert(alertId) {
        this.alerts = this.alerts.filter(a => a.id != alertId);
        this.renderAlerts();
    }

    startAlertPolling() {
        // Poll for new alerts every 5 minutes
        setInterval(async () => {
            const newAlerts = await this.fetchAlerts();
            for (const alert of newAlerts) {
                // Check if we already have this alert
                if (!this.alerts.find(a => a.id === alert.id)) {
                    await this.addAlert(alert);
                }
            }
        }, 300000); // 5 minutes

        // Initial load of alerts
        this.fetchAlerts().then(alerts => {
            alerts.forEach(alert => this.addAlert(alert));
        });
    }

    // Public method to manually trigger alert check
    async checkForAlerts() {
        const newAlerts = await this.fetchAlerts();
        for (const alert of newAlerts) {
            await this.addAlert(alert);
        }
    }

    // Show the emergency alert modal
    showAlertModal() {
        const modal = document.getElementById('emergency-alert-modal');
        if (modal) {
            modal.style.display = 'block';
            this.setupAlertModalListeners();
        }
    }

    // Setup event listeners for the alert modal
    setupAlertModalListeners() {
        const modal = document.getElementById('emergency-alert-modal');
        const sendBtn = document.getElementById('send-alert-btn');
        const cancelBtn = document.getElementById('cancel-alert-btn');
        const closeBtn = modal.querySelector('.close');

        // Send alert button
        if (sendBtn) {
            sendBtn.onclick = () => this.sendEmergencyAlert();
        }

        // Cancel button
        if (cancelBtn) {
            cancelBtn.onclick = () => this.closeAlertModal();
        }

        // Close button
        if (closeBtn) {
            closeBtn.onclick = () => this.closeAlertModal();
        }

        // Close on outside click
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeAlertModal();
            }
        };
    }

    // Close the alert modal
    closeAlertModal() {
        const modal = document.getElementById('emergency-alert-modal');
        if (modal) {
            modal.style.display = 'none';
            // Reset form
            document.getElementById('alert-type').value = '';
            document.getElementById('alert-message').value = '';
        }
    }

    // Send emergency alert
    async sendEmergencyAlert() {
        const alertType = document.getElementById('alert-type').value;
        const alertMessage = document.getElementById('alert-message').value;

        if (!alertType) {
            alert('Please select an emergency type');
            return;
        }

        try {
            // Create alert object
            const emergencyAlert = {
                id: Date.now(),
                type: 'critical',
                title: `Emergency Alert: ${alertType.replace('-', ' ').toUpperCase()}`,
                message: alertMessage || 'Emergency assistance needed',
                source: 'User Emergency Alert',
                category: 'emergency',
                timestamp: new Date().toISOString(),
                icon: 'fas fa-exclamation-triangle',
                location: this.currentLocation || 'Unknown'
            };

            // Add to alerts list
            await this.addAlert(emergencyAlert);

            // Simulate sending to authorities
            console.log('Emergency alert sent:', emergencyAlert);

            // Show confirmation
            this.showAlertConfirmation();

            // Close modal
            this.closeAlertModal();

        } catch (error) {
            console.error('Error sending emergency alert:', error);
            alert('Failed to send emergency alert. Please call 911 directly.');
        }
    }

    // Show alert confirmation
    showAlertConfirmation() {
        const confirmation = document.createElement('div');
        confirmation.className = 'alert-confirmation';
        confirmation.innerHTML = `
            <div class="confirmation-content">
                <i class="fas fa-check-circle"></i>
                <h3>Emergency Alert Sent</h3>
                <p>Your emergency alert has been sent to authorities and emergency contacts.</p>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        document.body.appendChild(confirmation);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (confirmation.parentElement) {
                confirmation.remove();
            }
        }, 5000);
    }
}
class WeatherMonitoringSystem {
    constructor() {
        this.apiKey = 'demo_key'; // Replace with actual API key
        this.currentLocation = null;
        this.weatherData = null;
        this.init();
    }

    async init() {
        await this.getCurrentLocation();
        await this.fetchWeatherData();
        this.setupEventListeners();
        this.startWeatherUpdates();
    }

    async getCurrentLocation() {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.currentLocation = {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        };
                        resolve(this.currentLocation);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        // Default to a sample location (NYC)
                        this.currentLocation = { lat: 40.7128, lon: -74.0060 };
                        resolve(this.currentLocation);
                    }
                );
            } else {
                // Default location if geolocation not supported
                this.currentLocation = { lat: 40.7128, lon: -74.0060 };
                resolve(this.currentLocation);
            }
        });
    }

    async fetchWeatherData() {
        try {
            // Using mock data for demo - replace with actual weather API call
            const mockWeatherData = await this.getMockWeatherData();
            this.weatherData = mockWeatherData;
            this.updateWeatherDisplay();
            return mockWeatherData;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showWeatherError();
        }
    }

    async getMockWeatherData() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const conditions = ['clear', 'cloudy', 'rainy', 'stormy', 'snowy'];
        const currentCondition = conditions[Math.floor(Math.random() * conditions.length)];
        
        return {
            current: {
                temperature: Math.floor(Math.random() * 40) + 50, // 50-90°F
                condition: currentCondition,
                description: this.getConditionDescription(currentCondition),
                humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
                windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 mph
                windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
                visibility: Math.floor(Math.random() * 10) + 5, // 5-15 miles
                feelsLike: Math.floor(Math.random() * 40) + 50,
                pressure: Math.floor(Math.random() * 2) + 29.5, // 29.5-31.5 inHg
                uvIndex: Math.floor(Math.random() * 11) // 0-10
            },
            forecast: this.generateForecast(),
            alerts: this.generateWeatherAlerts(currentCondition)
        };
    }

    getConditionDescription(condition) {
        const descriptions = {
            clear: 'Clear skies',
            cloudy: 'Partly cloudy',
            rainy: 'Light rain',
            stormy: 'Thunderstorms',
            snowy: 'Snow showers'
        };
        return descriptions[condition] || 'Unknown';
    }

    getWeatherIcon(condition) {
        const icons = {
            clear: 'fas fa-sun',
            cloudy: 'fas fa-cloud-sun',
            rainy: 'fas fa-cloud-rain',
            stormy: 'fas fa-bolt',
            snowy: 'fas fa-snowflake'
        };
        return icons[condition] || 'fas fa-cloud';
    }

    generateForecast() {
        const forecast = [];
        const conditions = ['clear', 'cloudy', 'rainy', 'stormy'];
        
        for (let i = 0; i < 24; i += 3) {
            const condition = conditions[Math.floor(Math.random() * conditions.length)];
            const hour = new Date();
            hour.setHours(hour.getHours() + i);
            
            forecast.push({
                time: hour.getHours(),
                condition: condition,
                temperature: Math.floor(Math.random() * 20) + 60,
                precipitation: Math.floor(Math.random() * 100)
            });
        }
        
        return forecast;
    }

    generateWeatherAlerts(currentCondition) {
        const alerts = [];
        
        if (currentCondition === 'stormy') {
            alerts.push({
                type: 'warning',
                title: 'Severe Thunderstorm Warning',
                description: 'Damaging winds and large hail possible. Seek shelter indoors.',
                expires: new Date(Date.now() + 3600000) // 1 hour from now
            });
        }
        
        if (currentCondition === 'rainy') {
            alerts.push({
                type: 'watch',
                title: 'Flash Flood Watch',
                description: 'Heavy rainfall may cause flooding in low-lying areas.',
                expires: new Date(Date.now() + 7200000) // 2 hours from now
            });
        }
        
        return alerts;
    }

    updateWeatherDisplay() {
        if (!this.weatherData) return;

        const { current, forecast, alerts } = this.weatherData;

        // Update current weather
        this.updateElement('current-temp', Math.round(current.temperature));
        this.updateElement('weather-desc', current.description);
        this.updateElement('humidity', current.humidity);
        this.updateElement('wind-speed', current.windSpeed);
        this.updateElement('wind-direction', current.windDirection);
        this.updateElement('visibility', current.visibility);
        this.updateElement('feels-like', Math.round(current.feelsLike));

        // Update weather icon
        const iconElement = document.getElementById('weather-icon');
        if (iconElement) {
            iconElement.className = this.getWeatherIcon(current.condition);
        }

        // Update forecast
        this.updateForecast(forecast);

        // Update weather alerts
        this.updateWeatherAlerts(alerts);
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    updateForecast(forecast) {
        const container = document.querySelector('.forecast-container');
        if (!container) return;

        container.innerHTML = forecast.map(item => `
            <div class="forecast-item">
                <div class="forecast-time">${this.formatHour(item.time)}</div>
                <div class="forecast-icon">
                    <i class="${this.getWeatherIcon(item.condition)}"></i>
                </div>
                <div class="forecast-temp">${item.temperature}°</div>
                <div class="forecast-precip">${item.precipitation}%</div>
            </div>
        `).join('');
    }

    formatHour(hour) {
        if (hour === 0) return '12 AM';
        if (hour === 12) return '12 PM';
        if (hour > 12) return `${hour - 12} PM`;
        return `${hour} AM`;
    }

    updateWeatherAlerts(alerts) {
        const container = document.querySelector('.weather-alert-list');
        if (!container) return;

        if (alerts.length === 0) {
            container.innerHTML = '<div class="no-alerts">No weather warnings at this time</div>';
            return;
        }

        container.innerHTML = alerts.map(alert => `
            <div class="weather-alert ${alert.type}">
                <div class="alert-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>${alert.title}</strong>
                </div>
                <div class="alert-description">${alert.description}</div>
                <div class="alert-expires">Expires: ${alert.expires.toLocaleTimeString()}</div>
            </div>
        `).join('');
    }

    showWeatherError() {
        const currentWeather = document.getElementById('current-weather');
        if (currentWeather) {
            currentWeather.innerHTML = `
                <div class="weather-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Unable to load weather data</p>
                    <button onclick="weatherSystem.fetchWeatherData()">Retry</button>
                </div>
            `;
        }
    }

    setupEventListeners() {
        // Add refresh button functionality
        const refreshBtn = document.getElementById('refresh-weather');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.fetchWeatherData());
        }

        // Add location change functionality
        const locationBtn = document.getElementById('change-location');
        if (locationBtn) {
            locationBtn.addEventListener('click', () => this.changeLocation());
        }
    }

    async changeLocation() {
        const newLocation = prompt('Enter city name or zip code:');
        if (newLocation) {
            // In a real app, you would geocode the location
            await this.fetchWeatherData();
        }
    }

    startWeatherUpdates() {
        // Update weather data every 15 minutes
        setInterval(() => {
            this.fetchWeatherData();
        }, 900000); // 15 minutes
    }

    // Public method to get current weather for alerts
    getCurrentWeather() {
        return this.weatherData?.current || null;
    }

    // Public method to check for severe weather
    hasSevereWeather() {
        if (!this.weatherData) return false;
        
        const { current, alerts } = this.weatherData;
        
        // Check for severe conditions
        const severeConditions = ['stormy', 'snowy'];
        const highWinds = current.windSpeed > 20;
        const lowVisibility = current.visibility < 2;
        const activeAlerts = alerts.length > 0;
        
        return severeConditions.includes(current.condition) || highWinds || lowVisibility || activeAlerts;
    }
}
class EmergencyContactsSystem {
    constructor() {
        this.currentLocation = null;
        this.localContacts = {};
        this.personalContacts = [];
        this.init();
    }

    async init() {
        await this.getCurrentLocation();
        await this.loadLocalContacts();
        this.loadPersonalContacts();
        this.setupEventListeners();
        this.renderContacts();
    }

    async getCurrentLocation() {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.currentLocation = {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                            city: 'Current City', // Would be geocoded in real app
                            state: 'State'
                        };
                        resolve(this.currentLocation);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        // Default location
                        this.currentLocation = {
                            lat: 40.7128,
                            lon: -74.0060,
                            city: 'New York',
                            state: 'NY'
                        };
                        resolve(this.currentLocation);
                    }
                );
            } else {
                // Default location
                this.currentLocation = {
                    lat: 40.7128,
                    lon: -74.0060,
                    city: 'New York',
                    state: 'NY'
                };
                resolve(this.currentLocation);
            }
        });
    }

    async loadLocalContacts() {
        // In a real app, this would fetch from a location-based API
        this.localContacts = {
            emergency: [
                {
                    id: 'emergency-911',
                    name: 'Emergency Services',
                    description: 'Police, Fire, Ambulance',
                    number: '911',
                    icon: 'fas fa-phone',
                    critical: true,
                    available24h: true
                },
                {
                    id: 'poison-control',
                    name: 'Poison Control',
                    description: 'Poisoning emergencies',
                    number: '1-800-222-1222',
                    icon: 'fas fa-skull-crossbones',
                    critical: true,
                    available24h: true
                }
            ],
            medical: [
                {
                    id: 'hospital-main',
                    name: `${this.currentLocation?.city || 'City'} General Hospital`,
                    description: 'Emergency room',
                    number: '555-0123',
                    icon: 'fas fa-hospital',
                    distance: '1.2 miles',
                    available24h: true
                },
                {
                    id: 'urgent-care',
                    name: 'Urgent Care Center',
                    description: 'Non-emergency medical care',
                    number: '555-0124',
                    icon: 'fas fa-user-md',
                    distance: '0.8 miles',
                    hours: '7 AM - 10 PM'
                }
            ],
            utilities: [
                {
                    id: 'power-company',
                    name: 'Power Company',
                    description: 'Power outage reporting',
                    number: '555-0125',
                    icon: 'fas fa-bolt',
                    available24h: true
                },
                {
                    id: 'gas-company',
                    name: 'Gas Company Emergency',
                    description: 'Gas leak reporting',
                    number: '555-0126',
                    icon: 'fas fa-fire',
                    critical: true,
                    available24h: true
                }
            ],
            disaster: [
                {
                    id: 'red-cross',
                    name: 'American Red Cross',
                    description: 'Disaster relief and shelters',
                    number: '1-800-733-2767',
                    icon: 'fas fa-cross',
                    available24h: true
                },
                {
                    id: 'emergency-mgmt',
                    name: 'Emergency Management',
                    description: 'Local disaster coordination',
                    number: '555-0127',
                    icon: 'fas fa-shield-alt',
                    available24h: true
                }
            ]
        };
    }

    loadPersonalContacts() {
        const saved = localStorage.getItem('personalEmergencyContacts');
        if (saved) {
            this.personalContacts = JSON.parse(saved);
        } else {
            // Default personal contacts
            this.personalContacts = [
                {
                    id: 'personal-1',
                    name: 'Emergency Contact 1',
                    relationship: 'Family Member',
                    number: '',
                    isPrimary: true
                },
                {
                    id: 'personal-2',
                    name: 'Emergency Contact 2',
                    relationship: 'Friend',
                    number: '',
                    isPrimary: false
                }
            ];
        }
    }

    savePersonalContacts() {
        localStorage.setItem('personalEmergencyContacts', JSON.stringify(this.personalContacts));
    }

    setupEventListeners() {
        // Add personal contact button
        const addContactBtn = document.getElementById('add-personal-contact');
        if (addContactBtn) {
            addContactBtn.addEventListener('click', () => this.showAddContactModal());
        }

        // Location update button
        const updateLocationBtn = document.getElementById('update-location');
        if (updateLocationBtn) {
            updateLocationBtn.addEventListener('click', () => this.updateLocation());
        }

        // Quick dial buttons setup will be handled in renderContacts
    }

    renderContacts() {
        this.renderLocalContacts();
        this.renderPersonalContacts();
        this.updateLocationDisplay();
    }

    renderLocalContacts() {
        Object.entries(this.localContacts).forEach(([category, contacts]) => {
            const container = document.querySelector(`[data-contact-category="${category}"]`);
            if (!container) return;

            const contactsHTML = contacts.map(contact => `
                <div class="number-item ${contact.critical ? 'critical' : ''}" data-contact-id="${contact.id}">
                    <div class="number-icon">
                        <i class="${contact.icon}"></i>
                    </div>
                    <div class="number-info">
                        <h4>${contact.name}</h4>
                        <p>${contact.description}</p>
                        ${contact.distance ? `<span class="contact-distance">${contact.distance}</span>` : ''}
                        ${contact.available24h ? '<span class="available-24h">24/7</span>' : 
                          contact.hours ? `<span class="contact-hours">${contact.hours}</span>` : ''}
                    </div>
                    <div class="contact-actions">
                        <a href="tel:${contact.number}" class="emergency-number">${contact.number}</a>
                        <button class="quick-dial-btn" onclick="emergencyContacts.quickDial('${contact.number}', '${contact.name}')">
                            <i class="fas fa-phone"></i>
                        </button>
                    </div>
                </div>
            `).join('');

            container.innerHTML = contactsHTML;
        });
    }

    renderPersonalContacts() {
        const container = document.getElementById('personal-contacts-list');
        if (!container) return;

        const contactsHTML = this.personalContacts.map(contact => `
            <div class="personal-contact-item" data-contact-id="${contact.id}">
                <div class="contact-info">
                    <h4>${contact.name} ${contact.isPrimary ? '<span class="primary-badge">Primary</span>' : ''}</h4>
                    <p>${contact.relationship}</p>
                    ${contact.number ? `<a href="tel:${contact.number}" class="contact-number">${contact.number}</a>` : 
                      '<span class="no-number">No number added</span>'}
                </div>
                <div class="contact-controls">
                    <button onclick="emergencyContacts.editPersonalContact('${contact.id}')" class="btn-icon">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="emergencyContacts.deletePersonalContact('${contact.id}')" class="btn-icon">
                        <i class="fas fa-trash"></i>
                    </button>
                    ${contact.number ? `
                        <button onclick="emergencyContacts.quickDial('${contact.number}', '${contact.name}')" class="btn-icon call-btn">
                            <i class="fas fa-phone"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');

        container.innerHTML = contactsHTML;
    }

    updateLocationDisplay() {
        const locationElement = document.getElementById('current-location-display');
        if (locationElement && this.currentLocation) {
            locationElement.textContent = `${this.currentLocation.city}, ${this.currentLocation.state}`;
        }
    }

    quickDial(number, name) {
        if (confirm(`Call ${name} at ${number}?`)) {
            window.location.href = `tel:${number}`;
            
            // Log the call for emergency purposes
            this.logEmergencyCall(number, name);
        }
    }

    logEmergencyCall(number, name) {
        const callLog = JSON.parse(localStorage.getItem('emergencyCallLog') || '[]');
        callLog.unshift({
            number,
            name,
            timestamp: new Date().toISOString(),
            location: this.currentLocation
        });
        
        // Keep only last 50 calls
        if (callLog.length > 50) callLog.splice(50);
        
        localStorage.setItem('emergencyCallLog', JSON.stringify(callLog));
    }

    showAddContactModal() {
        const modal = document.createElement('div');
        modal.className = 'contact-modal';
        modal.innerHTML = `
            <div class="contact-modal-content">
                <div class="contact-modal-header">
                    <h3>Add Emergency Contact</h3>
                    <button class="close-modal" onclick="this.closest('.contact-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="contact-modal-body">
                    <form id="add-contact-form">
                        <div class="form-group">
                            <label for="contact-name">Name *</label>
                            <input type="text" id="contact-name" required>
                        </div>
                        <div class="form-group">
                            <label for="contact-relationship">Relationship *</label>
                            <select id="contact-relationship" required>
                                <option value="">Select relationship</option>
                                <option value="Family Member">Family Member</option>
                                <option value="Friend">Friend</option>
                                <option value="Colleague">Colleague</option>
                                <option value="Neighbor">Neighbor</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="contact-phone">Phone Number *</label>
                            <input type="tel" id="contact-phone" required>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="contact-primary">
                                <span class="checkmark"></span>
                                Set as primary contact
                            </label>
                        </div>
                    </form>
                </div>
                <div class="contact-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="this.closest('.contact-modal').remove()">Cancel</button>
                    <button type="submit" form="add-contact-form" class="btn btn-primary">Add Contact</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle form submission
        document.getElementById('add-contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addPersonalContact(modal);
        });
    }

    addPersonalContact(modal) {
        const formData = new FormData(document.getElementById('add-contact-form'));
        const name = formData.get('contact-name') || document.getElementById('contact-name').value;
        const relationship = formData.get('contact-relationship') || document.getElementById('contact-relationship').value;
        const number = formData.get('contact-phone') || document.getElementById('contact-phone').value;
        const isPrimary = document.getElementById('contact-primary').checked;

        if (!name || !relationship || !number) {
            alert('Please fill in all required fields');
            return;
        }

        // If setting as primary, remove primary from others
        if (isPrimary) {
            this.personalContacts.forEach(contact => contact.isPrimary = false);
        }

        const newContact = {
            id: 'personal-' + Date.now(),
            name,
            relationship,
            number,
            isPrimary
        };

        this.personalContacts.push(newContact);
        this.savePersonalContacts();
        this.renderPersonalContacts();
        
        modal.remove();
    }

    editPersonalContact(contactId) {
        const contact = this.personalContacts.find(c => c.id === contactId);
        if (!contact) return;

        const modal = document.createElement('div');
        modal.className = 'contact-modal';
        modal.innerHTML = `
            <div class="contact-modal-content">
                <div class="contact-modal-header">
                    <h3>Edit Emergency Contact</h3>
                    <button class="close-modal" onclick="this.closest('.contact-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="contact-modal-body">
                    <form id="edit-contact-form">
                        <div class="form-group">
                            <label for="edit-contact-name">Name *</label>
                            <input type="text" id="edit-contact-name" value="${contact.name}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-contact-relationship">Relationship *</label>
                            <select id="edit-contact-relationship" required>
                                <option value="Family Member" ${contact.relationship === 'Family Member' ? 'selected' : ''}>Family Member</option>
                                <option value="Friend" ${contact.relationship === 'Friend' ? 'selected' : ''}>Friend</option>
                                <option value="Colleague" ${contact.relationship === 'Colleague' ? 'selected' : ''}>Colleague</option>
                                <option value="Neighbor" ${contact.relationship === 'Neighbor' ? 'selected' : ''}>Neighbor</option>
                                <option value="Doctor" ${contact.relationship === 'Doctor' ? 'selected' : ''}>Doctor</option>
                                <option value="Other" ${contact.relationship === 'Other' ? 'selected' : ''}>Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="edit-contact-phone">Phone Number *</label>
                            <input type="tel" id="edit-contact-phone" value="${contact.number}" required>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="edit-contact-primary" ${contact.isPrimary ? 'checked' : ''}>
                                <span class="checkmark"></span>
                                Set as primary contact
                            </label>
                        </div>
                    </form>
                </div>
                <div class="contact-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="this.closest('.contact-modal').remove()">Cancel</button>
                    <button type="submit" form="edit-contact-form" class="btn btn-primary">Save Changes</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle form submission
        document.getElementById('edit-contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updatePersonalContact(contactId, modal);
        });
    }

    updatePersonalContact(contactId, modal) {
        const name = document.getElementById('edit-contact-name').value;
        const relationship = document.getElementById('edit-contact-relationship').value;
        const number = document.getElementById('edit-contact-phone').value;
        const isPrimary = document.getElementById('edit-contact-primary').checked;

        if (!name || !relationship || !number) {
            alert('Please fill in all required fields');
            return;
        }

        const contactIndex = this.personalContacts.findIndex(c => c.id === contactId);
        if (contactIndex === -1) return;

        // If setting as primary, remove primary from others
        if (isPrimary) {
            this.personalContacts.forEach(contact => contact.isPrimary = false);
        }

        this.personalContacts[contactIndex] = {
            ...this.personalContacts[contactIndex],
            name,
            relationship,
            number,
            isPrimary
        };

        this.savePersonalContacts();
        this.renderPersonalContacts();
        modal.remove();
    }

    deletePersonalContact(contactId) {
        const contact = this.personalContacts.find(c => c.id === contactId);
        if (!contact) return;

        if (confirm(`Delete emergency contact "${contact.name}"?`)) {
            this.personalContacts = this.personalContacts.filter(c => c.id !== contactId);
            this.savePersonalContacts();
            this.renderPersonalContacts();
        }
    }

    async updateLocation() {
        await this.getCurrentLocation();
        await this.loadLocalContacts();
        this.renderLocalContacts();
        this.updateLocationDisplay();
    }

    // Public method to get emergency contacts for other systems
    getEmergencyContacts() {
        return {
            local: this.localContacts,
            personal: this.personalContacts.filter(c => c.number)
        };
    }

    // Public method to get primary contact
    getPrimaryContact() {
        return this.personalContacts.find(c => c.isPrimary && c.number) || 
               this.personalContacts.find(c => c.number) || 
               null;
    }

    // Show the personal contacts management modal
    showContactsModal() {
        const modal = document.getElementById('personal-contacts-modal');
        if (modal) {
            modal.style.display = 'block';
            this.setupContactsModalListeners();
            this.renderPersonalContactsInModal();
        }
    }

    // Setup event listeners for the contacts modal
    setupContactsModalListeners() {
        const modal = document.getElementById('personal-contacts-modal');
        const closeBtn = modal.querySelector('.close');
        const addForm = document.getElementById('add-contact-form');

        // Close button
        if (closeBtn) {
            closeBtn.onclick = () => this.closeContactsModal();
        }

        // Add contact form
        if (addForm) {
            addForm.onsubmit = (e) => {
                e.preventDefault();
                this.addContactFromModal();
            };
        }

        // Close on outside click
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeContactsModal();
            }
        };
    }

    // Close the contacts modal
    closeContactsModal() {
        const modal = document.getElementById('personal-contacts-modal');
        if (modal) {
            modal.style.display = 'none';
            // Reset form
            document.getElementById('add-contact-form').reset();
        }
    }

    // Add contact from modal form
    addContactFromModal() {
        const name = document.getElementById('contact-name').value;
        const phone = document.getElementById('contact-phone').value;
        const relationship = document.getElementById('contact-relationship').value;

        if (!name || !phone || !relationship) {
            alert('Please fill in all required fields');
            return;
        }

        const newContact = {
            id: 'personal-' + Date.now(),
            name,
            number: phone,
            relationship,
            isPrimary: this.personalContacts.length === 0 // First contact is primary
        };

        this.personalContacts.push(newContact);
        this.savePersonalContacts();
        this.renderPersonalContactsInModal();
        
        // Reset form
        document.getElementById('add-contact-form').reset();
    }

    // Render personal contacts in modal
    renderPersonalContactsInModal() {
        const container = document.getElementById('contacts-display');
        if (!container) return;

        if (this.personalContacts.length === 0) {
            container.innerHTML = '<p>No emergency contacts added yet.</p>';
            return;
        }

        container.innerHTML = this.personalContacts.map(contact => `
            <div class="contact-item">
                <div class="contact-info">
                    <h4>${contact.name}</h4>
                    <p>${contact.relationship}</p>
                    <p><strong>${contact.number}</strong></p>
                    ${contact.isPrimary ? '<span class="primary-badge">Primary</span>' : ''}
                </div>
                <div class="contact-actions">
                    <button onclick="window.contactsSystem.deleteContactFromModal('${contact.id}')" class="btn btn-outline btn-small">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Delete contact from modal
    deleteContactFromModal(contactId) {
        const contact = this.personalContacts.find(c => c.id === contactId);
        if (!contact) return;

        if (confirm(`Delete emergency contact "${contact.name}"?`)) {
            this.personalContacts = this.personalContacts.filter(c => c.id !== contactId);
            this.savePersonalContacts();
            this.renderPersonalContactsInModal();
        }
    }
}
