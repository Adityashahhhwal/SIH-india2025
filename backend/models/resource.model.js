import mongoose from 'mongoose';

const RESOURCE_TYPES = ['shelter', 'hospital', 'food_bank', 'police'];
const STATUS_VALUES = ['open', 'full', 'closed'];

const resourceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },
        type: {
            type: String,
            required: true,
            enum: RESOURCE_TYPES,
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
        status: {
            type: String,
            required: true,
            enum: STATUS_VALUES,
            default: 'open',
        },
        capacity: {
            total: { type: Number, required: true, min: 0 },
            current: { type: Number, required: true, min: 0 },
            unit: { type: String, default: 'people' },
        },
        contact: {
            phone: { type: String, trim: true },
            person: { type: String, trim: true },
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// GeoJSON index for $nearSphere queries
resourceSchema.index({ location: '2dsphere' });
resourceSchema.index({ type: 1, status: 1 });

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;
