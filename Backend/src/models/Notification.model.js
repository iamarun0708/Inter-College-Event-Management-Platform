const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['info', 'alert', 'success', 'error'], 
    default: 'info' 
  },
  read: { type: Boolean, default: false }, 
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;