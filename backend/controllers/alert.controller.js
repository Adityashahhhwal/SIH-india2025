import Alert from '../models/alert.model.js';

/**
 * GET /api/v1/alerts/active
 * Returns the latest active (non-expired) alerts, sorted by newest first.
 */
export async function getActiveAlerts(req, res) {
    try {
        const { limit, type } = req.validated;
        const now = new Date();

        const filter = { expiresAt: { $gt: now } };
        if (type) {
            filter.type = type;
        }

        const alerts = await Alert.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();

        return res.status(200).json({ alerts });
    } catch (error) {
        console.error('[Alert Controller] getActiveAlerts error:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve alerts.' });
    }
}
