import express from 'express';
import { getActiveAlerts } from '../controllers/alert.controller.js';
import { getSummary } from '../controllers/stats.controller.js';
import { getShelters, getNearby } from '../controllers/resource.controller.js';
import { getActiveDisasters } from '../controllers/disaster.controller.js';
import { createReport } from '../controllers/report.controller.js';
import {
    validate,
    queryActiveAlertsSchema,
    queryNearbyResourcesSchema,
    createReportSchema,
} from '../validators/api.validators.js';

const router = express.Router();

// --- Monitor Dashboard ---
router.get('/alerts/active', validate(queryActiveAlertsSchema, 'query'), getActiveAlerts);
router.get('/stats/summary', getSummary);
router.get('/resources/shelters', getShelters);

// --- Response Map ---
router.get('/disasters/active', getActiveDisasters);
router.get('/resources/nearby', validate(queryNearbyResourcesSchema, 'query'), getNearby);

// --- Crowdsourced Reports ---
router.post('/reports', validate(createReportSchema, 'body'), createReport);

export default router;
