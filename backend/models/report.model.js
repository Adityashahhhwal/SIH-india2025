import mongoose from 'mongoose';

const REPORT_TYPES = ['damage', 'SOS', 'resource_request'];
const STATUS_VALUES = ['pending', 'verified', 'dismissed'];

const reportSchema = new mongoose.Schema(
    {
        reporterName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        type: {
            type: String,
            required: true,
            enum: REPORT_TYPES,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000,
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true,
                validate: {
                    validator(coords) {
                        return (
                            coords.length === 2 &&
                            coords[0] >= -180 && coords[0] <= 180 &&
                            coords[1] >= -90 && coords[1] <= 90
                        );
                    },
                    message: 'Coordinates must be [longitude, latitude] within valid ranges.',
                },
            },
        },
        imageUrl: {
            type: String,
            trim: true,
            default: null,
        },
        status: {
            type: String,
            required: true,
            enum: STATUS_VALUES,
            default: 'pending',
        },
        upvotes: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

reportSchema.index({ location: '2dsphere' });
reportSchema.index({ status: 1, createdAt: -1 });

const Report = mongoose.model('Report', reportSchema);
export default Report;
