const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  collegeName: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  
  //
  category: { 
    type: String, 
    required: true,
    enum: ['Workshop', 'Seminar', 'Cultural', 'Sports', 'Tech', 'Other'] 
  },
  image: { 
    type: String, 
    default: 'https://via.placeholder.com/150' // Default placeholder image
  },
  capacity: { 
    type: Number, 
    required: true, 
    default: 100 // Default limit if not specified
  },
  requiresApproval: {
    type: Boolean,
    default: false // false = Auto-approve, true = Admin must approve
  },
  visibility: {
    type: String,
    enum: ['Public', 'College-Only'],
    default: 'Public'
  },
  
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;