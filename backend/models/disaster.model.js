import mongoose from 'mongoose';

const DISASTER_TYPES = ['Flood', 'Fire', 'Earthquake', 'Cyclone', 'Landslide', 'Tsunami', 'Drought'];
const SEVERITY_LEVELS = ['critical', 'warning', 'watch'];
const STATUS_VALUES = ['active', 'contained', 'resolved'];

const disasterSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: DISASTER_TYPES,
        },
        severity: {
            type: String,
            required: true,
            enum: SEVERITY_LEVELS,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },
        description: {
            type: String,
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
        affectedRadius: {
            type: Number,
            default: 5000, // meters
            min: 0,
        },
        status: {
            type: String,
            required: true,
            enum: STATUS_VALUES,
            default: 'active',
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
);

// Indexes for common query patterns
disasterSchema.index({ location: '2dsphere' });
disasterSchema.index({ status: 1, severity: 1 });
disasterSchema.index({ createdAt: -1 });

const Disaster = mongoose.model('Disaster', disasterSchema);
export default Disaster;
