let chatHistory = [];
let currentLocation = null;

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`
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

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
}

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

function updateMapButtons(activeType) {
    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-disaster') === activeType) {
            btn.classList.add('active');
        }
    });
}

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
                riskLevel.className = `risk-level ${disaster.riskLevel}`
            }
            
            if (confidence) {
                confidence.textContent = `Confidence: ${disaster.confidence}%`;
            }
            
            if (timeline) {
                timeline.textContent = `ETA: ${disaster.eta}`
            }
            
            if (progressFill) {
                progressFill.style.width = `${disaster.confidence}%`;
            }
        }
    });
}

function updateLastUpdateTime() {
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (lastUpdateElement) {
        const now = new Date();
        lastUpdateElement.textContent = now.toLocaleTimeString();
    }
}

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

function saveChecklistProgress() {
    const checkboxes = document.querySelectorAll('.checklist-list input[type="checkbox"]');
    const progress = {};
    
    checkboxes.forEach(checkbox => {
        progress[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('checklistProgress', JSON.stringify(progress));
}

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

function toggleNotifications() {
    if (notificationPermission) {
        notificationPermission = false;
        showNotification('Notifications disabled', 'info');
    } else {
        requestNotificationPermission();
    }
    updateNotificationButton();
}

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

function sendNotification(alert) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(alert.title, {
            body: alert.message,
            icon: '/favicon.ico',
            tag: alert.id
        });
    }
}

function updateLiveDisplay() {
    updateShelterDisplay();
    updateRoadDisplay();
    updateWildfireDisplay();
    updateFloodDisplay();
}

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

function saveKitProgress() {
    const checkboxes = document.querySelectorAll('.kit-item input[type="checkbox"]');
    const progress = {};
    
    checkboxes.forEach(checkbox => {
        progress[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('survivalKitProgress', JSON.stringify(progress));
}

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

function getDirections(resourceName) {
    // In a real app, this would integrate with Google Maps or Apple Maps
    showNotification(`Opening directions to ${resourceName}`, 'info');
    
    // Simulate opening maps app
    setTimeout(() => {
        showNotification('Directions opened in maps app', 'success');
    }, 1000);
}

function callResource(phoneNumber) {
    // In a real app, this would initiate a phone call
    showNotification(`Calling ${phoneNumber}`, 'info');
    
    // Simulate call initiation
    setTimeout(() => {
        showNotification('Call initiated', 'success');
    }, 500);
}

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

function updateFamilyMemberStatus(memberName, status, message) {
    // In a real app, this would update the family member's status
    console.log(`Updated ${memberName} status to ${status}: ${message}`);
}

function loadSavedStatus() {
    const savedStatus = localStorage.getItem('currentStatus');
    if (savedStatus) {
        const statusButton = document.querySelector(`[data-status="${savedStatus}"]`);
        if (statusButton) {
            statusButton.classList.add('active');
        }
    }
}

async function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear input and disable send button
    input.value = '';
    const sendButton = document.getElementById('send-button');
    if (sendButton) {
        sendButton.disabled = true;
    }
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    chatHistory.push({ role: 'user', content: message });
    if (chatHistory.length > 20) {
        chatHistory = chatHistory.slice(-20);
    }
    
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
            apiUrl = `${config.API_BASE_URL}${config.API_ENDPOINTS.chat}`
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
        chatHistory.push({ role: 'assistant', content: botMessage });
        if (chatHistory.length > 20) {
            chatHistory = chatHistory.slice(-20);
        }
        
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
                    if (mockResponse?.success && mockResponse.data?.message) {
                        const mockMessage = `🤖 ${mockResponse.data.message}`;
                        addMessageToChat(mockMessage, 'bot');
                        chatHistory.push({ role: 'assistant', content: mockMessage });
                        if (chatHistory.length > 20) {
                            chatHistory = chatHistory.slice(-20);
                        }
                        addMessageToChat('ℹ️ Note: Using offline mode - connect to internet for full functionality.', 'bot');
                        return;
                    }
                } catch (mockError) {
                    console.error('Mock API also failed:', mockError);
                    addMessageToChat('I apologize, but I\'m currently unable to process your request. Please try again later or contact emergency services directly if this is urgent.', 'bot');
                }
            } else {
                addMessageToChat('Connection error. Please check your internet connection and try again.', 'bot');
            }
        }
    } finally {
        // Re-enable send button
        if (sendButton) {
            sendButton.disabled = false;
        }
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
    
    messageDiv.innerHTML = `
        <div class="message-content">
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

// Function to open chatbot modal
function openChatbot() {
    const modal = document.getElementById('chatbot-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        
        // Focus on input field
        const input = document.getElementById('chatbot-input');
        if (input) {
            setTimeout(() => input.focus(), 100);
        }
        
        // Hide notification badge when opened
        hideChatbotBadge();
        
        console.log('Chatbot opened');
    }
}

// Function to close chatbot modal
function closeChatbot() {
    const modal = document.getElementById('chatbot-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        console.log('Chatbot closed');
    }
}

// Function to handle Enter key press in chat input
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
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

// Make functions globally available (must be at the end after all definitions)
window.openChatbot = openChatbot;
window.closeChatbot = closeChatbot;
window.sendMessage = sendMessage;
window.showChatbotBadge = showChatbotBadge;
window.hideChatbotBadge = hideChatbotBadge;
window.updateChatbotBadge = updateChatbotBadge;
window.handleChatKeyPress = handleChatKeyPress;
window.toggleLocationSharing = toggleLocationSharing;
