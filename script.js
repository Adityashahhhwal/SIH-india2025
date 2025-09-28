// AI Natural Disaster Response Navigator - JavaScript

// Test console log to verify script loading
console.log('Script.js loaded successfully');
console.log('Testing if JavaScript is working...');

// Test alert to verify functionality
setTimeout(() => {
    console.log('Emergency systems should be initialized now');
    if (window.alertSystem) {
        console.log('Alert system available:', typeof window.alertSystem);
    }
    if (window.weatherSystem) {
        console.log('Weather system available:', typeof window.weatherSystem);
    }
    if (window.contactsSystem) {
        console.log('Contacts system available:', typeof window.contactsSystem);
    }
}, 2000);

// Global variables
let currentDisasterFilter = 'all';
let disasterData = [];
let isEmergencyMode = false;
let selectedDisasterType = null;
let offlineData = {
    contacts: [],
    firstAid: [],
    routes: [],
    shelters: []
};
let isOnline = navigator.onLine;
let alertData = [];
let liveUpdateData = {};
let crowdsourcedReports = [];
let notificationPermission = false;

// Initialize AppConfig if not available
if (!window.AppConfig) {
    console.log('AppConfig not found, initializing fallback config');
    window.AppConfig = {
        API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? 'http://localhost:4002' 
            : 'https://sih-india2025.onrender.com'
    };
    console.log('AppConfig initialized:', window.AppConfig);
} else {
    console.log('AppConfig found:', window.AppConfig);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    startDataSimulation();
    updateLastUpdateTime();
    initializeDropdowns();
});

// Initialize application
function initializeApp() {
    // Initialize disaster data
    disasterData = generateMockDisasterData();
    
    // Initialize offline data
    initializeOfflineData();
    
    // Initialize map controls
    initializeMapControls();
    
    // Initialize disaster type selection
    initializeDisasterTypeSelection();
    
    // Initialize checklists
    initializeChecklists();
    
    // Initialize offline mode
    initializeOfflineMode();
    
    // Initialize alerts system
    initializeAlerts();
    
    // Initialize live updates
    initializeLiveUpdates();
    
    // Initialize crowdsourced reports
    initializeCrowdsourcedReports();
    
    // Initialize emergency numbers
    initializeEmergencyNumbers();
    
    // Initialize first aid instructions
    initializeFirstAid();
    
    // Initialize survival kit checklist
    initializeSurvivalKit();
    
    // Initialize resource finder
    initializeResourceFinder();
    
    // Initialize family locator
    initializeFamilyLocator();
    
    // Initialize volunteer & aid coordination
    initializeVolunteerAid();
    
    // Initialize multilingual support
    initializeMultilingualSupport();
    
    // Initialize accessibility features
    initializeAccessibilityFeatures();
    
    // Initialize simulation/drill mode
    initializeSimulationDrill();
    
    // Initialize educational content
    initializeEducationalContent();
    
    // Initialize AI assistant
    initializeAIAssistant();
    
    // Initialize damage report tool
    initializeDamageReport();
    
    // Initialize insurance & aid resources
    initializeInsuranceAid();
    
    // Initialize mental health support
    initializeMentalHealth();
    
    // Initialize rebuilding checklists
    initializeRebuilding();
    
    // Initialize advanced features
    initializeDroneData();
    initializeSatelliteImagery();
    initializeARNavigation();
    initializeHazardPrediction();
    initializeAIRiskAdvisor();
    initializeVoiceActivation();
    initializeOfflineTranslation();
    initializeSOSBeacon();
    initializeBatterySaver();
    initializeDigitalID();
    
    // Initialize Emergency Systems
    console.log('Initializing Emergency Systems...');
    
    // Initialize Emergency Alert System
    window.alertSystem = new EmergencyAlertSystem();
    console.log('Emergency Alert System initialized');
    
    // Initialize Weather Monitoring System  
    window.weatherSystem = new WeatherMonitoringSystem();
    console.log('Weather Monitoring System initialized');
    
    // Initialize Emergency Contacts System
    window.contactsSystem = new EmergencyContactsSystem();
    console.log('Emergency Contacts System initialized');
    
    // Start real-time updates
    setInterval(updateDisasterData, 30000); // Update every 30 seconds
    setInterval(updateLastUpdateTime, 1000); // Update time every second
    setInterval(checkConnectionStatus, 5000); // Check connection every 5 seconds
    setInterval(updateLiveData, 10000); // Update live data every 10 seconds
    setInterval(generateNewAlerts, 60000); // Generate new alerts every minute
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Map filter buttons
    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const disasterType = this.getAttribute('data-disaster');
            filterDisasters(disasterType);
            updateMapButtons(disasterType);
        });
    });
    
    // Emergency buttons
    document.querySelectorAll('.emergency-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.trim();
            handleEmergencyAction(action);
        });
    });
    
    // Emergency Alert Button
    const emergencyAlertBtn = document.getElementById('emergency-alert-btn');
    if (emergencyAlertBtn) {
        emergencyAlertBtn.addEventListener('click', function() {
            console.log('Emergency alert button clicked');
            if (window.alertSystem) {
                window.alertSystem.showAlertModal();
            } else {
                console.error('Alert system not initialized');
            }
        });
    }
    
    // Personal Contacts Button (from user menu)
    const emergencyContactsBtn = document.getElementById('emergency-contacts');
    if (emergencyContactsBtn) {
        emergencyContactsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Emergency contacts button clicked');
            if (window.contactsSystem) {
                window.contactsSystem.showContactsModal();
            } else {
                console.error('Contacts system not initialized');
            }
        });
    }
    
    // Resource card buttons
    document.querySelectorAll('.resource-card .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceType = this.closest('.resource-card').querySelector('h3').textContent;
            handleResourceAction(resourceType);
        });
    });
}

// Generate mock disaster data for demonstration
function generateMockDisasterData() {
    return [
        {
            id: 1,
            type: 'hurricane',
            name: 'Hurricane Maria',
            location: { lat: 25.7617, lng: -80.1918 },
            intensity: 'Category 4',
            riskLevel: 'high',
            confidence: 94,
            eta: '48 hours',
            status: 'active',
            affectedPopulation: 1500000,
            evacuationZones: ['Zone A', 'Zone B', 'Zone C']
        },
        {
            id: 2,
            type: 'wildfire',
            name: 'Creek Fire',
            location: { lat: 37.7749, lng: -119.4194 },
            intensity: 'Large',
            riskLevel: 'medium',
            confidence: 78,
            eta: '12 hours',
            status: 'active',
            affectedPopulation: 50000,
            evacuationZones: ['Zone 1', 'Zone 2']
        },
        {
            id: 3,
            type: 'flood',
            name: 'Mississippi River Flood',
            location: { lat: 29.9511, lng: -90.0715 },
            intensity: 'Major',
            riskLevel: 'low',
            confidence: 65,
            eta: '72 hours',
            status: 'monitoring',
            affectedPopulation: 200000,
            evacuationZones: ['Low-lying areas']
        },
        {
            id: 4,
            type: 'earthquake',
            name: 'San Andreas Fault',
            location: { lat: 34.0522, lng: -118.2437 },
            intensity: '7.2 Magnitude',
            riskLevel: 'high',
            confidence: 89,
            eta: '6 hours',
            status: 'imminent',
            affectedPopulation: 10000000,
            evacuationZones: ['All coastal areas']
        }
    ];
}

// Initialize map controls
function initializeMapControls() {
    updateMapVisualization();
}

// Filter disasters by type
function filterDisasters(type) {
    currentDisasterFilter = type;
    updateMapVisualization();
    updatePredictionCards();
}

// Update map buttons
function updateMapButtons(activeType) {
    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-disaster') === activeType) {
            btn.classList.add('active');
        }
    });
}

// Update map visualization
function updateMapVisualization() {
    const filteredData = currentDisasterFilter === 'all' 
        ? disasterData 
        : disasterData.filter(disaster => disaster.type === currentDisasterFilter);
    
    // Update map placeholder with filtered data
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        const disasterCount = filteredData.length;
        const activeCount = filteredData.filter(d => d.status === 'active' || d.status === 'imminent').length;
        
        mapPlaceholder.innerHTML = `
            <i class="fas fa-map-marked-alt"></i>
            <h3>Interactive Map</h3>
            <p>Showing ${disasterCount} disaster${disasterCount !== 1 ? 's' : ''} (${activeCount} active)</p>
            <div class="map-features">
                <div class="feature">
                    <i class="fas fa-satellite"></i>
                    <span>Satellite Imagery</span>
                </div>
                <div class="feature">
                    <i class="fas fa-route"></i>
                    <span>Evacuation Routes</span>
                </div>
                <div class="feature">
                    <i class="fas fa-users"></i>
                    <span>Population Density</span>
                </div>
            </div>
        `;
    }
}

// Update prediction cards
function updatePredictionCards() {
    const filteredData = currentDisasterFilter === 'all' 
        ? disasterData 
        : disasterData.filter(disaster => disaster.type === currentDisasterFilter);
    
    // Update each prediction card with real data
    const predictionCards = document.querySelectorAll('.prediction-card');
    predictionCards.forEach((card, index) => {
        if (filteredData[index]) {
            const disaster = filteredData[index];
            const riskLevel = card.querySelector('.risk-level');
            const confidence = card.querySelector('.confidence');
            const timeline = card.querySelector('.timeline');
            const progressFill = card.querySelector('.progress-fill');
            
            if (riskLevel) {
                riskLevel.textContent = `${disaster.riskLevel.charAt(0).toUpperCase() + disaster.riskLevel.slice(1)} Risk`;
                riskLevel.className = `risk-level ${disaster.riskLevel}`;
            }
            
            if (confidence) {
                confidence.textContent = `Confidence: ${disaster.confidence}%`;
            }
            
            if (timeline) {
                timeline.textContent = `ETA: ${disaster.eta}`;
            }
            
            if (progressFill) {
                progressFill.style.width = `${disaster.confidence}%`;
            }
        }
    });
}

// Simulate real-time data updates
function startDataSimulation() {
    setInterval(() => {
        // Simulate data changes
        disasterData.forEach(disaster => {
            // Randomly update confidence levels
            if (Math.random() < 0.3) {
                disaster.confidence = Math.max(50, Math.min(99, disaster.confidence + (Math.random() - 0.5) * 10));
            }
            
            // Update ETA
            if (disaster.status === 'active' || disaster.status === 'imminent') {
                const currentEta = parseInt(disaster.eta);
                if (currentEta > 0) {
                    disaster.eta = `${Math.max(0, currentEta - 1)} hours`;
                }
            }
        });
        
        updatePredictionCards();
        updateMapVisualization();
    }, 5000); // Update every 5 seconds
}

// Update disaster data
function updateDisasterData() {
    // Simulate new disaster events
    if (Math.random() < 0.1) { // 10% chance of new disaster
        const newDisaster = generateRandomDisaster();
        disasterData.push(newDisaster);
        updateMapVisualization();
    }
}

// Generate random disaster for simulation
function generateRandomDisaster() {
    const types = ['hurricane', 'wildfire', 'flood', 'earthquake'];
    const riskLevels = ['low', 'medium', 'high'];
    const statuses = ['monitoring', 'active', 'imminent'];
    
    const type = types[Math.floor(Math.random() * types.length)];
    const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
        id: Date.now(),
        type: type,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Event ${Math.floor(Math.random() * 1000)}`,
        location: {
            lat: 25 + Math.random() * 20,
            lng: -80 - Math.random() * 40
        },
        intensity: 'Unknown',
        riskLevel: riskLevel,
        confidence: Math.floor(Math.random() * 40) + 50,
        eta: `${Math.floor(Math.random() * 72)} hours`,
        status: status,
        affectedPopulation: Math.floor(Math.random() * 1000000),
        evacuationZones: ['Zone A']
    };
}

// Handle emergency actions
function handleEmergencyAction(action) {
    if (action.includes('Call 911')) {
        if (confirm('Are you sure you want to call 911? This will dial emergency services.')) {
            window.location.href = 'tel:911';
        }
    } else if (action.includes('Send Alert')) {
        sendEmergencyAlert();
    } else if (action.includes('Share Location')) {
        shareCurrentLocation();
    }
}

// Send emergency alert
function sendEmergencyAlert() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const alert = {
                    type: 'emergency',
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
                    timestamp: new Date().toISOString(),
                    message: 'Emergency assistance requested'
                };
                
                // Simulate sending alert
                showNotification('Emergency alert sent to local authorities', 'success');
                console.log('Emergency alert:', alert);
            },
            function(error) {
                showNotification('Unable to get location. Please call 911 directly.', 'error');
            }
        );
    } else {
        showNotification('Location services not available. Please call 911 directly.', 'error');
    }
}

// Share current location
function shareCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const location = `${position.coords.latitude}, ${position.coords.longitude}`;
                if (navigator.share) {
                    navigator.share({
                        title: 'My Location - Emergency',
                        text: `My current location: ${location}`,
                        url: `https://maps.google.com/?q=${location}`
                    });
                } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(location).then(() => {
                        showNotification('Location copied to clipboard', 'success');
                    });
                }
            },
            function(error) {
                showNotification('Unable to get location', 'error');
            }
        );
    } else {
        showNotification('Location services not available', 'error');
    }
}

// Handle resource actions
function handleResourceAction(resourceType) {
    switch (resourceType) {
        case 'Emergency Contacts':
            showEmergencyContacts();
            break;
        case 'First Aid Guide':
            showFirstAidGuide();
            break;
        case 'Shelter Locator':
            showShelterLocator();
            break;
        case 'Supply Checklist':
            showSupplyChecklist();
            break;
        default:
            showNotification(`${resourceType} feature coming soon`, 'info');
    }
}

// Show emergency contacts
function showEmergencyContacts() {
    const contacts = [
        { name: 'Emergency Services', number: '911', description: 'Police, Fire, Medical' },
        { name: 'FEMA', number: '1-800-621-3362', description: 'Federal Emergency Management' },
        { name: 'Red Cross', number: '1-800-733-2767', description: 'Disaster Relief' },
        { name: 'National Weather Service', number: '1-800-427-7623', description: 'Weather Updates' }
    ];
    
    showModal('Emergency Contacts', contacts.map(contact => 
        `<div class="contact-item">
            <h4>${contact.name}</h4>
            <p>${contact.description}</p>
            <a href="tel:${contact.number}" class="btn btn-primary">${contact.number}</a>
        </div>`
    ).join(''));
}

