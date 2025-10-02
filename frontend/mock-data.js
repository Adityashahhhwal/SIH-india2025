const mockAlertTypes = [
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

const mockWeatherConditions = ['clear', 'cloudy', 'rainy', 'stormy', 'snowy'];

const mockLocalContacts = {
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
			name: 'City General Hospital',
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

window.mockAlertTypes = mockAlertTypes;
window.mockWeatherConditions = mockWeatherConditions;
window.mockLocalContacts = mockLocalContacts;