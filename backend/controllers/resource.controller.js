import Resource from '../models/resource.model.js';

/**
 * GET /api/v1/resources/shelters
 * Returns all shelters with capacity data for the CapacityBar component.
 */
export async function getShelters(_req, res) {
    try {
        const shelters = await Resource.find({ type: 'shelter' })
            .select('name status capacity location tags')
            .sort({ 'capacity.current': -1 })
            .lean();

        return res.status(200).json({ resources: shelters });
    } catch (error) {
        console.error('[Resource Controller] getShelters error:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve shelters.' });
    }
}

/**
 * GET /api/v1/resources/nearby
 * Returns resources near a given location using MongoDB $nearSphere.
 * Requires validated query params: lat, lng, radius (meters), optional type filter.
 */
export async function getNearby(req, res) {
    try {
        const { lat, lng, radius, type } = req.validated;

        const filter = {
            location: {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [lng, lat], // GeoJSON uses [lng, lat]
                    },
                    $maxDistance: radius,
                },
            },
        };

        if (type) {
            filter.type = type;
        }

        const resources = await Resource.find(filter)
            .limit(50)
            .lean();

        return res.status(200).json({ resources });
    } catch (error) {
        console.error('[Resource Controller] getNearby error:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve nearby resources.' });
    }
}
