import Disaster from '../models/disaster.model.js';
import Resource from '../models/resource.model.js';
import Alert from '../models/alert.model.js';

/**
 * GET /api/v1/stats/summary
 * Returns aggregated dashboard statistics for the StatsCard components.
 */
export async function getSummary(_req, res) {
    try {
        const now = new Date();

        // Run all queries concurrently for performance
        const [activeHazards, shelterStats, activeAlertCount] = await Promise.all([
            // Count active disasters grouped by severity
            Disaster.countDocuments({ status: 'active' }),

            // Aggregate shelter capacity data
            Resource.aggregate([
                { $match: { type: 'shelter', status: { $ne: 'closed' } } },
                {
                    $group: {
                        _id: null,
                        totalShelters: { $sum: 1 },
                        totalCapacity: { $sum: '$capacity.total' },
                        currentOccupancy: { $sum: '$capacity.current' },
                    },
                },
            ]),

            // Count non-expired alerts
            Alert.countDocuments({ expiresAt: { $gt: now } }),
        ]);

        const shelter = shelterStats[0] || {
            totalShelters: 0,
            totalCapacity: 0,
            currentOccupancy: 0,
        };

        const shelterPercentage = shelter.totalCapacity > 0
            ? Math.round((shelter.currentOccupancy / shelter.totalCapacity) * 100)
            : 0;

        return res.status(200).json({
            stats: {
                activeHazards,
                sheltersOpen: shelter.totalShelters,
                shelterOccupancy: `${shelterPercentage}%`,
                peopleAssisted: shelter.currentOccupancy,
                activeAlerts: activeAlertCount,
                systemStatus: 'online',
            },
        });
    } catch (error) {
        console.error('[Stats Controller] getSummary error:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve stats.' });
    }
}
