document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    startDataSimulation();
    updateLastUpdateTime();
    initializeDropdowns();
    initializeChecklistSystem();
    initializeOfflineMode();
    initializeAlerts();
    initializeLiveUpdates();
    initializeCrowdsourcedReports();
    initializeEmergencyNumbers();
    initializeFirstAid();
    initializeSurvivalKit();
    initializeResourceFinder();
    initializeFamilyLocator();
    initializeVolunteerAid();
    initializeMultilingualSupport();
    initializeAccessibilityFeatures();
    initializeSimulationDrill();
    initializeEducationalContent();
    initializeAIAssistant();
    initializeDamageReport();
    initializeInsuranceAid();
    initializeMentalHealth();
    initializeRebuilding();
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

function initializeChecklistSystem() {
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

function initializeEmergencyNumbers() {
    // Emergency numbers are already in HTML, no additional JS needed
    // The tel: links will automatically open phone dialer on mobile devices
    console.log('Emergency numbers initialized');
}

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

function initializeVolunteerAid() {
    // Volunteer & aid coordination is mostly static content
    // The contact and volunteer functions are already defined
    console.log('Volunteer & aid coordination initialized');
}

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

function initializeDamageReport() {
    const form = document.getElementById('damage-report-form');
    
    if (form) {
        form.addEventListener('submit', handleDamageReport);
    }
}

function initializeInsuranceAid() {
    // Insurance & aid resources are mostly static content
    // The contact and guide functions are already defined
    console.log('Insurance & aid resources initialized');
}

function initializeMentalHealth() {
    // Mental health support is mostly static content
    // The contact and guide functions are already defined
    console.log('Mental health support initialized');
}

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

function initializeDroneData() {
    // Simulate drone feed updates
    setInterval(updateDroneFeeds, 10000);
    console.log('Drone data integration initialized');
}

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

function initializeARNavigation() {
    console.log('AR navigation initialized');
}

function initializeHazardPrediction() {
    console.log('Hazard prediction initialized');
}

function initializeAIRiskAdvisor() {
    console.log('AI risk advisor initialized');
}

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

function initializeOfflineTranslation() {
    const sourceLang = document.getElementById('source-language');
    const targetLang = document.getElementById('target-language');
    
    if (sourceLang && targetLang) {
        sourceLang.addEventListener('change', updateTranslations);
        targetLang.addEventListener('change', updateTranslations);
    }
    
    console.log('Offline translation initialized');
}

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

function initializeBatterySaver() {
    // Simulate battery updates
    setInterval(updateBatteryStatus, 5000);
    console.log('Battery saver initialized');
}

function initializeDigitalID() {
    console.log('Digital ID initialized');
}
