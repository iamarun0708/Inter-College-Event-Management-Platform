const mongoose = require('mongoose');

const adminLogSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true
    },
    details: {
        type: mongoose.Schema.Types.Mixed // Flexible field for any extra details
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AdminLog', adminLogSchema);
