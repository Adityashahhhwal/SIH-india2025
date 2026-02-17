import { z } from 'zod';

/**
 * Validates query params for GET /api/v1/alerts/active
 */
export const queryActiveAlertsSchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).default(50),
    type: z.enum(['critical', 'warning', 'info', 'success']).optional(),
});

/**
 * Validates query params for GET /api/v1/resources/nearby
 */
export const queryNearbyResourcesSchema = z.object({
    lat: z.coerce.number().min(-90).max(90),
    lng: z.coerce.number().min(-180).max(180),
    radius: z.coerce.number().int().min(100).max(100000).default(10000),
    type: z.enum(['shelter', 'hospital', 'food_bank', 'police']).optional(),
});

/**
 * Validates body for POST /api/v1/reports
 */
export const createReportSchema = z.object({
    reporterName: z.string().trim().min(1).max(100),
    type: z.enum(['damage', 'SOS', 'resource_request']),
    description: z.string().trim().min(1).max(2000),
    location: z.object({
        coordinates: z
            .array(z.number())
            .length(2)
            .refine(
                (c) => c[0] >= -180 && c[0] <= 180 && c[1] >= -90 && c[1] <= 90,
                { message: 'Coordinates must be [longitude, latitude] within valid ranges.' }
            ),
    }),
    imageUrl: z.string().url().optional(),
});

/**
 * Generic middleware factory for Zod validation.
 * @param {z.ZodSchema} schema - The Zod schema to validate against
 * @param {'body' | 'query'} source - Where to read data from
 */
export function validate(schema, source = 'body') {
    return (req, res, next) => {
        const result = schema.safeParse(source === 'query' ? req.query : req.body);
        if (!result.success) {
            return res.status(400).json({
                error: 'Validation failed',
                details: result.error.issues,
            });
        }
        // Attach parsed (and coerced) values
        req.validated = result.data;
        next();
    };
}
