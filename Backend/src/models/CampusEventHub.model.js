const mongoose = require('mongoose');

const CampusEventHubSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        default: 'Campus Event Hub'
    },
    description: {
        type: String,
        default: 'A platform for managing and discovering campus events.'
    },
    version: {
        type: String,
        default: '1.0.0'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'active'
    },
    lastDeployment: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: 'CampusEventHub' // Explicitly naming the collection as requested
});

const CampusEventHub = mongoose.model('CampusEventHub', CampusEventHubSchema);

module.exports = CampusEventHub;