// Show first aid guide
function showFirstAidGuide() {
    const guide = [
        { title: 'CPR', steps: ['Check for responsiveness', 'Call 911', 'Begin chest compressions', 'Give rescue breaths'] },
        { title: 'Bleeding Control', steps: ['Apply direct pressure', 'Elevate the injury', 'Use pressure points', 'Apply tourniquet if necessary'] },
        { title: 'Shock Treatment', steps: ['Keep person lying down', 'Elevate feet', 'Keep warm', 'Monitor breathing'] }
    ];
    
    showModal('First Aid Guide', guide.map(item => 
        `<div class="guide-item">
            <h4>${item.title}</h4>
            <ol>${item.steps.map(step => `<li>${step}</li>`).join('')}</ol>
        </div>`
    ).join(''));
}

// Show shelter locator
function showShelterLocator() {
    const shelters = [
        { name: 'Central High School', address: '123 Main St', capacity: 500, status: 'Open' },
        { name: 'Community Center', address: '456 Oak Ave', capacity: 300, status: 'Open' },
        { name: 'City Hall', address: '789 Pine St', capacity: 200, status: 'Full' }
    ];
    
    showModal('Emergency Shelters', shelters.map(shelter => 
        `<div class="shelter-item">
            <h4>${shelter.name}</h4>
            <p>${shelter.address}</p>
            <p>Capacity: ${shelter.capacity} people</p>
            <span class="status ${shelter.status.toLowerCase()}">${shelter.status}</span>
        </div>`
    ).join(''));
}

// Show supply checklist
function showSupplyChecklist() {
    const supplies = [
        { category: 'Water & Food', items: ['1 gallon water per person per day', 'Non-perishable food', 'Manual can opener', 'Pet food'] },
        { category: 'Medical', items: ['First aid kit', 'Prescription medications', 'Medical supplies', 'Sanitation items'] },
        { category: 'Tools & Safety', items: ['Flashlight with batteries', 'Radio', 'Multi-tool', 'Whistle', 'Dust masks'] },
        { category: 'Important Documents', items: ['Insurance policies', 'Bank account records', 'ID cards', 'Emergency contact list'] }
    ];
    
    showModal('Emergency Supply Checklist', supplies.map(category => 
        `<div class="supply-category">
            <h4>${category.category}</h4>
            <ul>${category.items.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>`
    ).join(''));
}

// Show modal dialog
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Update last update time
function updateLastUpdateTime() {
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (lastUpdateElement) {
        const now = new Date();
        lastUpdateElement.textContent = now.toLocaleTimeString();
    }
}

// Initialize disaster type selection
function initializeDisasterTypeSelection() {
    const disasterCards = document.querySelectorAll('.disaster-type-card');
    
    disasterCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            disasterCards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked card
            this.classList.add('selected');
            
            // Get disaster type
            selectedDisasterType = this.getAttribute('data-disaster');
            
            // Show tailored guidance
            showTailoredGuidance(selectedDisasterType);
            
            // Update other sections based on disaster type
            updateDisasterSpecificContent(selectedDisasterType);
        });
    });
}

// Show tailored guidance based on disaster type
function showTailoredGuidance(disasterType) {
    const guidance = {
        flood: {
            title: "Flood Safety Guidance",
            steps: [
                "Move to higher ground immediately",
                "Avoid walking or driving through flood waters",
                "Turn off electricity at the main breaker",
                "Listen to emergency broadcasts for updates"
            ],
            emergency: "If trapped in a building, go to the highest floor"
        },
        fire: {
            title: "Wildfire Safety Guidance", 
            steps: [
                "Evacuate immediately if ordered",
                "Close all windows and doors",
                "Turn off gas and electricity",
                "Wear protective clothing and mask"
            ],
            emergency: "If trapped, find a body of water or cleared area"
        },
        earthquake: {
            title: "Earthquake Safety Guidance",
            steps: [
                "Drop, cover, and hold on",
                "Stay indoors until shaking stops",
                "Stay away from windows and heavy objects",
                "Be prepared for aftershocks"
            ],
            emergency: "If outdoors, move to an open area away from buildings"
        },
        hurricane: {
            title: "Hurricane Safety Guidance",
            steps: [
                "Evacuate if ordered by authorities",
                "Board up windows and secure outdoor items",
                "Fill bathtubs with water for emergency use",
                "Stay indoors during the storm"
            ],
            emergency: "If in a high-rise, go to a lower floor"
        },
        tornado: {
            title: "Tornado Safety Guidance",
            steps: [
                "Go to the lowest level of your home",
                "Get under a sturdy piece of furniture",
                "Cover your head and neck",
                "Stay away from windows"
            ],
            emergency: "If in a mobile home, evacuate to a sturdy building"
        },
        winter: {
            title: "Winter Storm Safety Guidance",
            steps: [
                "Stay indoors and dress warmly",
                "Conserve fuel by lowering thermostat",
                "Keep pipes from freezing",
                "Have emergency supplies ready"
            ],
            emergency: "If stranded in a vehicle, stay inside and run engine sparingly"
        }
    };
    
    const guidanceData = guidance[disasterType];
    if (guidanceData) {
        showNotification(`Selected: ${guidanceData.title}`, 'info');
        
        // Update checklist content based on disaster type
        updateChecklistForDisasterType(disasterType);
    }
}

// Update checklist content for specific disaster type
function updateChecklistForDisasterType(disasterType) {
    const disasterSpecificChecklists = {
        flood: {
            pre: [
                "Install flood barriers or sandbags",
                "Elevate electrical outlets and switches",
                "Install backflow valves in drains",
                "Keep important documents in waterproof containers"
            ],
            during: [
                "Move to higher ground immediately",
                "Avoid walking through flood waters",
                "Turn off electricity at main breaker",
                "Listen to emergency broadcasts"
            ],
            post: [
                "Check for structural damage",
                "Document damage with photos",
                "Contact insurance company",
                "Clean and disinfect affected areas"
            ]
        },
        fire: {
            pre: [
                "Create defensible space around home",
                "Remove flammable materials from yard",
                "Install smoke detectors and fire extinguishers",
                "Plan evacuation routes"
            ],
            during: [
                "Evacuate immediately if ordered",
                "Close all windows and doors",
                "Turn off gas and electricity",
                "Wear protective clothing"
            ],
            post: [
                "Wait for official clearance to return",
                "Check for hot spots and embers",
                "Document damage for insurance",
                "Contact utility companies"
            ]
        }
        // Add more disaster types as needed
    };
    
    // This would update the checklist content dynamically
    // Implementation would depend on specific requirements
}

// Update disaster-specific content
function updateDisasterSpecificContent(disasterType) {
    // Update map overlays based on disaster type
    updateMapOverlaysForDisaster(disasterType);
    
    // Update emergency contacts
    updateEmergencyContactsForDisaster(disasterType);
    
    // Update resource recommendations
    updateResourceRecommendations(disasterType);
}

// Initialize checklists
function initializeChecklists() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const checklistPhases = document.querySelectorAll('.checklist-phase');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phase = this.getAttribute('data-phase');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active phase
            checklistPhases.forEach(phase => phase.classList.remove('active'));
            document.getElementById(`${phase}-disaster`).classList.add('active');
        });
    });
    
    // Add checklist item functionality
    const checkboxes = document.querySelectorAll('.checklist-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateChecklistProgress();
            saveChecklistProgress();
        });
    });
}

// Update checklist progress
function updateChecklistProgress() {
    const phases = ['pre', 'during', 'post'];
    
    phases.forEach(phase => {
        const checkboxes = document.querySelectorAll(`#${phase}-disaster input[type="checkbox"]`);
        const checked = document.querySelectorAll(`#${phase}-disaster input[type="checkbox"]:checked`);
        const progress = (checked.length / checkboxes.length) * 100;
        
        // Update progress indicator if it exists
        const progressBar = document.querySelector(`#${phase}-disaster .progress-bar`);
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    });
}

// Save checklist progress to localStorage
function saveChecklistProgress() {
    const checkboxes = document.querySelectorAll('.checklist-list input[type="checkbox"]');
    const progress = {};
    
    checkboxes.forEach(checkbox => {
        progress[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('checklistProgress', JSON.stringify(progress));
}

// Load checklist progress from localStorage
function loadChecklistProgress() {
    const savedProgress = localStorage.getItem('checklistProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        
        Object.keys(progress).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = progress[id];
            }
        });
        
        updateChecklistProgress();
    }
}

// Initialize offline mode
function initializeOfflineMode() {
    // Check if service worker is supported
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
    
    // Set up offline data download
    const downloadButton = document.getElementById('download-offline');
    if (downloadButton) {
        downloadButton.addEventListener('click', downloadOfflineData);
    }
    
    // Set up offline data management
    const clearButton = document.getElementById('clear-offline');
    const refreshButton = document.getElementById('refresh-offline');
    
    if (clearButton) {
        clearButton.addEventListener('click', clearOfflineData);
    }
    
    if (refreshButton) {
        refreshButton.addEventListener('click', refreshOfflineData);
    }
    
    // Load offline data
    loadOfflineData();
}

// Initialize offline data
function initializeOfflineData() {
    offlineData = {
        contacts: [
            { name: 'Emergency Services', number: '911', type: 'emergency' },
            { name: 'FEMA', number: '1-800-621-3362', type: 'federal' },
            { name: 'Red Cross', number: '1-800-733-2767', type: 'relief' },
            { name: 'Poison Control', number: '1-800-222-1222', type: 'medical' }
        ],
        firstAid: [
            { procedure: 'CPR', steps: ['Check responsiveness', 'Call 911', 'Begin compressions', 'Give rescue breaths'] },
            { procedure: 'Bleeding Control', steps: ['Apply direct pressure', 'Elevate injury', 'Use pressure points'] },
            { procedure: 'Shock Treatment', steps: ['Keep person lying down', 'Elevate feet', 'Keep warm'] }
        ],
        routes: [
            { name: 'Primary Route', path: 'Main St → Highway 101', status: 'open' },
            { name: 'Secondary Route', path: 'Oak Ave → Route 66', status: 'open' },
            { name: 'Emergency Route', path: 'Back roads → County Line', status: 'open' }
        ],
        shelters: [
            { name: 'Central High School', address: '123 Main St', distance: '0.8 miles', capacity: 500 },
            { name: 'Community Center', address: '456 Oak Ave', distance: '1.2 miles', capacity: 300 },
            { name: 'City Hall', address: '789 Pine St', distance: '1.5 miles', capacity: 200 }
        ]
    };
}

// Download offline data
function downloadOfflineData() {
    const dataToStore = {
        contacts: offlineData.contacts,
        firstAid: offlineData.firstAid,
        routes: offlineData.routes,
        shelters: offlineData.shelters,
        timestamp: new Date().toISOString()
    };
    
    // Store in localStorage
    localStorage.setItem('offlineDisasterData', JSON.stringify(dataToStore));
    
    // Store in IndexedDB for larger data
    if ('indexedDB' in window) {
        const request = indexedDB.open('DisasterAppDB', 1);
        
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            const store = db.createObjectStore('offlineData', { keyPath: 'id' });
        };
        
        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(['offlineData'], 'readwrite');
            const store = transaction.objectStore('offlineData');
            
            store.put({ id: 'disasterData', data: dataToStore });
        };
    }
    
    showNotification('Offline data downloaded successfully', 'success');
    updateOfflineStatus();
}

// Load offline data
function loadOfflineData() {
    const savedData = localStorage.getItem('offlineDisasterData');
    if (savedData) {
        const data = JSON.parse(savedData);
        offlineData = { ...offlineData, ...data };
        updateOfflineStatus();
    }
}

// Clear offline data
function clearOfflineData() {
    if (confirm('Are you sure you want to clear all offline data?')) {
        localStorage.removeItem('offlineDisasterData');
        localStorage.removeItem('checklistProgress');
        
        if ('indexedDB' in window) {
            const request = indexedDB.deleteDatabase('DisasterAppDB');
        }
        
        showNotification('Offline data cleared', 'info');
        updateOfflineStatus();
    }
}

// Refresh offline data
function refreshOfflineData() {
    downloadOfflineData();
    showNotification('Offline data refreshed', 'success');
}

// Update offline status
function updateOfflineStatus() {
    const hasOfflineData = localStorage.getItem('offlineDisasterData') !== null;
    const statusElements = document.querySelectorAll('.storage-item');
    
    statusElements.forEach((element, index) => {
        const icon = element.querySelector('i');
        if (icon) {
            icon.className = hasOfflineData ? 'fas fa-check-circle' : 'fas fa-times-circle';
            icon.style.color = hasOfflineData ? '#2ed573' : '#ff4757';
        }
    });
}

// Check connection status
function checkConnectionStatus() {
    const wasOnline = isOnline;
    isOnline = navigator.onLine;
    
    if (wasOnline !== isOnline) {
        updateConnectionIndicator();
        
        if (isOnline) {
            showNotification('Connection restored', 'success');
        } else {
            showNotification('Connection lost - Offline mode active', 'warning');
        }
    }
}

// Update connection indicator
function updateConnectionIndicator() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.getElementById('connection-status');
    
    if (statusDot && statusText) {
        if (isOnline) {
            statusDot.className = 'status-dot online';
            statusText.textContent = 'Online';
        } else {
            statusDot.className = 'status-dot offline';
            statusText.textContent = 'Offline';
        }
    }
}

// Update map overlays for specific disaster
function updateMapOverlaysForDisaster(disasterType) {
    const overlayCheckboxes = document.querySelectorAll('.overlay-toggle input[type="checkbox"]');
    
    // Reset all overlays
    overlayCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Enable relevant overlays based on disaster type
    switch (disasterType) {
        case 'flood':
            document.getElementById('evacuation-routes').checked = true;
            document.getElementById('shelters').checked = true;
            break;
        case 'fire':
            document.getElementById('evacuation-routes').checked = true;
            document.getElementById('safe-zones').checked = true;
            break;
        case 'earthquake':
            document.getElementById('hospitals').checked = true;
            document.getElementById('shelters').checked = true;
            break;
        case 'hurricane':
            document.getElementById('evacuation-routes').checked = true;
            document.getElementById('shelters').checked = true;
            document.getElementById('supply-centers').checked = true;
            break;
        default:
            document.getElementById('evacuation-routes').checked = true;
            document.getElementById('shelters').checked = true;
    }
}

// Update emergency contacts for disaster type
function updateEmergencyContactsForDisaster(disasterType) {
    const disasterSpecificContacts = {
        flood: ['FEMA', 'National Weather Service', 'Local Emergency Management'],
        fire: ['Fire Department', 'Forest Service', 'Air Quality Control'],
        earthquake: ['USGS', 'Emergency Services', 'Structural Engineers'],
        hurricane: ['National Hurricane Center', 'FEMA', 'Coast Guard']
    };
    
    // This would update the emergency contacts display
    // Implementation depends on specific UI requirements
}

