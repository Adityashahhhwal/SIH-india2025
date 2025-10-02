// Map functionality for disaster visualization
let currentDisasterFilter = 'all';

function initializeMapControls() {
    updateMapVisualization();
}

function filterDisasters(type) {
    currentDisasterFilter = type;
    updateMapVisualization();
    updatePredictionCards();
}

function updateMapOverlaysForDisaster(disasterType) {
    const overlayCheckboxes = document.querySelectorAll('.overlay-toggle input[type=\"checkbox\"]');
    
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

function updateMapVisualization() {
    // Placeholder for map update logic
    console.log('Map visualization updated for:', currentDisasterFilter);
}

function updatePredictionCards() {
    // Placeholder for prediction card updates
    console.log('Prediction cards updated');
}

// Make functions globally available
window.initializeMapControls = initializeMapControls;
window.filterDisasters = filterDisasters;
window.updateMapOverlaysForDisaster = updateMapOverlaysForDisaster;
