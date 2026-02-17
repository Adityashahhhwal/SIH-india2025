/**
 * seed.js — Populates the MongoDB database with realistic Indian disaster data.
 *
 * Usage:
 *   cd backend && npm run seed
 *
 * Requires MONGO_URI in .env
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Disaster from '../models/disaster.model.js';
import Alert from '../models/alert.model.js';
import Resource from '../models/resource.model.js';
import Report from '../models/report.model.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error('MONGO_URI is required in .env to run the seed script.');
    process.exit(1);
}

// --- Seed Data ---

const disasters = [
    {
        type: 'Flood',
        severity: 'critical',
        title: 'Flash Flood Warning — Brahmaputra Basin, Assam',
        description: 'Severe flooding in Kamrup and Nagaon districts. Water levels 2m above danger mark. Over 50 villages submerged.',
        location: { type: 'Point', coordinates: [91.7362, 26.1445] }, // Guwahati
        affectedRadius: 25000,
        status: 'active',
    },
    {
        type: 'Earthquake',
        severity: 'warning',
        title: 'Seismic Activity Detected — Kutch Region, Gujarat',
        description: '4.8 magnitude tremor recorded at 15km depth. Aftershock monitoring underway.',
        location: { type: 'Point', coordinates: [69.8597, 23.2420] }, // Bhuj
        affectedRadius: 15000,
        status: 'active',
    },
    {
        type: 'Cyclone',
        severity: 'critical',
        title: 'Cyclone Biparjoy — Odisha Coastal Belt',
        description: 'Category 3 cyclone approaching Puri coast. Winds expected to reach 130 km/h. Mandatory evacuation issued.',
        location: { type: 'Point', coordinates: [85.8315, 19.8135] }, // Puri
        affectedRadius: 50000,
        status: 'active',
    },
    {
        type: 'Landslide',
        severity: 'warning',
        title: 'Landslide Risk — Chamoli District, Uttarakhand',
        description: 'Heavy rainfall has destabilized slopes near Joshimath. Roads blocked. 3 villages isolated.',
        location: { type: 'Point', coordinates: [79.5636, 30.5562] }, // Joshimath
        affectedRadius: 8000,
        status: 'active',
    },
];

const now = new Date();
const hoursFromNow = (h) => new Date(now.getTime() + h * 60 * 60 * 1000);

const alerts = [
    {
        type: 'critical',
        message: 'Flash flood warning issued for Sector 4 — Brahmaputra basin.',
        source: 'India Meteorological Department',
        expiresAt: hoursFromNow(24),
    },
    {
        type: 'critical',
        message: 'Cyclone Biparjoy: Mandatory evacuation for Puri coastal areas.',
        source: 'National Disaster Response Force',
        expiresAt: hoursFromNow(48),
    },
    {
        type: 'warning',
        message: 'Heavy rainfall expected in Uttarakhand for next 72 hours.',
        source: 'India Meteorological Department',
        expiresAt: hoursFromNow(72),
    },
    {
        type: 'warning',
        message: 'Aftershock advisory active for Kutch, Gujarat. Stay alert.',
        source: 'National Centre for Seismology',
        expiresAt: hoursFromNow(12),
    },
    {
        type: 'warning',
        message: 'Road closures on NH-7 near Chamoli due to landslide debris.',
        source: 'Uttarakhand State Disaster Management',
        expiresAt: hoursFromNow(36),
    },
    {
        type: 'info',
        message: 'Shelter B capacity updated to 85%. 120 beds available.',
        source: 'System',
        expiresAt: hoursFromNow(6),
    },
    {
        type: 'info',
        message: 'NDRF teams deployed to Guwahati for flood relief operations.',
        source: 'National Disaster Response Force',
        expiresAt: hoursFromNow(48),
    },
    {
        type: 'success',
        message: 'Power restored in Bhubaneswar urban area. All hospitals online.',
        source: 'Odisha State Electricity Board',
        expiresAt: hoursFromNow(12),
    },
];

const resources = [
    // Shelters
    {
        name: 'Guwahati Relief Camp Alpha',
        type: 'shelter',
        location: { type: 'Point', coordinates: [91.7468, 26.1158] },
        status: 'open',
        capacity: { total: 500, current: 340, unit: 'people' },
        contact: { phone: '+91-361-2540112', person: 'Rajesh Kumar' },
        tags: ['medical', 'wifi', 'charging'],
    },
    {
        name: 'Bhuj Community Center',
        type: 'shelter',
        location: { type: 'Point', coordinates: [69.6669, 23.2420] },
        status: 'open',
        capacity: { total: 200, current: 75, unit: 'people' },
        contact: { phone: '+91-2832-250011', person: 'Priya Patel' },
        tags: ['children', 'elderly', 'charging'],
    },
    {
        name: 'Puri Cyclone Shelter Delta-1',
        type: 'shelter',
        location: { type: 'Point', coordinates: [85.8245, 19.8070] },
        status: 'open',
        capacity: { total: 800, current: 612, unit: 'people' },
        contact: { phone: '+91-6752-222233', person: 'Anil Mohanty' },
        tags: ['medical', 'food', 'wifi'],
    },
    {
        name: 'Joshimath Emergency Shelter',
        type: 'shelter',
        location: { type: 'Point', coordinates: [79.5636, 30.5562] },
        status: 'open',
        capacity: { total: 150, current: 98, unit: 'people' },
        contact: { phone: '+91-1389-222011', person: 'Suresh Rawat' },
        tags: ['heating', 'medical'],
    },
    {
        name: 'New Delhi Emergency Hub',
        type: 'shelter',
        location: { type: 'Point', coordinates: [77.2090, 28.6139] },
        status: 'open',
        capacity: { total: 1000, current: 120, unit: 'people' },
        contact: { phone: '+91-11-23438091', person: 'Aakash Sharma' },
        tags: ['medical', 'wifi', 'charging', 'food'],
    },
    {
        name: 'Chennai Flood Relief Center',
        type: 'shelter',
        location: { type: 'Point', coordinates: [80.2707, 13.0827] },
        status: 'open',
        capacity: { total: 600, current: 250, unit: 'people' },
        contact: { phone: '+91-44-25384520', person: 'Lakshmi Narayanan' },
        tags: ['children', 'medical', 'food'],
    },
    // Hospitals
    {
        name: 'GMCH Guwahati',
        type: 'hospital',
        location: { type: 'Point', coordinates: [91.7876, 26.1823] },
        status: 'open',
        capacity: { total: 300, current: 245, unit: 'beds' },
        contact: { phone: '+91-361-2529457', person: 'Dr. B. Deka' },
        tags: ['emergency', 'trauma', 'icu'],
    },
    {
        name: 'SCB Medical College, Cuttack',
        type: 'hospital',
        location: { type: 'Point', coordinates: [85.8830, 20.4625] },
        status: 'open',
        capacity: { total: 450, current: 380, unit: 'beds' },
        contact: { phone: '+91-671-2414080', person: 'Dr. S. Mishra' },
        tags: ['emergency', 'trauma', 'icu', 'burns'],
    },
    {
        name: 'GK General Hospital, Bhuj',
        type: 'hospital',
        location: { type: 'Point', coordinates: [69.6669, 23.2530] },
        status: 'open',
        capacity: { total: 200, current: 110, unit: 'beds' },
        contact: { phone: '+91-2832-252800', person: 'Dr. M. Shah' },
        tags: ['emergency', 'orthopedics'],
    },
    // Food Banks
    {
        name: 'Guwahati Central Food Distribution',
        type: 'food_bank',
        location: { type: 'Point', coordinates: [91.7362, 26.1445] },
        status: 'open',
        capacity: { total: 5000, current: 2100, unit: 'meals' },
        contact: { phone: '+91-361-2540200', person: 'Meena Das' },
        tags: ['vegetarian', 'baby-food'],
    },
    {
        name: 'Puri Relief Kitchen',
        type: 'food_bank',
        location: { type: 'Point', coordinates: [85.8315, 19.8135] },
        status: 'open',
        capacity: { total: 3000, current: 1800, unit: 'meals' },
        contact: { phone: '+91-6752-222500', person: 'Bimal Rath' },
        tags: ['vegetarian', 'halal'],
    },
    // Police
    {
        name: 'Dispur Police Station — Disaster Coordination',
        type: 'police',
        location: { type: 'Point', coordinates: [91.7898, 26.1407] },
        status: 'open',
        capacity: { total: 50, current: 42, unit: 'people' },
        contact: { phone: '+91-361-2261000', person: 'SP R. Gogoi' },
        tags: ['rescue', 'evacuation'],
    },
];

// --- Run Seed ---

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB.');

        // Clear existing data
        await Promise.all([
            Disaster.deleteMany({}),
            Alert.deleteMany({}),
            Resource.deleteMany({}),
            Report.deleteMany({}),
        ]);
        console.log('Cleared existing collections.');

        // Insert seed data
        const [insertedDisasters, insertedAlerts, insertedResources] = await Promise.all([
            Disaster.insertMany(disasters),
            Alert.insertMany(alerts),
            Resource.insertMany(resources),
        ]);

        console.log(`Inserted ${insertedDisasters.length} disasters.`);
        console.log(`Inserted ${insertedAlerts.length} alerts.`);
        console.log(`Inserted ${insertedResources.length} resources.`);

        // Link first two alerts to the first disaster
        if (insertedDisasters.length > 0 && insertedAlerts.length >= 2) {
            await Alert.updateMany(
                { _id: { $in: [insertedAlerts[0]._id, insertedAlerts[1]._id] } },
                { $set: { disasterId: insertedDisasters[0]._id } }
            );
            console.log('Linked critical alerts to Assam flood disaster.');
        }

        console.log('\n✅ Seed complete. Database is ready for demo.');
    } catch (error) {
        console.error('Seed failed:', error.message);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

seed();