// Update resource recommendations
function updateResourceRecommendations(disasterType) {
    const recommendations = {
        flood: ['Sandbags', 'Waterproof containers', 'Emergency radio'],
        fire: ['N95 masks', 'Fire extinguisher', 'Emergency blankets'],
        earthquake: ['Emergency kit', 'First aid supplies', 'Sturdy shoes'],
        hurricane: ['Battery-powered radio', 'Flashlights', 'Non-perishable food']
    };
    
    // This would update the resource recommendations
    // Implementation depends on specific UI requirements
}

// Initialize alerts system
function initializeAlerts() {
    // Initialize alert data
    alertData = generateMockAlertData();
    
    // Set up notification permission
    requestNotificationPermission();
    
    // Set up alert settings
    setupAlertSettings();
    
    // Update alert display
    updateAlertDisplay();
}

// Generate mock alert data
function generateMockAlertData() {
    return [
        {
            id: 1,
            type: 'critical',
            title: 'Hurricane Warning',
            message: 'Category 3 hurricane approaching within 24 hours. Evacuation orders issued for Zone A.',
            source: 'National Weather Service',
            timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
            priority: 'high'
        },
        {
            id: 2,
            type: 'warning',
            title: 'Road Closure',
            message: 'Highway 101 closed due to flooding between exits 15-18. Use alternate route.',
            source: 'DOT',
            timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
            priority: 'medium'
        },
        {
            id: 3,
            type: 'info',
            title: 'Shelter Update',
            message: 'Central High School shelter now at 80% capacity. Additional shelters opening.',
            source: 'Emergency Management',
            timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
            priority: 'low'
        }
    ];
}

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            notificationPermission = permission === 'granted';
            updateNotificationButton();
        });
    }
}

// Update notification button
function updateNotificationButton() {
    const button = document.getElementById('enable-notifications');
    if (button) {
        if (notificationPermission) {
            button.innerHTML = '<i class="fas fa-bell-slash"></i> Disable Notifications';
            button.classList.remove('btn-primary');
            button.classList.add('btn-secondary');
        } else {
            button.innerHTML = '<i class="fas fa-bell"></i> Enable Push Notifications';
            button.classList.remove('btn-secondary');
            button.classList.add('btn-primary');
        }
    }
}

// Setup alert settings
function setupAlertSettings() {
    const enableButton = document.getElementById('enable-notifications');
    if (enableButton) {
        enableButton.addEventListener('click', toggleNotifications);
    }
    
    // Set up alert type checkboxes
    const alertCheckboxes = document.querySelectorAll('.setting-item input[type="checkbox"]');
    alertCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateAlertSettings);
    });
}

// Toggle notifications
function toggleNotifications() {
    if (notificationPermission) {
        notificationPermission = false;
        showNotification('Notifications disabled', 'info');
    } else {
        requestNotificationPermission();
    }
    updateNotificationButton();
}

// Update alert settings
function updateAlertSettings() {
    const settings = {
        weather: document.getElementById('weather-alerts').checked,
        emergency: document.getElementById('emergency-alerts').checked,
        evacuation: document.getElementById('evacuation-alerts').checked,
        roadClosures: document.getElementById('road-closures').checked
    };
    
    localStorage.setItem('alertSettings', JSON.stringify(settings));
    showNotification('Alert settings updated', 'success');
}

// Update alert display
function updateAlertDisplay() {
    const alertList = document.getElementById('alert-list');
    if (!alertList) return;
    
    // Sort alerts by timestamp (newest first)
    const sortedAlerts = alertData.sort((a, b) => b.timestamp - a.timestamp);
    
    alertList.innerHTML = sortedAlerts.map(alert => `
        <div class="alert-item ${alert.type}">
            <div class="alert-icon">
                <i class="fas fa-${getAlertIcon(alert.type)}"></i>
            </div>
            <div class="alert-content">
                <h4>${alert.title}</h4>
                <p>${alert.message}</p>
                <div class="alert-meta">
                    <span class="alert-source">${alert.source}</span>
                    <span class="alert-time">${getTimeAgo(alert.timestamp)}</span>
                </div>
            </div>
            <div class="alert-actions">
                <button class="btn btn-small" onclick="viewAlertDetails(${alert.id})">View Details</button>
            </div>
        </div>
    `).join('');
    
    // Update last alert time
    const lastAlertTime = document.getElementById('last-alert-time');
    if (lastAlertTime && sortedAlerts.length > 0) {
        lastAlertTime.textContent = getTimeAgo(sortedAlerts[0].timestamp);
    }
}

// Get alert icon based on type
function getAlertIcon(type) {
    const icons = {
        critical: 'exclamation-triangle',
        warning: 'road',
        info: 'home'
    };
    return icons[type] || 'info-circle';
}

// Get time ago string
function getTimeAgo(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
}

// View alert details
function viewAlertDetails(alertId) {
    const alert = alertData.find(a => a.id === alertId);
    if (alert) {
        showModal('Alert Details', `
            <div class="alert-details">
                <h3>${alert.title}</h3>
                <p><strong>Source:</strong> ${alert.source}</p>
                <p><strong>Priority:</strong> ${alert.priority}</p>
                <p><strong>Time:</strong> ${alert.timestamp.toLocaleString()}</p>
                <p><strong>Message:</strong></p>
                <p>${alert.message}</p>
            </div>
        `);
    }
}

// Generate new alerts
function generateNewAlerts() {
    if (Math.random() < 0.3) { // 30% chance of new alert
        const alertTypes = ['critical', 'warning', 'info'];
        const sources = ['National Weather Service', 'DOT', 'Emergency Management', 'FEMA'];
        const titles = [
            'Weather Alert Update',
            'Road Status Change',
            'Shelter Capacity Update',
            'Emergency Services Update'
        ];
        
        const newAlert = {
            id: Date.now(),
            type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
            title: titles[Math.floor(Math.random() * titles.length)],
            message: 'New information available. Please check for updates.',
            source: sources[Math.floor(Math.random() * sources.length)],
            timestamp: new Date(),
            priority: 'medium'
        };
        
        alertData.unshift(newAlert);
        updateAlertDisplay();
        
        // Send notification if enabled
        if (notificationPermission) {
            sendNotification(newAlert);
        }
    }
}

// Send push notification
function sendNotification(alert) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(alert.title, {
            body: alert.message,
            icon: '/favicon.ico',
            tag: alert.id
        });
    }
}

// Initialize live updates
function initializeLiveUpdates() {
    // Initialize live data
    liveUpdateData = {
        shelters: [
            { name: 'Central High School', address: '123 Main St', distance: '0.8 miles', capacity: 80, maxCapacity: 100 },
            { name: 'Community Center', address: '456 Oak Ave', distance: '1.2 miles', capacity: 45, maxCapacity: 100 },
            { name: 'City Hall', address: '789 Pine St', distance: '1.5 miles', capacity: 100, maxCapacity: 100 }
        ],
        roads: [
            { name: 'Highway 101', status: 'closed', reason: 'Flooding', section: 'Exits 15-18' },
            { name: 'Main Street', status: 'closed', reason: 'Debris', section: 'Between Oak & Pine' },
            { name: 'Route 66', status: 'open', reason: 'Clear', section: 'All lanes' }
        ],
        wildfire: {
            acresBurned: 2500,
            containment: 15,
            structuresLost: 0
        },
        flood: {
            currentLevel: 8.5,
            floodStage: 10.0,
            status: 'Rising'
        }
    };
    
    updateLiveDisplay();
}

// Update live data
function updateLiveData() {
    // Simulate data changes
    if (liveUpdateData.shelters) {
        liveUpdateData.shelters.forEach(shelter => {
            // Randomly change capacity
            if (Math.random() < 0.1) {
                shelter.capacity = Math.max(0, Math.min(100, shelter.capacity + (Math.random() - 0.5) * 10));
            }
        });
    }
    
    if (liveUpdateData.wildfire) {
        // Simulate wildfire spread
        if (Math.random() < 0.2) {
            liveUpdateData.wildfire.acresBurned += Math.floor(Math.random() * 50);
            liveUpdateData.wildfire.containment = Math.max(0, Math.min(100, liveUpdateData.wildfire.containment + (Math.random() - 0.3) * 5));
        }
    }
    
    if (liveUpdateData.flood) {
        // Simulate flood level changes
        if (Math.random() < 0.3) {
            liveUpdateData.flood.currentLevel += (Math.random() - 0.5) * 0.2;
            liveUpdateData.flood.currentLevel = Math.max(0, liveUpdateData.flood.currentLevel);
        }
    }
    
    updateLiveDisplay();
}

// Update live display
function updateLiveDisplay() {
    updateShelterDisplay();
    updateRoadDisplay();
    updateWildfireDisplay();
    updateFloodDisplay();
}

// Update shelter display
function updateShelterDisplay() {
    const shelterItems = document.querySelectorAll('.shelter-item');
    if (shelterItems.length === 0 || !liveUpdateData.shelters) return;
    
    shelterItems.forEach((item, index) => {
        if (liveUpdateData.shelters[index]) {
            const shelter = liveUpdateData.shelters[index];
            const capacityFill = item.querySelector('.capacity-fill');
            const capacityText = item.querySelector('.capacity-text');
            
            if (capacityFill) {
                capacityFill.style.width = `${shelter.capacity}%`;
            }
            
            if (capacityText) {
                capacityText.textContent = shelter.capacity === 100 ? 'Full' : `${shelter.capacity}% Full`;
            }
        }
    });
}

// Update road display
function updateRoadDisplay() {
    const roadItems = document.querySelectorAll('.road-item');
    if (roadItems.length === 0 || !liveUpdateData.roads) return;
    
    roadItems.forEach((item, index) => {
        if (liveUpdateData.roads[index]) {
            const road = liveUpdateData.roads[index];
            const statusElement = item.querySelector('.road-status');
            
            if (statusElement) {
                statusElement.textContent = road.status === 'open' ? 'Open' : 'Closed';
            }
        }
    });
}

// Update wildfire display
function updateWildfireDisplay() {
    if (!liveUpdateData.wildfire) return;
    
    const statValues = document.querySelectorAll('.fire-stat .stat-value');
    const progressFill = document.querySelector('.fire-progress .progress-fill');
    
    if (statValues.length >= 3) {
        statValues[0].textContent = liveUpdateData.wildfire.acresBurned.toLocaleString();
        statValues[1].textContent = `${liveUpdateData.wildfire.containment}%`;
        statValues[2].textContent = liveUpdateData.wildfire.structuresLost;
    }
    
    if (progressFill) {
        progressFill.style.width = `${liveUpdateData.wildfire.containment}%`;
    }
}

// Update flood display
function updateFloodDisplay() {
    if (!liveUpdateData.flood) return;
    
    const gaugeFill = document.querySelector('.gauge-fill');
    const gaugeLabel = document.querySelector('.gauge-label');
    const floodDetails = document.querySelector('.flood-details');
    
    if (gaugeFill) {
        const percentage = (liveUpdateData.flood.currentLevel / liveUpdateData.flood.floodStage) * 100;
        gaugeFill.style.height = `${Math.min(100, percentage)}%`;
    }
    
    if (gaugeLabel) {
        const percentage = Math.round((liveUpdateData.flood.currentLevel / liveUpdateData.flood.floodStage) * 100);
        gaugeLabel.textContent = `${percentage}%`;
    }
    
    if (floodDetails) {
        const currentLevel = floodDetails.querySelector('p:nth-child(2)');
        const status = floodDetails.querySelector('.status-warning');
        
        if (currentLevel) {
            currentLevel.textContent = `Current: ${liveUpdateData.flood.currentLevel.toFixed(1)} ft`;
        }
        
        if (status) {
            status.textContent = liveUpdateData.flood.status;
        }
    }
}

// Initialize crowdsourced reports
function initializeCrowdsourcedReports() {
    // Initialize reports data
    crowdsourcedReports = generateMockReports();
    
    // Set up report filters
    setupReportFilters();
    
    // Set up report actions
    setupReportActions();
    
    // Update reports display
    updateReportsDisplay();
}

// Generate mock reports
function generateMockReports() {
    return [
        {
            id: 1,
            type: 'safe-zone',
            title: 'Safe Zone Confirmed',
            message: 'Central Park is safe and accessible. No flooding or debris. Emergency services present.',
            location: 'Central Park, Downtown',
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
            verified: true,
            reporter: 'Community Member'
        },
        {
            id: 2,
            type: 'blocked-road',
            title: 'Road Blocked',
            message: 'Main Street between 5th and 6th Avenue is completely blocked by fallen tree. Avoid this route.',
            location: 'Main Street, Downtown',
            timestamp: new Date(Date.now() - 12 * 60 * 1000),
            verified: false,
            reporter: 'Local Resident'
        },
        {
            id: 3,
            type: 'urgent-need',
            title: 'Urgent Medical Need',
            message: 'Elderly person needs medical attention at 123 Oak Street. No power, no phone. Please help.',
            location: '123 Oak Street',
            timestamp: new Date(Date.now() - 8 * 60 * 1000),
            verified: true,
            reporter: 'Neighbor'
        },
        {
            id: 4,
            type: 'hazard',
            title: 'Gas Leak Reported',
            message: 'Strong gas smell near 456 Pine Street. Fire department has been notified. Avoid area.',
            location: '456 Pine Street',
            timestamp: new Date(Date.now() - 3 * 60 * 1000),
            verified: false,
            reporter: 'Concerned Citizen'
        }
    ];
}

// Setup report filters
function setupReportFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter reports
            const filterType = this.getAttribute('data-type');
            filterReports(filterType);
        });
    });
}

// Setup report actions
function setupReportActions() {
    const submitButton = document.getElementById('submit-report');
    const refreshButton = document.getElementById('refresh-reports');
    
    if (submitButton) {
        submitButton.addEventListener('click', showSubmitReportModal);
    }
    
    if (refreshButton) {
        refreshButton.addEventListener('click', refreshReports);
    }
}

