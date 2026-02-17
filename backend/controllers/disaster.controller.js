import Disaster from '../models/disaster.model.js';

/**
 * GET /api/v1/disasters/active
 * Returns all active disaster zones with GeoJSON location data for the DisasterMap.
 */
export async function getActiveDisasters(_req, res) {
    try {
        const disasters = await Disaster.find({ status: 'active' })
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json({ disasters });
    } catch (error) {
        console.error('[Disaster Controller] getActiveDisasters error:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve disasters.' });
    }
}
