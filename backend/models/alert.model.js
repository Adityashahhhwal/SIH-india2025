import mongoose from 'mongoose';

const ALERT_TYPES = ['critical', 'warning', 'info', 'success'];

const alertSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ALERT_TYPES,
        },
        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
        source: {
            type: String,
            trim: true,
            default: 'System',
        },
        disasterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Disaster',
            default: null,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Sort by newest first for the AlertFeed query
alertSchema.index({ type: 1, createdAt: -1 });

// TTL index: MongoDB automatically deletes expired documents
alertSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;