// Filter reports
function filterReports(type) {
    const reportItems = document.querySelectorAll('.report-item');
    
    reportItems.forEach(item => {
        if (type === 'all' || item.classList.contains(type)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Show submit report modal
function showSubmitReportModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Submit Report</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="report-form">
                    <div class="form-group">
                        <label>Report Type</label>
                        <select id="report-type" required>
                            <option value="">Select type...</option>
                            <option value="safe-zone">Safe Zone</option>
                            <option value="blocked-road">Blocked Road</option>
                            <option value="urgent-need">Urgent Need</option>
                            <option value="hazard">Hazard</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" id="report-title" required placeholder="Brief description...">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="report-description" required placeholder="Detailed information..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Location</label>
                        <input type="text" id="report-location" required placeholder="Address or landmark...">
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Submit Report</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('#report-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitReport();
    });
    
    // Handle modal close
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Submit report
function submitReport() {
    const type = document.getElementById('report-type').value;
    const title = document.getElementById('report-title').value;
    const description = document.getElementById('report-description').value;
    const location = document.getElementById('report-location').value;
    
    const newReport = {
        id: Date.now(),
        type: type,
        title: title,
        message: description,
        location: location,
        timestamp: new Date(),
        verified: false,
        reporter: 'You'
    };
    
    crowdsourcedReports.unshift(newReport);
    updateReportsDisplay();
    
    showNotification('Report submitted successfully', 'success');
    closeModal();
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Refresh reports
function refreshReports() {
    // Simulate new reports
    if (Math.random() < 0.4) {
        const newReport = generateRandomReport();
        crowdsourcedReports.unshift(newReport);
        updateReportsDisplay();
    }
    
    showNotification('Reports refreshed', 'info');
}

// Generate random report
function generateRandomReport() {
    const types = ['safe-zone', 'blocked-road', 'urgent-need', 'hazard'];
    const titles = [
        'New Safe Area Identified',
        'Road Condition Update',
        'Community Assistance Needed',
        'Safety Hazard Reported'
    ];
    const locations = [
        'Community Center',
        'Main Street',
        'Oak Avenue',
        'Pine Street'
    ];
    
    return {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        title: titles[Math.floor(Math.random() * titles.length)],
        message: 'Community member has provided updated information about current conditions.',
        location: locations[Math.floor(Math.random() * locations.length)],
        timestamp: new Date(),
        verified: Math.random() < 0.5,
        reporter: 'Community Member'
    };
}

// Update reports display
function updateReportsDisplay() {
    const reportsFeed = document.querySelector('.reports-feed');
    if (!reportsFeed) return;
    
    // Sort by timestamp (newest first)
    const sortedReports = crowdsourcedReports.sort((a, b) => b.timestamp - a.timestamp);
    
    reportsFeed.innerHTML = sortedReports.map(report => `
        <div class="report-item ${report.type}">
            <div class="report-icon">
                <i class="fas fa-${getReportIcon(report.type)}"></i>
            </div>
            <div class="report-content">
                <h4>${report.title}</h4>
                <p>${report.message}</p>
                <div class="report-meta">
                    <span class="report-location">${report.location}</span>
                    <span class="report-time">${getTimeAgo(report.timestamp)}</span>
                    <span class="report-verified">
                        <i class="fas fa-${report.verified ? 'check-circle' : 'clock'}"></i>
                        ${report.verified ? 'Verified' : 'Pending'}
                    </span>
                </div>
            </div>
            <div class="report-actions">
                <button class="btn btn-small" onclick="viewReportDetails(${report.id})">View Details</button>
            </div>
        </div>
    `).join('');
}

// Get report icon based on type
function getReportIcon(type) {
    const icons = {
        'safe-zone': 'shield-alt',
        'blocked-road': 'road',
        'urgent-need': 'exclamation',
        'hazard': 'exclamation-triangle'
    };
    return icons[type] || 'info-circle';
}

// View report details
function viewReportDetails(reportId) {
    const report = crowdsourcedReports.find(r => r.id === reportId);
    if (report) {
        showModal('Report Details', `
            <div class="report-details">
                <h3>${report.title}</h3>
                <p><strong>Type:</strong> ${report.type.replace('-', ' ').toUpperCase()}</p>
                <p><strong>Location:</strong> ${report.location}</p>
                <p><strong>Reporter:</strong> ${report.reporter}</p>
                <p><strong>Time:</strong> ${report.timestamp.toLocaleString()}</p>
                <p><strong>Status:</strong> ${report.verified ? 'Verified' : 'Pending Verification'}</p>
                <p><strong>Description:</strong></p>
                <p>${report.message}</p>
            </div>
        `);
    }
}

// Initialize emergency numbers
function initializeEmergencyNumbers() {
    // Emergency numbers are already in HTML, no additional JS needed
    // The tel: links will automatically open phone dialer on mobile devices
    console.log('Emergency numbers initialized');
}

// Initialize first aid instructions
function initializeFirstAid() {
    const categoryButtons = document.querySelectorAll('.aid-category-btn');
    const instructions = document.querySelectorAll('.aid-instruction');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding instruction
            instructions.forEach(instruction => {
                instruction.classList.remove('active');
            });
            
            const targetInstruction = document.getElementById(`${category}-instructions`);
            if (targetInstruction) {
                targetInstruction.classList.add('active');
            }
        });
    });
}

// Initialize survival kit checklist
function initializeSurvivalKit() {
    const checkboxes = document.querySelectorAll('.kit-item input[type="checkbox"]');
    const progressFill = document.getElementById('kit-progress-fill');
    const progressText = document.getElementById('kit-progress-text');
    
    // Load saved progress
    loadKitProgress();
    
    // Add event listeners to checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateKitProgress();
            saveKitProgress();
        });
    });
}

