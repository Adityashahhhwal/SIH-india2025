// Mock API responses for disaster management chatbot
class MockChatbotAPI {
    constructor() {
        this.responses = {
            earthquake: [
                "**Earthquake Safety**\n• Drop, cover, and hold immediately\n• Stay under sturdy furniture\n• Move away from windows and heavy objects",
                "**During Earthquake**\n• Drop to hands and knees\n• Take cover under desk or table\n• Hold on and protect your head",
                "**Earthquake Response**\n• Stay calm and don't run outside\n• If outdoors, move away from buildings\n• After shaking stops, check for injuries"
            ],
            flood: [
                "**Flood Safety**\n• Move to higher ground immediately\n• Avoid walking in moving water\n• Turn off utilities if safe to do so",
                "**Flash Flood Alert**\n• Get to high ground now\n• 6 inches of water can knock you down\n• Don't drive through flooded roads",
                "**Flood Preparation**\n• Have evacuation routes planned\n• Keep emergency kit ready\n• Monitor weather alerts closely"
            ],
            fire: [
                "**Fire Safety**\n• Get low and crawl to exit\n• Feel doors before opening\n• Call 101 once you're safe",
                "**Wildfire Emergency**\n• Evacuate immediately if ordered\n• Cover nose and mouth\n• Stay on designated evacuation routes",
                "**House Fire**\n• Get out and stay out\n• Meet at designated meeting point\n• Never go back inside"
            ],
            cyclone: [
                "**Cyclone Safety**\n• Stay indoors away from windows\n• Move to interior room on ground floor\n• Keep emergency supplies ready",
                "**Hurricane Preparation**\n• Secure loose outdoor items\n• Stock up on water and non-perishable food\n• Charge all electronic devices",
                "**Storm Safety**\n• Stay inside until authorities say it's safe\n• Avoid flooded roads\n• Beware of downed power lines"
            ],
            tsunami: [
                "**Tsunami Alert**\n• Move inland and to high ground NOW\n• Don't wait for official warning\n• Stay away until all-clear is given",
                "**Tsunami Safety**\n• Get as far inland as possible\n• If you can't go inland, go up\n• Stay alert for multiple waves"
            ],
            general: [
                "I'm your disaster management assistant. I can help with earthquake, flood, fire, cyclone, and other emergency guidance.",
                "Tell me about your emergency situation and I'll provide specific safety advice.",
                "For immediate life-threatening emergencies, call 112 (India) or your local emergency number first.",
                "I can provide guidance on disaster preparedness, emergency procedures, and safety measures."
            ],
            emergency_contacts: {
                india: "**India Emergency Numbers**\nEmergency: 112\nPolice: 100 | Fire: 101\nAmbulance: 108",
                general: "**Emergency Contacts**\nContact your local emergency services\nHave these numbers ready before disasters strike"
            },
            first_aid: [
                "**Basic First Aid**\n• Check for breathing and pulse\n• Apply pressure to stop bleeding\n• Keep person warm and comfortable",
                "**Emergency First Aid**\n• Call for help first\n• Don't move injured person unless in danger\n• Monitor breathing and consciousness"
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
        
        // Time and date queries
        if (msg.includes('time') || msg.includes('date') || msg.includes('today')) {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            const date = now.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            return `📅 Current time: ${time}, ${date}`;
        }
        
        // Disaster-specific responses
        if (msg.includes('earthquake') || msg.includes('shaking') || msg.includes('tremor')) {
            return this.getRandomResponse('earthquake');
        }
        
        if (msg.includes('flood') || msg.includes('water') || msg.includes('rain')) {
            return this.getRandomResponse('flood');
        }
        
        if (msg.includes('fire') || msg.includes('smoke') || msg.includes('burn')) {
            return this.getRandomResponse('fire');
        }
        
        if (msg.includes('cyclone') || msg.includes('hurricane') || msg.includes('storm') || msg.includes('wind')) {
            return this.getRandomResponse('cyclone');
        }
        
        if (msg.includes('tsunami') || msg.includes('wave')) {
            return this.getRandomResponse('tsunami');
        }
        
        // Emergency contacts
        if (msg.includes('emergency') || msg.includes('contact') || msg.includes('number') || msg.includes('help')) {
            if (msg.includes('india') || msg.includes('indian')) {
                return this.responses.emergency_contacts.india;
            }
            return this.responses.emergency_contacts.general;
        }
        
        // First aid
        if (msg.includes('first aid') || msg.includes('medical') || msg.includes('injury') || msg.includes('bleeding')) {
            return this.getRandomResponse('first_aid');
        }
        
        return this.getRandomResponse('general');
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category];
        if (Array.isArray(responses)) {
            return responses[Math.floor(Math.random() * responses.length)];
        }
        return responses;
    }
    
    // Mock API call that matches the backend format
    async sendMessage(message, location = null) {
        await this.delay(800 + Math.random() * 1200); // Simulate network delay
        
        let response = this.getContextualResponse(message);
        
        // Add location context if provided
        if (location) {
            response += `\n\n📍 Based on your location, please check local emergency services and evacuation routes.`;
        }
        
        // Match the backend API response format
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