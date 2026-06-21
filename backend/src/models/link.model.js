import mongoose from 'mongoose';

// Link schema: represents a single user-managed link.
// Fields:
// - user: ObjectId reference to the owner `User` document
// - title: display title for the link
// - url: destination URL
// - clicks: simple click counter (integer)
// Timestamps are enabled to track creation and update times.
const linkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    // Simple aggregated click counter. For per-click timestamps, add a Click log collection.
    clicks: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);

export default Link;