// Update survival kit progress
function updateKitProgress() {
    const checkboxes = document.querySelectorAll('.kit-item input[type="checkbox"]');
    const checkedBoxes = document.querySelectorAll('.kit-item input[type="checkbox"]:checked');
    const progressFill = document.getElementById('kit-progress-fill');
    const progressText = document.getElementById('kit-progress-text');
    
    const totalItems = checkboxes.length;
    const completedItems = checkedBoxes.length;
    const percentage = Math.round((completedItems / totalItems) * 100);
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${percentage}% Complete`;
    }
}

// Save survival kit progress
function saveKitProgress() {
    const checkboxes = document.querySelectorAll('.kit-item input[type="checkbox"]');
    const progress = {};
    
    checkboxes.forEach(checkbox => {
        progress[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('survivalKitProgress', JSON.stringify(progress));
}

// Load survival kit progress
function loadKitProgress() {
    const savedProgress = localStorage.getItem('survivalKitProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        
        Object.keys(progress).forEach(checkboxId => {
            const checkbox = document.getElementById(checkboxId);
            if (checkbox) {
                checkbox.checked = progress[checkboxId];
            }
        });
        
        updateKitProgress();
    }
}

// Initialize resource finder
function initializeResourceFinder() {
    const searchInput = document.getElementById('resource-search');
    const filterButtons = document.querySelectorAll('.resource-filters .filter-btn');
    const resourceItems = document.querySelectorAll('.resource-item');
    
    // Set up search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterResources(searchTerm);
        });
    }
    
    // Set up filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.getAttribute('data-type');
            
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter resources
            filterResourcesByType(filterType);
        });
    });
}

// Filter resources by search term
function filterResources(searchTerm) {
    const resourceItems = document.querySelectorAll('.resource-item');
    
    resourceItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const address = item.querySelector('p').textContent.toLowerCase();
        const details = item.querySelector('.resource-details').textContent.toLowerCase();
        
        const matches = title.includes(searchTerm) || 
                      address.includes(searchTerm) || 
                      details.includes(searchTerm);
        
        item.style.display = matches ? 'flex' : 'none';
    });
}

// Filter resources by type
function filterResourcesByType(type) {
    const resourceItems = document.querySelectorAll('.resource-item');
    
    resourceItems.forEach(item => {
        if (type === 'all' || item.classList.contains(type)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Get directions to resource
function getDirections(resourceName) {
    // In a real app, this would integrate with Google Maps or Apple Maps
    showNotification(`Opening directions to ${resourceName}`, 'info');
    
    // Simulate opening maps app
    setTimeout(() => {
        showNotification('Directions opened in maps app', 'success');
    }, 1000);
}

// Call resource
function callResource(phoneNumber) {
    // In a real app, this would initiate a phone call
    showNotification(`Calling ${phoneNumber}`, 'info');
    
    // Simulate call initiation
    setTimeout(() => {
        showNotification('Call initiated', 'success');
    }, 500);
}

// Check resource availability
function checkAvailability() {
    showNotification('Checking availability...', 'info');
    
    // Simulate availability check
    setTimeout(() => {
        const isAvailable = Math.random() > 0.3; // 70% chance available
        const status = isAvailable ? 'Available' : 'Currently in use';
        const statusClass = isAvailable ? 'success' : 'warning';
        
        showNotification(`Status: ${status}`, statusClass);
    }, 1500);
}

// Initialize family locator
function initializeFamilyLocator() {
    const statusButtons = document.querySelectorAll('.status-btn');
    const shareStatusButton = document.getElementById('share-status');
    const addFamilyButton = document.getElementById('add-family-member');
    
    // Set up status buttons
    statusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const status = this.getAttribute('data-status');
            
            // Update active status
            statusButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Store current status
            localStorage.setItem('currentStatus', status);
            
            showNotification(`Status updated to: ${status.replace('-', ' ')}`, 'success');
        });
    });
    
    // Set up share status button
    if (shareStatusButton) {
        shareStatusButton.addEventListener('click', shareStatus);
    }
    
    // Set up add family member button
    if (addFamilyButton) {
        addFamilyButton.addEventListener('click', showAddFamilyModal);
    }
    
    // Load saved status
    loadSavedStatus();
}

// Share status with family
function shareStatus() {
    const statusMessage = document.getElementById('status-message').value;
    const activeStatus = document.querySelector('.status-btn.active');
    
    if (!activeStatus) {
        showNotification('Please select a status first', 'warning');
        return;
    }
    
    const status = activeStatus.getAttribute('data-status');
    const statusText = activeStatus.querySelector('span').textContent;
    
    // Simulate sharing status
    showNotification(`Sharing status: ${statusText}`, 'info');
    
    setTimeout(() => {
        showNotification('Status shared with family members', 'success');
        
        // Clear message
        document.getElementById('status-message').value = '';
        
        // Update family member status (simulation)
        updateFamilyMemberStatus('You', status, statusMessage);
    }, 1000);
}

// Update family member status
function updateFamilyMemberStatus(memberName, status, message) {
    // In a real app, this would update the family member's status
    console.log(`Updated ${memberName} status to ${status}: ${message}`);
}

// Load saved status
function loadSavedStatus() {
    const savedStatus = localStorage.getItem('currentStatus');
    if (savedStatus) {
        const statusButton = document.querySelector(`[data-status="${savedStatus}"]`);
        if (statusButton) {
            statusButton.classList.add('active');
        }
    }
}

// Send message to family member
function sendMessage(memberName) {
    showNotification(`Opening message to ${memberName}`, 'info');
    
    // Simulate opening messaging app
    setTimeout(() => {
        showNotification(`Message sent to ${memberName}`, 'success');
    }, 1000);
}

// Show add family member modal
function showAddFamilyModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add Family Member</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="add-family-form">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" id="member-name" required placeholder="Enter family member's name">
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" id="member-phone" required placeholder="Enter phone number">
                    </div>
                    <div class="form-group">
                        <label>Relationship</label>
                        <select id="member-relationship" required>
                            <option value="">Select relationship...</option>
                            <option value="spouse">Spouse</option>
                            <option value="parent">Parent</option>
                            <option value="child">Child</option>
                            <option value="sibling">Sibling</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Member</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('#add-family-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addFamilyMember();
    });
    
    // Handle modal close
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Add family member
function addFamilyMember() {
    const name = document.getElementById('member-name').value;
    const phone = document.getElementById('member-phone').value;
    const relationship = document.getElementById('member-relationship').value;
    
    // In a real app, this would add the member to the family list
    showNotification(`${name} added to family members`, 'success');
    closeModal();
}

// Initialize volunteer & aid coordination
function initializeVolunteerAid() {
    // Volunteer & aid coordination is mostly static content
    // The contact and volunteer functions are already defined
    console.log('Volunteer & aid coordination initialized');
}

// Contact organization
function contactOrg(orgName) {
    showNotification(`Contacting ${orgName}...`, 'info');
    
    // Simulate contacting organization
    setTimeout(() => {
        showNotification(`Connected to ${orgName}`, 'success');
    }, 1500);
}

// Volunteer for opportunity
function volunteerFor(opportunity) {
    showNotification(`Signing up for ${opportunity}...`, 'info');
    
    // Simulate volunteer signup
    setTimeout(() => {
        showNotification(`Successfully signed up for ${opportunity}`, 'success');
    }, 2000);
}

// Initialize multilingual support
function initializeMultilingualSupport() {
    const languageButtons = document.querySelectorAll('.language-btn');
    const translateButton = document.getElementById('translate-text');
    
    // Set up language selection
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Update active language
            languageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Translate content
            translateContent(lang);
            
            showNotification(`Language changed to ${this.querySelector('span').textContent}`, 'success');
        });
    });
    
    // Set up translation
    if (translateButton) {
        translateButton.addEventListener('click', translateText);
    }
}

// Translate content based on selected language
function translateContent(lang) {
    const translations = {
        en: {
            help: 'Help! Emergency!',
            medical: 'I need medical assistance',
            shelter: 'Where is the nearest shelter?',
            lost: 'I am lost',
            call: 'Call 911'
        },
        es: {
            help: '¡Ayuda! ¡Emergencia!',
            medical: 'Necesito asistencia médica',
            shelter: '¿Dónde está el refugio más cercano?',
            lost: 'Estoy perdido',
            call: 'Llama al 911'
        },
        fr: {
            help: 'Aide! Urgence!',
            medical: 'J\'ai besoin d\'assistance médicale',
            shelter: 'Où est le refuge le plus proche?',
            lost: 'Je suis perdu',
            call: 'Appelez le 911'
        },
        de: {
            help: 'Hilfe! Notfall!',
            medical: 'Ich brauche medizinische Hilfe',
            shelter: 'Wo ist das nächste Schutzgebiet?',
            lost: 'Ich bin verloren',
            call: 'Rufen Sie 911 an'
        },
        zh: {
            help: '帮助！紧急情况！',
            medical: '我需要医疗援助',
            shelter: '最近的避难所在哪里？',
            lost: '我迷路了',
            call: '拨打911'
        },
        ar: {
            help: 'مساعدة! طوارئ!',
            medical: 'أحتاج إلى مساعدة طبية',
            shelter: 'أين أقرب ملجأ؟',
            lost: 'أنا ضائع',
            call: 'اتصل بـ 911'
        },
        hi: {
            help: 'मदद! आपातकाल!',
            medical: 'मुझे चिकित्सा सहायता चाहिए',
            shelter: 'निकटतम आश्रय कहाँ है?',
            lost: 'मैं खो गया हूँ',
            call: '911 पर कॉल करें'
        },
        ja: {
            help: '助けて！緊急事態！',
            medical: '医療支援が必要です',
            shelter: '最も近い避難所はどこですか？',
            lost: '道に迷いました',
            call: '911に電話してください'
        }
    };
    
    const langTranslations = translations[lang] || translations.en;
    
    // Update phrase translations
    document.getElementById('help-phrase').textContent = langTranslations.help;
    document.getElementById('medical-phrase').textContent = langTranslations.medical;
    document.getElementById('shelter-phrase').textContent = langTranslations.shelter;
    document.getElementById('lost-phrase').textContent = langTranslations.lost;
    document.getElementById('call-phrase').textContent = langTranslations.call;
}

// Translate text
function translateText() {
    const textToTranslate = document.getElementById('text-to-translate').value;
    const resultDiv = document.getElementById('translation-result');
    
    if (!textToTranslate.trim()) {
        showNotification('Please enter text to translate', 'warning');
        return;
    }
    
    showNotification('Translating text...', 'info');
    
    // Simulate translation
    setTimeout(() => {
        const translatedText = `[Translated] ${textToTranslate}`;
        resultDiv.innerHTML = `<p>${translatedText}</p>`;
        showNotification('Translation completed', 'success');
    }, 1500);
}

// Initialize accessibility features
function initializeAccessibilityFeatures() {
    const accessibilityCheckboxes = document.querySelectorAll('.control-label input[type="checkbox"]');
    
    // Set up accessibility controls
    accessibilityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const feature = this.id;
            const isEnabled = this.checked;
            
            applyAccessibilityFeature(feature, isEnabled);
            saveAccessibilitySettings();
        });
    });
    
    // Load saved accessibility settings
    loadAccessibilitySettings();
}

// Apply accessibility feature
function applyAccessibilityFeature(feature, isEnabled) {
    const body = document.body;
    
    switch(feature) {
        case 'large-text':
            if (isEnabled) {
                body.classList.add('large-text');
            } else {
                body.classList.remove('large-text');
            }
            break;
            
        case 'high-contrast':
            if (isEnabled) {
                body.classList.add('high-contrast');
            } else {
                body.classList.remove('high-contrast');
            }
            break;
            
        case 'voice-navigation':
            if (isEnabled) {
                enableVoiceNavigation();
            } else {
                disableVoiceNavigation();
            }
            break;
            
        case 'screen-reader':
            if (isEnabled) {
                enableScreenReaderMode();
            } else {
                disableScreenReaderMode();
            }
            break;
            
        case 'reduced-motion':
            if (isEnabled) {
                body.classList.add('reduced-motion');
            } else {
                body.classList.remove('reduced-motion');
            }
            break;
            
        case 'keyboard-nav':
            if (isEnabled) {
                enableKeyboardNavigation();
            } else {
                disableKeyboardNavigation();
            }
            break;
    }
    
    showNotification(`${feature.replace('-', ' ')} ${isEnabled ? 'enabled' : 'disabled'}`, 'success');
}

// Enable voice navigation
function enableVoiceNavigation() {
    if ('speechSynthesis' in window) {
        // Voice navigation is available
        showNotification('Voice navigation enabled. Say "help" for commands.', 'success');
    } else {
        showNotification('Voice navigation not supported on this device', 'warning');
    }
}

// Disable voice navigation
function disableVoiceNavigation() {
    showNotification('Voice navigation disabled', 'info');
}

// Enable screen reader mode
function enableScreenReaderMode() {
    // Add ARIA labels and improve screen reader support
    document.body.setAttribute('aria-label', 'Disaster Response Navigator');
    showNotification('Screen reader mode enabled', 'success');
}

// Disable screen reader mode
function disableScreenReaderMode() {
    document.body.removeAttribute('aria-label');
    showNotification('Screen reader mode disabled', 'info');
}

// Enable keyboard navigation
function enableKeyboardNavigation() {
    // Add keyboard event listeners
    document.addEventListener('keydown', handleKeyboardNavigation);
    showNotification('Keyboard navigation enabled. Use Tab to navigate.', 'success');
}

// Disable keyboard navigation
function disableKeyboardNavigation() {
    document.removeEventListener('keydown', handleKeyboardNavigation);
    showNotification('Keyboard navigation disabled', 'info');
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
    if (e.key === 'Tab') {
        // Tab navigation is handled by browser
        return;
    }
    
    if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.click) {
            activeElement.click();
            e.preventDefault();
        }
    }
}

// Save accessibility settings
function saveAccessibilitySettings() {
    const settings = {};
    const checkboxes = document.querySelectorAll('.control-label input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        settings[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
}

// Load accessibility settings
function loadAccessibilitySettings() {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        Object.keys(settings).forEach(feature => {
            const checkbox = document.getElementById(feature);
            if (checkbox) {
                checkbox.checked = settings[feature];
                applyAccessibilityFeature(feature, settings[feature]);
            }
        });
    }
}

// Initialize simulation/drill mode
function initializeSimulationDrill() {
    // Load saved drill progress
    loadDrillProgress();
    
    // Set up drill event listeners
    const drillButtons = document.querySelectorAll('[onclick^="startDrill"]');
    drillButtons.forEach(button => {
        button.addEventListener('click', function() {
            const scenario = this.closest('.scenario-card').getAttribute('data-scenario');
            startDrill(scenario);
        });
    });
}

// Start emergency drill
function startDrill(scenario) {
    const drillData = {
        earthquake: {
            name: 'Earthquake Drill',
            steps: [
                { action: 'Drop to the ground', time: 2, correct: true },
                { action: 'Take cover under a sturdy table', time: 3, correct: true },
                { action: 'Hold on until shaking stops', time: 5, correct: true },
                { action: 'Check for injuries', time: 2, correct: true },
                { action: 'Evacuate if building is damaged', time: 3, correct: true }
            ]
        },
        fire: {
            name: 'Fire Evacuation Drill',
            steps: [
                { action: 'Stay low to avoid smoke', time: 2, correct: true },
                { action: 'Feel doors before opening', time: 2, correct: true },
                { action: 'Use stairs, not elevators', time: 3, correct: true },
                { action: 'Meet at designated location', time: 2, correct: true },
                { action: 'Call 911 from outside', time: 2, correct: true }
            ]
        },
        flood: {
            name: 'Flood Response Drill',
            steps: [
                { action: 'Move to higher ground', time: 3, correct: true },
                { action: 'Avoid walking through floodwater', time: 2, correct: true },
                { action: 'Turn off utilities if safe', time: 2, correct: true },
                { action: 'Stay informed via radio', time: 2, correct: true },
                { action: 'Evacuate if ordered', time: 3, correct: true }
            ]
        },
        hurricane: {
            name: 'Hurricane Preparedness Drill',
            steps: [
                { action: 'Secure outdoor items', time: 3, correct: true },
                { action: 'Board up windows', time: 4, correct: true },
                { action: 'Fill emergency supplies', time: 2, correct: true },
                { action: 'Stay indoors during storm', time: 2, correct: true },
                { action: 'Monitor weather updates', time: 2, correct: true }
            ]
        }
    };
    
    const scenarioData = drillData[scenario];
    if (!scenarioData) return;
    
    showDrillModal(scenarioData);
}

// Show drill modal
function showDrillModal(scenarioData) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content drill-modal">
            <div class="modal-header">
                <h3>${scenarioData.name}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="drill-timer">
                    <span id="drill-time">00:00</span>
                </div>
                <div class="drill-steps" id="drill-steps">
                    ${scenarioData.steps.map((step, index) => `
                        <div class="drill-step" data-step="${index}">
                            <div class="step-number">${index + 1}</div>
                            <div class="step-content">
                                <h4>${step.action}</h4>
                                <div class="step-timer">${step.time}s</div>
                            </div>
                            <div class="step-status">
                                <i class="fas fa-check-circle"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="drill-controls">
                    <button class="btn btn-primary" id="start-drill">Start Drill</button>
                    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle drill start
    const startButton = modal.querySelector('#start-drill');
    startButton.addEventListener('click', () => {
        startDrillExecution(scenarioData, modal);
    });
    
    // Handle modal close
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Execute drill
function startDrillExecution(scenarioData, modal) {
    const startButton = modal.querySelector('#start-drill');
    const steps = modal.querySelectorAll('.drill-step');
    const timer = modal.querySelector('#drill-timer');
    
    startButton.style.display = 'none';
    
    let currentStep = 0;
    let totalTime = 0;
    let drillInterval;
    
    function executeStep() {
        if (currentStep >= steps.length) {
            completeDrill(totalTime, scenarioData.name);
            return;
        }
        
        const step = steps[currentStep];
        const stepData = scenarioData.steps[currentStep];
        
        step.classList.add('active');
        
        // Simulate step completion
        setTimeout(() => {
            step.classList.add('completed');
            step.querySelector('.step-status i').style.color = '#2ed573';
            currentStep++;
            totalTime += stepData.time;
            updateTimer(timer, totalTime);
            executeStep();
        }, stepData.time * 1000);
    }
    
    executeStep();
}

// Update timer display
function updateTimer(timerElement, seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Complete drill
function completeDrill(time, scenarioName) {
    const score = Math.max(0, 100 - (time - 15)); // Base score calculation
    const timeFormatted = `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`;
    
    showNotification(`Drill completed! Score: ${score}%`, 'success');
    
    // Update progress
    updateDrillProgress(score, timeFormatted);
    
    // Close modal
    const modal = document.querySelector('.drill-modal').closest('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Update drill progress
function updateDrillProgress(score, time) {
    const drillsCompleted = parseInt(localStorage.getItem('drillsCompleted') || '0') + 1;
    const totalScore = parseInt(localStorage.getItem('totalScore') || '0') + score;
    const avgScore = Math.round(totalScore / drillsCompleted);
    
    localStorage.setItem('drillsCompleted', drillsCompleted);
    localStorage.setItem('totalScore', totalScore);
    localStorage.setItem('bestTime', time);
    
    // Update display
    document.getElementById('drills-completed').textContent = drillsCompleted;
    document.getElementById('avg-score').textContent = `${avgScore}%`;
    document.getElementById('best-time').textContent = time;
    
    // Check achievements
    checkAchievements(drillsCompleted, avgScore);
}

// Check achievements
function checkAchievements(drillsCompleted, avgScore) {
    const achievements = document.querySelectorAll('.achievement-item');
    
    if (drillsCompleted >= 1) {
        achievements[0].classList.add('unlocked');
    }
    
    if (avgScore >= 100) {
        achievements[1].classList.add('unlocked');
    }
    
    if (drillsCompleted >= 5 && avgScore >= 90) {
        achievements[2].classList.add('unlocked');
    }
}

// Load drill progress
function loadDrillProgress() {
    const drillsCompleted = localStorage.getItem('drillsCompleted') || '0';
    const totalScore = localStorage.getItem('totalScore') || '0';
    const bestTime = localStorage.getItem('bestTime') || '--';
    
    const avgScore = drillsCompleted > 0 ? Math.round(totalScore / drillsCompleted) : 0;
    
    document.getElementById('drills-completed').textContent = drillsCompleted;
    document.getElementById('avg-score').textContent = `${avgScore}%`;
    document.getElementById('best-time').textContent = bestTime;
    
    checkAchievements(parseInt(drillsCompleted), avgScore);
}

// Initialize educational content
function initializeEducationalContent() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const articleSections = document.querySelectorAll('.article-section');
    
    // Set up category switching
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section
            articleSections.forEach(section => section.classList.remove('active'));
            document.getElementById(`${category}-content`).classList.add('active');
        });
    });
}

