// Mock API responses for disaster management chatbot
class MockChatbotAPI {
    constructor() {
        this.responses = {
            disaster_types: [
                "For earthquakes: Drop, Cover, and Hold On. Stay away from windows and heavy objects.",
                "For floods: Move to higher ground immediately. Avoid walking in moving water.",
                "For hurricanes: Stay indoors, away from windows. Have emergency supplies ready.",
                "For wildfires: Evacuate if instructed. Cover nose and mouth to avoid smoke inhalation.",
                "For tornadoes: Go to the lowest floor, stay in center of building, avoid windows."
            ],
            emergency_contacts: [
                "Emergency Services: 911 (US), 112 (EU), 100 (India)",
                "Local Emergency Management: Contact your local emergency management office",
                "Red Cross: Visit redcross.org for local chapter information",
                "FEMA: 1-800-621-3362 (US Federal Emergency Management)"
            ],
            safety_tips: [
                "Always have an emergency kit ready with water, food, flashlight, and first aid supplies.",
                "Create a family emergency plan and practice it regularly.",
                "Stay informed through official emergency alerts and weather services.",
                "Know your evacuation routes and have multiple options planned.",
                "Keep important documents in a waterproof container."
            ],
            first_aid: [
                "For bleeding: Apply direct pressure with clean cloth, elevate if possible.",
                "For burns: Cool with water, do not use ice. Cover with sterile bandage.",
                "For choking: Perform Heimlich maneuver - abdominal thrusts below ribcage.",
                "For shock: Keep person warm, elevate legs, monitor breathing.",
                "For fractures: Immobilize the area, do not move unless in immediate danger."
            ],
            general: [
                "I'm here to help with disaster preparedness and emergency guidance.",
                "Would you like information about emergency contacts, safety procedures, or disaster preparation?",
                "I can provide guidance on earthquakes, floods, hurricanes, wildfires, and other emergencies.",
                "What type of emergency information do you need? I'm here to help keep you safe.",
                "Stay calm and follow official emergency instructions. How can I assist you today?"
            ]
        };
    }

    // Simulate API delay
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Generate contextual response based on message content
    getContextualResponse(message) {
        const msg = message.toLowerCase();
        
        if (msg.includes('earthquake') || msg.includes('quake')) {
            return this.getRandomResponse('disaster_types').replace('For earthquakes:', 'EARTHQUAKE SAFETY:');
        }
        
        if (msg.includes('flood') || msg.includes('water')) {
            return this.getRandomResponse('disaster_types').replace('For floods:', 'FLOOD SAFETY:');
        }
        
        if (msg.includes('hurricane') || msg.includes('storm')) {
            return this.getRandomResponse('disaster_types').replace('For hurricanes:', 'HURRICANE SAFETY:');
        }
        
        if (msg.includes('fire') || msg.includes('smoke')) {
            return this.getRandomResponse('disaster_types').replace('For wildfires:', 'WILDFIRE SAFETY:');
        }
        
        if (msg.includes('tornado') || msg.includes('twister')) {
            return this.getRandomResponse('disaster_types').replace('For tornadoes:', 'TORNADO SAFETY:');
        }
        
        if (msg.includes('emergency') || msg.includes('contact') || msg.includes('help')) {
            return this.getRandomResponse('emergency_contacts');
        }
        
        if (msg.includes('first aid') || msg.includes('medical') || msg.includes('injury')) {
            return this.getRandomResponse('first_aid');
        }
        
        if (msg.includes('safety') || msg.includes('prepare') || msg.includes('kit')) {
            return this.getRandomResponse('safety_tips');
        }
        
        return this.getRandomResponse('general');
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Mock API call
    async sendMessage(message, location = null) {
        await this.delay(800 + Math.random() * 1200); // Simulate network delay
        
        let response = this.getContextualResponse(message);
        
        // Add location context if provided
        if (location) {
            response += `\n\n📍 Based on your location (${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}), please check local emergency services and evacuation routes.`;
        }
        
        return {
            success: true,
            data: {
                message: response,
                timestamp: new Date().toISOString(),
                type: 'text'
            }
        };
    }
}

// Create global mock API instance
window.MockChatbotAPI = new MockChatbotAPI();