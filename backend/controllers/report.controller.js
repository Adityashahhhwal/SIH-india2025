import Report from '../models/report.model.js';

/**
 * POST /api/v1/reports
 * Submits a new crowdsourced incident report.
 */
export async function createReport(req, res) {
    try {
        const data = req.validated;

        const report = await Report.create({
            reporterName: data.reporterName,
            type: data.type,
            description: data.description,
            location: {
                type: 'Point',
                coordinates: data.location.coordinates,
            },
            imageUrl: data.imageUrl || null,
        });

        return res.status(201).json({
            message: 'Report submitted successfully.',
            report,
        });
    } catch (error) {
        console.error('[Report Controller] createReport error:', error.message);
        return res.status(500).json({ error: 'Failed to submit report.' });
    }
}