// Read article
function readArticle(articleId) {
    const articles = {
        'home-kit': {
            title: 'Home Emergency Kit',
            content: `
                <h3>Essential Items for Your Home Emergency Kit</h3>
                <p>Every household should have a well-stocked emergency kit that can sustain your family for at least 3 days. Here are the essential items:</p>
                
                <h4>Water & Food</h4>
                <ul>
                    <li>1 gallon of water per person per day (3-day supply minimum)</li>
                    <li>Non-perishable food items (canned goods, energy bars, etc.)</li>
                    <li>Manual can opener</li>
                    <li>Paper plates and plastic utensils</li>
                </ul>
                
                <h4>First Aid & Medical</h4>
                <ul>
                    <li>First aid kit with bandages, antiseptic, and medications</li>
                    <li>Prescription medications (7-day supply)</li>
                    <li>Medical supplies for family members with special needs</li>
                    <li>Emergency contact information</li>
                </ul>
                
                <h4>Tools & Equipment</h4>
                <ul>
                    <li>Flashlight with extra batteries</li>
                    <li>Battery-powered or hand-crank radio</li>
                    <li>Multi-purpose tool or Swiss Army knife</li>
                    <li>Duct tape and plastic sheeting</li>
                    <li>Whistle to signal for help</li>
                </ul>
                
                <h4>Important Documents</h4>
                <ul>
                    <li>Copies of insurance policies and identification</li>
                    <li>Bank account records</li>
                    <li>Emergency contact list</li>
                    <li>Map of your area</li>
                </ul>
                
                <p><strong>Remember:</strong> Store your emergency kit in an easily accessible location and check it regularly to ensure items are not expired or damaged.</p>
            `
        },
        'evacuation': {
            title: 'Evacuation Planning',
            content: `
                <h3>Creating an Effective Evacuation Plan</h3>
                <p>Having a well-practiced evacuation plan can save lives during an emergency. Here's how to create one:</p>
                
                <h4>Step 1: Identify Evacuation Routes</h4>
                <ul>
                    <li>Map out at least two different routes from your home</li>
                    <li>Consider different types of emergencies (fire, flood, earthquake)</li>
                    <li>Identify safe meeting places outside your neighborhood</li>
                    <li>Plan for different times of day and weather conditions</li>
                </ul>
                
                <h4>Step 2: Prepare Your Family</h4>
                <ul>
                    <li>Teach all family members the evacuation routes</li>
                    <li>Practice the plan regularly (at least twice a year)</li>
                    <li>Assign specific responsibilities to each family member</li>
                    <li>Include pets in your evacuation planning</li>
                </ul>
                
                <h4>Step 3: Communication Plan</h4>
                <ul>
                    <li>Designate an out-of-area contact person</li>
                    <li>Ensure everyone knows emergency contact numbers</li>
                    <li>Have a backup communication method (text, social media)</li>
                    <li>Keep important documents in a portable container</li>
                </ul>
                
                <h4>Step 4: Special Considerations</h4>
                <ul>
                    <li>Plan for family members with disabilities or special needs</li>
                    <li>Consider transportation options if you don't have a car</li>
                    <li>Know the location of local shelters</li>
                    <li>Have a plan for different types of emergencies</li>
                </ul>
                
                <p><strong>Practice makes perfect:</strong> Regular drills help ensure everyone knows what to do when an emergency strikes.</p>
            `
        },
        'communication': {
            title: 'Communication Plans',
            content: `
                <h3>Family Communication Strategies for Emergencies</h3>
                <p>During an emergency, communication can be challenging. Here's how to stay connected:</p>
                
                <h4>Before an Emergency</h4>
                <ul>
                    <li>Create a family communication plan</li>
                    <li>Designate an out-of-area contact person</li>
                    <li>Ensure everyone has emergency contact numbers</li>
                    <li>Practice using different communication methods</li>
                </ul>
                
                <h4>During an Emergency</h4>
                <ul>
                    <li>Text messages often work when calls don't</li>
                    <li>Use social media to check in with family</li>
                    <li>Keep calls brief to preserve battery life</li>
                    <li>Use a landline if available</li>
                </ul>
                
                <h4>Emergency Contact Information</h4>
                <ul>
                    <li>Local emergency services (911)</li>
                    <li>Family doctor and pharmacy</li>
                    <li>Insurance companies</li>
                    <li>Utility companies</li>
                    <li>Out-of-area emergency contact</li>
                </ul>
                
                <h4>Communication Tools</h4>
                <ul>
                    <li>Cell phones with extra batteries</li>
                    <li>Battery-powered or hand-crank radio</li>
                    <li>Whistle for signaling</li>
                    <li>Flashlight for visual signals</li>
                </ul>
                
                <p><strong>Remember:</strong> During major disasters, phone lines may be overloaded. Be patient and try different communication methods.</p>
            `
        },
        'first-aid': {
            title: 'First Aid Basics',
            content: `
                <h3>Essential First Aid Techniques for Emergencies</h3>
                <p>Basic first aid knowledge can save lives during emergencies. Here are the essential techniques:</p>
                
                <h4>CPR (Cardiopulmonary Resuscitation)</h4>
                <ul>
                    <li>Check for responsiveness and breathing</li>
                    <li>Call 911 immediately</li>
                    <li>Place hands on center of chest</li>
                    <li>Push hard and fast (100-120 compressions per minute)</li>
                    <li>Continue until help arrives or person recovers</li>
                </ul>
                
                <h4>Bleeding Control</h4>
                <ul>
                    <li>Apply direct pressure to the wound</li>
                    <li>Elevate the injured area if possible</li>
                    <li>Use clean cloth or bandage</li>
                    <li>Don't remove objects embedded in wounds</li>
                    <li>Seek medical help for severe bleeding</li>
                </ul>
                
                <h4>Choking</h4>
                <ul>
                    <li>Encourage coughing if person can speak</li>
                    <li>Perform Heimlich maneuver if needed</li>
                    <li>For unconscious person, start CPR</li>
                    <li>Call 911 immediately</li>
                </ul>
                
                <h4>Burns</h4>
                <ul>
                    <li>Cool the burn with running water</li>
                    <li>Remove jewelry or tight clothing</li>
                    <li>Cover with clean, dry cloth</li>
                    <li>Don't use ice or butter</li>
                    <li>Seek medical help for severe burns</li>
                </ul>
                
                <p><strong>Important:</strong> Always call 911 for serious injuries and seek professional medical help when needed.</p>
            `
        },
        'shelter': {
            title: 'Shelter in Place',
            content: `
                <h3>When and How to Shelter in Place</h3>
                <p>Sometimes the safest option during an emergency is to stay where you are. Here's when and how to shelter in place:</p>
                
                <h4>When to Shelter in Place</h4>
                <ul>
                    <li>Chemical, biological, or radiological emergency</li>
                    <li>Severe weather (tornado, hurricane)</li>
                    <li>Active shooter situation</li>
                    <li>When evacuation routes are blocked</li>
                    <li>When authorities advise staying indoors</li>
                </ul>
                
                <h4>How to Shelter in Place</h4>
                <ul>
                    <li>Go indoors immediately</li>
                    <li>Close and lock all doors and windows</li>
                    <li>Turn off air conditioning and heating</li>
                    <li>Seal gaps around doors and windows</li>
                    <li>Stay in an interior room if possible</li>
                </ul>
                
                <h4>Preparing Your Shelter</h4>
                <ul>
                    <li>Choose an interior room with no windows</li>
                    <li>Have emergency supplies ready</li>
                    <li>Keep a battery-powered radio</li>
                    <li>Have a phone available</li>
                    <li>Stock water and non-perishable food</li>
                </ul>
                
                <h4>During Shelter in Place</h4>
                <ul>
                    <li>Listen to radio or TV for updates</li>
                    <li>Stay calm and follow instructions</li>
                    <li>Don't leave until authorities say it's safe</li>
                    <li>Check on family members regularly</li>
                    <li>Be prepared to evacuate if conditions change</li>
                </ul>
                
                <p><strong>Remember:</strong> Shelter in place is temporary. Be ready to evacuate if conditions worsen or authorities advise it.</p>
            `
        }
    };
    
    const article = articles[articleId];
    if (!article) return;
    
    showArticleModal(article);
}

// Show article modal
function showArticleModal(article) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content article-modal">
            <div class="modal-header">
                <h3>${article.title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="article-content">
                    ${article.content}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle modal close
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Initialize AI assistant
function initializeAIAssistant() {
    const sendButton = document.getElementById('send-question');
    const questionInput = document.getElementById('user-question');
    
    // Set up send button
    if (sendButton) {
        sendButton.addEventListener('click', sendQuestion);
    }
    
    // Set up enter key
    if (questionInput) {
        questionInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendQuestion();
            }
        });
    }
}

// Send question to AI assistant
function sendQuestion() {
    const questionInput = document.getElementById('user-question');
    const question = questionInput.value.trim();
    
    if (!question) return;
    
    // Add user message to chat
    addMessageToChat(question, 'user');
    
    // Clear input
    questionInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateAIResponse(question);
        addMessageToChat(response, 'assistant');
    }, 1500);
}

// Ask quick question
function askQuickQuestion(question) {
    const questionInput = document.getElementById('user-question');
    questionInput.value = question;
    sendQuestion();
}

// Add message to chat
function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="${avatar}"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p>AI is typing...</p>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Generate AI response
function generateAIResponse(question) {
    const responses = {
        'earthquake': 'During an earthquake, remember to Drop, Cover, and Hold On. Get under a sturdy table or desk, protect your head and neck, and hold on until the shaking stops. After the shaking stops, check for injuries and evacuate if the building is damaged.',
        'hurricane': 'To prepare for a hurricane, secure outdoor items, board up windows, fill emergency supplies, and have an evacuation plan ready. During the storm, stay indoors and away from windows. Listen to weather updates and follow evacuation orders if issued.',
        'emergency kit': 'Your emergency kit should include: 1 gallon of water per person per day (3-day supply), non-perishable food, first aid kit, flashlight with extra batteries, battery-powered radio, medications, important documents, and cash. Store it in an easily accessible location.',
        'fire': 'In case of fire, stay low to avoid smoke, feel doors before opening them, use stairs not elevators, and meet at your designated meeting place outside. Call 911 from a safe location and never go back inside a burning building.',
        'flood': 'During a flood, move to higher ground immediately. Avoid walking or driving through floodwater. Turn off utilities if safe to do so. Stay informed via radio and follow evacuation orders. Never ignore flood warnings.',
        'tornado': 'If a tornado warning is issued, go to the lowest level of your building, preferably a basement or storm cellar. If not available, go to an interior room without windows. Cover yourself with a mattress or heavy blankets.',
        'power outage': 'During a power outage, use flashlights instead of candles, keep refrigerator and freezer doors closed, unplug appliances to prevent damage from power surges, and have a battery-powered radio for updates.',
        'shelter': 'To shelter in place, go indoors immediately, close and lock all doors and windows, turn off air conditioning and heating, seal gaps around doors and windows, and stay in an interior room. Listen to radio or TV for updates.',
        'evacuation': 'When evacuating, follow designated evacuation routes, take your emergency kit, secure your home, and follow instructions from authorities. Don\'t return home until officials say it\'s safe.',
        'communication': 'During emergencies, text messages often work when calls don\'t. Use social media to check in with family, keep calls brief to preserve battery life, and have an out-of-area contact person for family coordination.'
    };
    
    // Simple keyword matching
    const lowerQuestion = question.toLowerCase();
    
    for (const [keyword, response] of Object.entries(responses)) {
        if (lowerQuestion.includes(keyword)) {
            return response;
        }
    }
    
    // Default response
    return 'I understand you\'re asking about emergency preparedness. While I can provide general guidance, for specific emergency situations, always follow the instructions of local authorities and emergency services. Is there a particular disaster scenario or preparedness topic you\'d like to know more about?';
}

// Clear chat
function clearChat() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = `
        <div class="message assistant-message">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>Hello! I'm your AI disaster preparedness assistant. Ask me anything about emergency preparedness, disaster response, or safety procedures. How can I help you today?</p>
            </div>
        </div>
    `;
}

// Initialize damage report tool
function initializeDamageReport() {
    const form = document.getElementById('damage-report-form');
    
    if (form) {
        form.addEventListener('submit', handleDamageReport);
    }
}

// Handle damage report submission
function handleDamageReport(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const reportData = {
        personal: {
            name: formData.get('reporter-name'),
            phone: formData.get('reporter-phone'),
            email: formData.get('reporter-email')
        },
        location: {
            address: formData.get('damage-address'),
            city: formData.get('damage-city'),
            state: formData.get('damage-state'),
            zip: formData.get('damage-zip')
        },
        damage: {
            type: formData.get('disaster-type'),
            severity: formData.get('damage-severity'),
            description: formData.get('damage-description'),
            safetyConcerns: formData.get('safety-concerns')
        },
        photos: formData.getAll('damage-photos'),
        timestamp: new Date().toISOString()
    };
    
    // Simulate report submission
    showNotification('Submitting damage report...', 'info');
    
    setTimeout(() => {
        // Save report locally
        const reports = JSON.parse(localStorage.getItem('damageReports') || '[]');
        reports.push(reportData);
        localStorage.setItem('damageReports', JSON.stringify(reports));
        
        showNotification('Damage report submitted successfully! Report ID: #' + Date.now(), 'success');
        clearDamageForm();
    }, 2000);
}

// Clear damage form
function clearDamageForm() {
    const form = document.getElementById('damage-report-form');
    if (form) {
        form.reset();
    }
}

// Initialize insurance & aid resources
function initializeInsuranceAid() {
    // Insurance & aid resources are mostly static content
    // The contact and guide functions are already defined
    console.log('Insurance & aid resources initialized');
}

// View insurance guide
function viewInsuranceGuide(type) {
    const guides = {
        homeowners: {
            title: 'Homeowners Insurance Guide',
            content: `
                <h3>Filing a Homeowners Insurance Claim</h3>
                <p>Follow these steps to maximize your homeowners insurance claim after a disaster:</p>
                
                <h4>1. Immediate Actions</h4>
                <ul>
                    <li>Contact your insurance company within 24-48 hours</li>
                    <li>Take photos and videos of all damage</li>
                    <li>Make temporary repairs to prevent further damage</li>
                    <li>Keep receipts for all emergency repairs</li>
                </ul>
                
                <h4>2. Documentation</h4>
                <ul>
                    <li>Create a detailed inventory of damaged items</li>
                    <li>Include purchase dates, prices, and receipts</li>
                    <li>Take photos of each room before cleanup</li>
                    <li>Keep all correspondence with your insurer</li>
                </ul>
                
                <h4>3. Working with Adjusters</h4>
                <ul>
                    <li>Be present during the adjuster's inspection</li>
                    <li>Point out all damage, even minor issues</li>
                    <li>Ask questions about coverage and exclusions</li>
                    <li>Get everything in writing</li>
                </ul>
                
                <h4>4. Maximizing Your Claim</h4>
                <ul>
                    <li>Don't accept the first offer if it seems low</li>
                    <li>Get multiple repair estimates</li>
                    <li>Understand your policy's replacement cost vs. actual cash value</li>
                    <li>Consider hiring a public adjuster for large claims</li>
                </ul>
                
                <p><strong>Remember:</strong> Don't dispose of damaged items until your adjuster has seen them.</p>
            `
        },
        auto: {
            title: 'Auto Insurance Guide',
            content: `
                <h3>Filing an Auto Insurance Claim</h3>
                <p>Steps to file and maximize your auto insurance claim after disaster damage:</p>
                
                <h4>1. Check Your Coverage</h4>
                <ul>
                    <li>Comprehensive coverage covers most disaster damage</li>
                    <li>Collision coverage may apply in some cases</li>
                    <li>Check if you have rental car coverage</li>
                    <li>Understand your deductible amount</li>
                </ul>
                
                <h4>2. Immediate Steps</h4>
                <ul>
                    <li>Contact your insurance company immediately</li>
                    <li>Take photos of all damage</li>
                    <li>Don't drive the vehicle if it's unsafe</li>
                    <li>Get a police report if applicable</li>
                </ul>
                
                <h4>3. Getting Repairs</h4>
                <ul>
                    <li>Get estimates from multiple repair shops</li>
                    <li>Choose a shop that works with your insurer</li>
                    <li>Understand the difference between OEM and aftermarket parts</li>
                    <li>Keep all repair receipts and documentation</li>
                </ul>
                
                <h4>4. Total Loss Situations</h4>
                <ul>
                    <li>Understand how total loss is determined</li>
                    <li>Research your vehicle's actual cash value</li>
                    <li>Negotiate if the offer seems low</li>
                    <li>Consider gap insurance if you owe more than the car's value</li>
                </ul>
            `
        },
        business: {
            title: 'Business Insurance Guide',
            content: `
                <h3>Filing a Business Insurance Claim</h3>
                <p>Protecting your business from disaster losses with proper insurance claims:</p>
                
                <h4>1. Business Interruption Coverage</h4>
                <ul>
                    <li>Document lost income and expenses</li>
                    <li>Keep detailed records of business operations</li>
                    <li>Calculate lost profits accurately</li>
                    <li>Understand the waiting period and coverage limits</li>
                </ul>
                
                <h4>2. Property Damage Claims</h4>
                <ul>
                    <li>Inventory all damaged business property</li>
                    <li>Document damage to equipment and inventory</li>
                    <li>Get professional appraisals for valuable items</li>
                    <li>Consider replacement cost vs. actual cash value</li>
                </ul>
                
                <h4>3. Employee Considerations</h4>
                <ul>
                    <li>Understand workers' compensation implications</li>
                    <li>Document any work-related injuries</li>
                    <li>Consider temporary staffing needs</li>
                    <li>Maintain employee records and payroll</li>
                </ul>
                
                <h4>4. Documentation Requirements</h4>
                <ul>
                    <li>Financial statements and tax returns</li>
                    <li>Inventory records and purchase receipts</li>
                    <li>Photos and videos of damage</li>
                    <li>Correspondence with customers and suppliers</li>
                </ul>
            `
        }
    };
    
    const guide = guides[type];
    if (guide) {
        showGuideModal(guide);
    }
}

// Contact relief organization
function contactRelief(organization) {
    showNotification(`Connecting to ${organization}...`, 'info');
    
    setTimeout(() => {
        showNotification(`Redirecting to ${organization} website`, 'success');
    }, 1500);
}

// Show guide modal
function showGuideModal(guide) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content guide-modal">
            <div class="modal-header">
                <h3>${guide.title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="guide-content">
                    ${guide.content}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle modal close
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Initialize mental health support
function initializeMentalHealth() {
    // Mental health support is mostly static content
    // The contact and guide functions are already defined
    console.log('Mental health support initialized');
}

// Call crisis hotline
function callCrisis(number) {
    showNotification(`Calling ${number}...`, 'info');
    
    // In a real app, this would initiate a phone call
    setTimeout(() => {
        showNotification(`Connected to crisis support`, 'success');
    }, 1000);
}

// Text crisis line
function textCrisis(number) {
    showNotification(`Opening text to ${number}...`, 'info');
    
    // In a real app, this would open the messaging app
    setTimeout(() => {
        showNotification(`Text message sent`, 'success');
    }, 1000);
}

// View coping guide
function viewCopingGuide(type) {
    const guides = {
        'self-care': {
            title: 'Self-Care During Recovery',
            content: `
                <h3>Essential Self-Care Practices</h3>
                <p>Taking care of yourself is crucial during disaster recovery. Here are essential practices:</p>
                
                <h4>Physical Self-Care</h4>
                <ul>
                    <li>Maintain regular sleep schedule (7-9 hours)</li>
                    <li>Eat nutritious meals regularly</li>
                    <li>Stay hydrated with plenty of water</li>
                    <li>Get some physical activity daily</li>
                    <li>Take breaks from recovery work</li>
                </ul>
                
                <h4>Emotional Self-Care</h4>
                <ul>
                    <li>Allow yourself to feel your emotions</li>
                    <li>Talk to trusted friends or family</li>
                    <li>Practice relaxation techniques (deep breathing, meditation)</li>
                    <li>Engage in activities you enjoy</li>
                    <li>Limit exposure to distressing news</li>
                </ul>
                
                <h4>Mental Self-Care</h4>
                <ul>
                    <li>Set realistic expectations for recovery</li>
                    <li>Break large tasks into smaller steps</li>
                    <li>Celebrate small victories</li>
                    <li>Practice gratitude daily</li>
                    <li>Seek professional help if needed</li>
                </ul>
                
                <h4>Social Self-Care</h4>
                <ul>
                    <li>Stay connected with loved ones</li>
                    <li>Join support groups</li>
                    <li>Ask for help when needed</li>
                    <li>Help others when you can</li>
                    <li>Maintain social connections</li>
                </ul>
                
                <p><strong>Remember:</strong> Self-care is not selfish - it's necessary for your well-being and ability to help others.</p>
            `
        }
    };
    
    const guide = guides[type];
    if (guide) {
        showGuideModal(guide);
    }
}

// Find support groups
function findSupportGroups() {
    showNotification('Searching for local support groups...', 'info');
    
    setTimeout(() => {
        showNotification('Found 3 support groups in your area', 'success');
    }, 2000);
}

// View mental health apps
function viewMentalHealthApps() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content apps-modal">
            <div class="modal-header">
                <h3>Mental Health Apps</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="apps-grid">
                    <div class="app-card">
                        <h4>Headspace</h4>
                        <p>Meditation and mindfulness app</p>
                        <button class="btn btn-outline">Download</button>
                    </div>
                    <div class="app-card">
                        <h4>Calm</h4>
                        <p>Sleep stories and relaxation</p>
                        <button class="btn btn-outline">Download</button>
                    </div>
                    <div class="app-card">
                        <h4>BetterHelp</h4>
                        <p>Online therapy platform</p>
                        <button class="btn btn-outline">Download</button>
                    </div>
                    <div class="app-card">
                        <h4>Moodpath</h4>
                        <p>Mood tracking and assessment</p>
                        <button class="btn btn-outline">Download</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle modal close
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Initialize rebuilding checklists
function initializeRebuilding() {
    const categoryButtons = document.querySelectorAll('.checklist-category');
    const checklistSections = document.querySelectorAll('.checklist-section');
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    
    // Set up category switching
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section
            checklistSections.forEach(section => section.classList.remove('active'));
            document.getElementById(`${category}-checklist`).classList.add('active');
        });
    });
    
    // Set up checkbox listeners
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateRebuildingProgress);
    });
    
    // Load saved progress
    loadRebuildingProgress();
}

// Update rebuilding progress
function updateRebuildingProgress() {
    const allCheckboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const checkedBoxes = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked');
    const progressFill = document.getElementById('rebuilding-progress');
    const progressText = document.getElementById('rebuilding-progress-text');
    
    const totalItems = allCheckboxes.length;
    const completedItems = checkedBoxes.length;
    const percentage = Math.round((completedItems / totalItems) * 100);
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${percentage}% Complete`;
    }
    
    // Save progress
    saveRebuildingProgress();
}

// Save rebuilding progress
function saveRebuildingProgress() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const progress = {};
    
    checkboxes.forEach(checkbox => {
        progress[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('rebuildingProgress', JSON.stringify(progress));
}

// Load rebuilding progress
function loadRebuildingProgress() {
    const savedProgress = localStorage.getItem('rebuildingProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        
        Object.keys(progress).forEach(checkboxId => {
            const checkbox = document.getElementById(checkboxId);
            if (checkbox) {
                checkbox.checked = progress[checkboxId];
            }
        });
        
        updateRebuildingProgress();
    }
}

// Initialize drone data integration
function initializeDroneData() {
    // Simulate drone feed updates
    setInterval(updateDroneFeeds, 10000);
    console.log('Drone data integration initialized');
}

// Update drone feeds
function updateDroneFeeds() {
    const feedCards = document.querySelectorAll('.feed-card');
    feedCards.forEach(card => {
        const timeElement = card.querySelector('.feed-info span:last-child');
        if (timeElement) {
            const currentTime = new Date();
            const minutesAgo = Math.floor(Math.random() * 10) + 1;
            timeElement.textContent = `${minutesAgo} min ago`;
        }
    });
}

// Initialize satellite imagery
function initializeSatelliteImagery() {
    const timeRangeSelect = document.getElementById('time-range');
    const overlayTypeSelect = document.getElementById('overlay-type');
    const disasterOverlaySelect = document.getElementById('disaster-overlay');
    const timelineSlider = document.getElementById('timeline-slider');
    
    if (timeRangeSelect) {
        timeRangeSelect.addEventListener('change', updateSatelliteImagery);
    }
    if (overlayTypeSelect) {
        overlayTypeSelect.addEventListener('change', updateSatelliteImagery);
    }
    if (disasterOverlaySelect) {
        disasterOverlaySelect.addEventListener('change', updateSatelliteImagery);
    }
    if (timelineSlider) {
        timelineSlider.addEventListener('input', updateTimeline);
    }
    
    console.log('Satellite imagery initialized');
}

// Update satellite imagery
function updateSatelliteImagery() {
    showNotification('Updating satellite imagery...', 'info');
    setTimeout(() => {
        showNotification('Satellite imagery updated', 'success');
    }, 1000);
}

// Update timeline
function updateTimeline() {
    const slider = document.getElementById('timeline-slider');
    const value = slider.value;
    console.log('Timeline updated to:', value);
}

// Initialize AR navigation
function initializeARNavigation() {
    console.log('AR navigation initialized');
}

// Enable AR camera
function enableARCamera() {
    showNotification('Requesting camera access...', 'info');
    setTimeout(() => {
        showNotification('Camera access granted', 'success');
        // Move to next step
        const steps = document.querySelectorAll('.step');
        if (steps.length > 1) {
            steps[0].classList.remove('active');
            steps[1].classList.add('active');
        }
    }, 2000);
}

// Calibrate AR
function calibrateAR() {
    showNotification('Calibrating AR system...', 'info');
    setTimeout(() => {
        showNotification('AR calibration complete', 'success');
        // Move to next step
        const steps = document.querySelectorAll('.step');
        if (steps.length > 2) {
            steps[1].classList.remove('active');
            steps[2].classList.add('active');
        }
    }, 3000);
}

// Start AR navigation
function startARNavigation() {
    showNotification('Starting AR navigation...', 'info');
    setTimeout(() => {
        showNotification('AR navigation active', 'success');
    }, 1000);
}

// Initialize hazard prediction
function initializeHazardPrediction() {
    console.log('Hazard prediction initialized');
}

// View hazard details
function viewHazardDetails(hazardType) {
    const details = {
        landslide: {
            title: 'Landslide Risk Details',
            content: 'High risk of landslides due to recent rainfall and unstable soil conditions. Avoid steep slopes and areas with visible cracks.'
        },
        aftershock: {
            title: 'Aftershock Risk Details',
            content: 'Moderate risk of aftershocks following the main earthquake. Stay alert and avoid damaged structures.'
        },
        flood: {
            title: 'Flood Risk Details',
            content: 'Low risk of flooding in the current area. Monitor water levels and weather conditions.'
        }
    };
    
    const detail = details[hazardType];
    if (detail) {
        showGuideModal(detail);
    }
}

// Initialize AI risk advisor
function initializeAIRiskAdvisor() {
    console.log('AI risk advisor initialized');
}

// Generate risk assessment
function generateRiskAssessment() {
    const location = document.getElementById('user-location').value;
    const familySize = document.getElementById('family-size').value;
    const mobility = document.getElementById('mobility-level').value;
    const disasterType = document.getElementById('disaster-type').value;
    
    if (!location) {
        showNotification('Please enter your location', 'error');
        return;
    }
    
    showNotification('Generating risk assessment...', 'info');
    
    setTimeout(() => {
        const assessment = generatePersonalizedAssessment(location, familySize, mobility, disasterType);
        displayRiskAssessment(assessment);
    }, 2000);
}

// Generate personalized assessment
function generatePersonalizedAssessment(location, familySize, mobility, disasterType) {
    const riskLevel = Math.random() > 0.5 ? 'High' : 'Medium';
    const recommendations = [
        'Evacuate immediately to designated safe zones',
        'Ensure all family members have emergency supplies',
        'Monitor official emergency channels for updates',
        'Prepare for potential power outages',
        'Have a communication plan with family members'
    ];
    
    return {
        riskLevel,
        recommendations,
        familySize,
        mobility,
        disasterType
    };
}

// Display risk assessment
function displayRiskAssessment(assessment) {
    const resultsDiv = document.getElementById('assessment-results');
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <div class="assessment-card">
                <h4>Risk Assessment Results</h4>
                <div class="risk-level ${assessment.riskLevel.toLowerCase()}">
                    <span class="level-text">${assessment.riskLevel} Risk</span>
                </div>
                <div class="recommendations">
                    <h5>Recommendations:</h5>
                    <ul>
                        ${assessment.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                <div class="assessment-details">
                    <p><strong>Family Size:</strong> ${assessment.familySize} people</p>
                    <p><strong>Mobility Level:</strong> ${assessment.mobility}</p>
                    <p><strong>Disaster Type:</strong> ${assessment.disasterType}</p>
                </div>
            </div>
        `;
    }
}

// Initialize voice activation
function initializeVoiceActivation() {
    const voiceToggle = document.getElementById('voice-toggle');
    const voiceSpeed = document.getElementById('voice-speed');
    const voiceVolume = document.getElementById('voice-volume');
    
    if (voiceSpeed) {
        voiceSpeed.addEventListener('input', function() {
            const value = this.value;
            const speedValue = document.getElementById('speed-value');
            if (speedValue) {
                if (value < 0.8) speedValue.textContent = 'Slow';
                else if (value > 1.2) speedValue.textContent = 'Fast';
                else speedValue.textContent = 'Normal';
            }
        });
    }
    
    if (voiceVolume) {
        voiceVolume.addEventListener('input', function() {
            const value = this.value;
            const volumeValue = document.getElementById('volume-value');
            if (volumeValue) {
                volumeValue.textContent = value + '%';
            }
        });
    }
    
    console.log('Voice activation initialized');
}

// Toggle voice activation
function toggleVoiceActivation() {
    const button = document.getElementById('voice-toggle');
    const status = document.getElementById('voice-status');
    
    if (button && status) {
        const isEnabled = button.textContent.includes('Enable');
        
        if (isEnabled) {
            button.innerHTML = '<i class="fas fa-microphone-slash"></i> Disable Voice Commands';
            status.innerHTML = '<span class="status-indicator"><span class="status-dot online"></span><span>Voice commands enabled</span></span>';
            showNotification('Voice commands enabled', 'success');
        } else {
            button.innerHTML = '<i class="fas fa-microphone"></i> Enable Voice Commands';
            status.innerHTML = '<span class="status-indicator"><span class="status-dot offline"></span><span>Voice commands disabled</span></span>';
            showNotification('Voice commands disabled', 'info');
        }
    }
}

// Initialize offline translation
function initializeOfflineTranslation() {
    const sourceLang = document.getElementById('source-language');
    const targetLang = document.getElementById('target-language');
    
    if (sourceLang && targetLang) {
        sourceLang.addEventListener('change', updateTranslations);
        targetLang.addEventListener('change', updateTranslations);
    }
    
    console.log('Offline translation initialized');
}

// Swap languages
function swapLanguages() {
    const sourceLang = document.getElementById('source-language');
    const targetLang = document.getElementById('target-language');
    
    if (sourceLang && targetLang) {
        const temp = sourceLang.value;
        sourceLang.value = targetLang.value;
        targetLang.value = temp;
        updateTranslations();
    }
}

// Update translations
function updateTranslations() {
    const targetLang = document.getElementById('target-language');
    const phrases = {
        'help-phrase': {
            'es': 'Necesito ayuda',
            'fr': 'J\'ai besoin d\'aide',
            'de': 'Ich brauche Hilfe',
            'zh': '我需要帮助',
            'ja': '助けてください',
            'ko': '도움이 필요합니다',
            'ar': 'أحتاج مساعدة'
        },
        'ambulance-phrase': {
            'es': 'Llame una ambulancia',
            'fr': 'Appelez une ambulance',
            'de': 'Rufen Sie einen Krankenwagen',
            'zh': '叫救护车',
            'ja': '救急車を呼んでください',
            'ko': '구급차를 불러주세요',
            'ar': 'اتصل بسيارة إسعاف'
        }
    };
    
    if (targetLang) {
        const lang = targetLang.value;
        Object.keys(phrases).forEach(phraseId => {
            const element = document.getElementById(phraseId);
            if (element && phrases[phraseId][lang]) {
                element.textContent = phrases[phraseId][lang];
            }
        });
    }
}

// Initialize SOS beacon
function initializeSOSBeacon() {
    const beaconVolume = document.getElementById('beacon-volume');
    if (beaconVolume) {
        beaconVolume.addEventListener('input', function() {
            const value = this.value;
            const volumeValue = document.getElementById('beacon-volume-value');
            if (volumeValue) {
                volumeValue.textContent = value + '%';
            }
        });
    }
    console.log('SOS beacon initialized');
}

// Toggle SOS beacon
function toggleSOSBeacon() {
    const button = document.getElementById('beacon-toggle');
    const status = document.getElementById('beacon-status');
    
    if (button && status) {
        const isActive = button.textContent.includes('Activate');
        
        if (isActive) {
            button.innerHTML = '<i class="fas fa-stop"></i> Deactivate SOS Beacon';
            status.innerHTML = '<span class="status-dot online"></span><span>Beacon Active</span>';
            showNotification('SOS beacon activated', 'success');
        } else {
            button.innerHTML = '<i class="fas fa-satellite-dish"></i> Activate SOS Beacon';
            status.innerHTML = '<span class="status-dot offline"></span><span>Beacon Offline</span>';
            showNotification('SOS beacon deactivated', 'info');
        }
    }
}

// Test beacon
function testBeacon() {
    showNotification('Testing SOS beacon...', 'info');
    setTimeout(() => {
        showNotification('Beacon test complete', 'success');
    }, 2000);
}

// Initialize battery saver
function initializeBatterySaver() {
    // Simulate battery updates
    setInterval(updateBatteryStatus, 5000);
    console.log('Battery saver initialized');
}

// Update battery status
function updateBatteryStatus() {
    const batteryFill = document.getElementById('battery-fill');
    const batteryPercentage = document.getElementById('battery-percentage');
    const batteryTime = document.getElementById('battery-time');
    
    if (batteryFill && batteryPercentage) {
        // Simulate battery drain
        const currentPercentage = parseInt(batteryPercentage.textContent);
        const newPercentage = Math.max(0, currentPercentage - Math.random() * 2);
        
        batteryFill.style.width = newPercentage + '%';
        batteryPercentage.textContent = Math.round(newPercentage) + '%';
        
        if (batteryTime) {
            const hours = Math.floor(newPercentage / 12);
            const minutes = Math.floor((newPercentage % 12) * 5);
            batteryTime.textContent = `${hours} hours ${minutes} minutes`;
        }
    }
}

// Toggle survival mode
function toggleSurvivalMode() {
    const button = document.getElementById('survival-toggle');
    const status = document.getElementById('survival-mode-status');
    
    if (button && status) {
        const isEnabled = button.textContent.includes('Enable');
        
        if (isEnabled) {
            button.innerHTML = '<i class="fas fa-power-off"></i> Disable Survival Mode';
            status.textContent = 'Enabled';
            showNotification('Survival mode enabled', 'success');
        } else {
            button.innerHTML = '<i class="fas fa-power-off"></i> Enable Survival Mode';
            status.textContent = 'Disabled';
            showNotification('Survival mode disabled', 'info');
        }
    }
}

// Optimize screen
function optimizeScreen() {
    showNotification('Optimizing screen settings...', 'info');
    setTimeout(() => {
        showNotification('Screen optimized for battery saving', 'success');
    }, 1000);
}

// Optimize network
function optimizeNetwork() {
    showNotification('Optimizing network settings...', 'info');
    setTimeout(() => {
        showNotification('Network optimized for battery saving', 'success');
    }, 1000);
}

// Optimize apps
function optimizeApps() {
    showNotification('Closing background apps...', 'info');
    setTimeout(() => {
        showNotification('Background apps closed', 'success');
    }, 1000);
}

// Initialize digital ID
function initializeDigitalID() {
    console.log('Digital ID initialized');
}

// Update digital ID
function updateDigitalID() {
    const name = document.getElementById('edit-name').value;
    const age = document.getElementById('edit-age').value;
    const bloodType = document.getElementById('edit-blood-type').value;
    const emergencyContact = document.getElementById('edit-emergency-contact').value;
    const allergies = document.getElementById('edit-allergies').value;
    const medicalConditions = document.getElementById('edit-medical-conditions').value;
    
    // Update display
    document.getElementById('card-name').textContent = name;
    document.getElementById('card-age').textContent = age + ' years old';
    document.getElementById('blood-type').textContent = bloodType;
    document.getElementById('emergency-contact').textContent = emergencyContact;
    document.getElementById('allergies').textContent = allergies;
    document.getElementById('medical-conditions').textContent = medicalConditions;
    
    showNotification('Digital ID updated', 'success');
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add CSS for modal and notifications
const additionalStyles = `
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.modal-content {
    background: white;
    border-radius: 15px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    margin: 20px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #eee;
}

.modal-header h3 {
    margin: 0;
    color: #333;
}

.modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
}

.modal-body {
    padding: 20px;
}

.contact-item, .guide-item, .shelter-item, .supply-category {
    margin-bottom: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
}

.contact-item h4, .guide-item h4, .shelter-item h4, .supply-category h4 {
    margin: 0 0 10px 0;
    color: #333;
}

.shelter-item .status {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
}

.shelter-item .status.open {
    background: #d4edda;
    color: #155724;
}

.shelter-item .status.full {
    background: #f8d7da;
    color: #721c24;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    z-index: 10001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    background: #28a745;
}

.notification-error {
    background: #dc3545;
}

.notification-info {
    background: #17a2b8;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize dropdown functionality
function initializeDropdowns() {
    // Handle dropdown clicks on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                // Only prevent default on mobile
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // Handle hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Close all dropdowns when opening/closing menu
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });
}

// ===============================
// EMERGENCY ALERT SYSTEM
// ===============================

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

// ===============================
// WEATHER MONITORING SYSTEM
// ===============================

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

// ===============================
// EMERGENCY CONTACTS SYSTEM
// ===============================

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

// ===============================
// CHATBOT FUNCTIONALITY
// ===============================

// Chatbot Modal Functions
let currentLocation = { latitude: 0, longitude: 0 };
let chatHistory = [];

function openChatbot() {
    console.log('Opening chatbot modal...');
    const modal = document.getElementById('chatbot-modal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Hide notification badge when opening chatbot
    hideChatbotBadge();
    
    // Focus on input field
    setTimeout(() => {
        document.getElementById('chatbot-input').focus();
    }, 300);
}

function closeChatbot() {
    const modal = document.getElementById('chatbot-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear input and disable send button
    input.value = '';
    const sendButton = document.getElementById('send-button');
    sendButton.disabled = true;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Prepare the request payload
        const payload = {
            text: message,
            history: chatHistory.slice(-10), // Keep last 10 messages for context
            location: currentLocation || { latitude: 0, longitude: 0 }
        };
        
        // Get proper API configuration with multiple fallbacks
        let apiUrl;
        console.log('Checking API configuration...');
        
        if (window.AppConfig && window.AppConfig.API_BASE_URL) {
            apiUrl = `${window.AppConfig.API_BASE_URL}/bot/v1/message`;
            console.log('Using window.AppConfig:', window.AppConfig);
        } else if (typeof getConfig === 'function') {
            const config = getConfig();
            apiUrl = `${config.API_BASE_URL}${config.API_ENDPOINTS.chat}`;
            console.log('Using getConfig():', config);
        } else {
            // Fallback to localhost for development
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            apiUrl = isLocal ? 'http://localhost:4002/bot/v1/message' : 'https://sih-india2025.onrender.com/bot/v1/message';
            console.log('Using fallback config, isLocal:', isLocal);
        }
        
        console.log('=== CHATBOT DEBUG ===');
        console.log('API URL:', apiUrl);
        console.log('Payload:', JSON.stringify(payload, null, 2));
        
        // Call the backend API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Debug log the response
        console.log('=== API RESPONSE DEBUG ===');
        console.log('Full response:', JSON.stringify(data, null, 2));
        console.log('data.botMessage:', data.botMessage);
        console.log('data.message:', data.message);
        console.log('botMessage type:', typeof data.botMessage);
        console.log('botMessage length:', data.botMessage ? data.botMessage.length : 'N/A');
        
        // Get bot message with better fallback handling
        let botMessage = data.botMessage || data.message || 'I apologize, but I encountered an issue. Please try again.';
        
        // Ensure the message is not undefined or empty
        if (!botMessage || botMessage.trim() === '' || botMessage === 'undefined') {
            botMessage = 'I\'m here to help with emergency guidance. Please describe your situation and I\'ll provide assistance.';
        }
        
        // Add bot response to chat
        addMessageToChat(botMessage, 'bot');
        
        // Update chat history
        chatHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: data.botMessage }
        );
        
    } catch (error) {
        console.error('Chat API Error:', error);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // FORCE LIVE API - Don't use mock responses
        if (window.FORCE_LIVE_API) {
            addMessageToChat(`⚠️ Backend API error: ${error.message}. The backend is running but returned an error. Please check the console for details and try again.`, 'bot');
        } else {
            // Fallback to mock API if available and not forced to use live
            if (window.MockChatbotAPI && !window.BACKEND_AVAILABLE) {
                try {
                    const mockResponse = await window.MockChatbotAPI.sendMessage(message, currentLocation);
                    addMessageToChat(mockResponse.botMessage, 'bot');
                } catch (mockError) {
                    addMessageToChat('I apologize, but I\'m currently unable to process your request. Please try again later or contact emergency services directly if this is urgent.', 'bot');
                }
            } else {
                addMessageToChat('Connection error. Please check your internet connection and try again.', 'bot');
            }
        }
    } finally {
        // Re-enable send button
        sendButton.disabled = false;
        input.focus();
    }
}

function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    
    // Ensure message is not undefined or empty
    if (!message || message.toString().trim() === '' || message === 'undefined') {
        message = sender === 'user' ? 'Message sent' : 'I\'m here to help with emergency guidance. Please describe your situation.';
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    
    const icon = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="${icon}"></i>
            <span>${message.toString()}</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-content">
            <i class="fas fa-robot"></i>
            <span>AI is typing</span>
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function toggleLocationSharing() {
    const checkbox = document.getElementById('location-sharing');
    
    if (checkbox.checked) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    currentLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        timestamp: new Date().toISOString()
                    };
                    console.log('Location sharing enabled:', currentLocation);
                },
                (error) => {
                    console.error('Location error:', error);
                    checkbox.checked = false;
                    alert('Unable to access location. Please check your browser settings.');
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
            );
        } else {
            checkbox.checked = false;
            alert('Geolocation is not supported by your browser.');
        }
    } else {
        currentLocation = null;
        console.log('Location sharing disabled');
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('chatbot-modal');
    if (event.target === modal) {
        closeChatbot();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('chatbot-modal');
        if (modal.classList.contains('show')) {
            closeChatbot();
        }
    }
});

// Notification Badge Management
function showChatbotBadge(count = 1) {
    const badge = document.getElementById('chatbot-badge');
    const countElement = document.getElementById('badge-count');
    
    if (badge && countElement) {
        countElement.textContent = count > 99 ? '99+' : count.toString();
        badge.classList.remove('hide');
        badge.classList.add('show');
        
        // Add subtle animation to button
        const button = document.getElementById('chatbot-toggle');
        if (button) {
            button.style.animation = 'none';
            button.offsetHeight; // Trigger reflow
            button.style.animation = 'pulseGlow 2s ease-in-out infinite';
        }
    }
}

function hideChatbotBadge() {
    const badge = document.getElementById('chatbot-badge');
    
    if (badge) {
        badge.classList.remove('show');
        badge.classList.add('hide');
        
        // Reset button animation
        const button = document.getElementById('chatbot-toggle');
        if (button) {
            button.style.animation = 'pulseGlow 3s ease-in-out infinite';
        }
    }
}

function updateChatbotBadge(count) {
    if (count > 0) {
        showChatbotBadge(count);
    } else {
        hideChatbotBadge();
    }
}

// Auto-show badge for demonstration after page load
setTimeout(() => {
    // Show badge with count 1 to indicate AI assistant is ready
    showChatbotBadge(1);
}, 2000);

// Check FontAwesome loading and ensure icons are visible
function ensureIconsVisible() {
    const icons = document.querySelectorAll('.simple-chatbot-button i, .chatbot-header h3 i');
    
    icons.forEach(icon => {
        // Clear any text content to avoid double icons
        icon.textContent = '';
        
        // Check if FontAwesome is loaded by checking computed styles
        const computed = window.getComputedStyle(icon, '::before');
        const content = computed.getPropertyValue('content');
        
        // If FontAwesome is loaded properly, mark it
        if (content && content !== 'none' && content !== '""') {
            icon.classList.add('fa-loaded');
            console.log('✅ FontAwesome icon loaded successfully');
        } else {
            // FontAwesome failed, use emoji fallback
            console.log('⚠️ FontAwesome icon not loaded, using emoji fallback');
            icon.classList.remove('fa-loaded');
            icon.style.position = 'relative';
        }
    });
}

// Run icon check after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(ensureIconsVisible, 500);
});

// Also run check when fonts are loaded
if (document.fonts) {
    document.fonts.ready.then(ensureIconsVisible);
}

// Make functions globally available
window.openChatbot = openChatbot;
window.closeChatbot = closeChatbot;
window.sendMessage = sendMessage;
window.showChatbotBadge = showChatbotBadge;
window.hideChatbotBadge = hideChatbotBadge;
window.updateChatbotBadge = updateChatbotBadge;
window.handleChatKeyPress = handleChatKeyPress;
window.toggleLocationSharing = toggleLocationSharing;
