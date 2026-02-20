const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Student details for manual registration
  department: {
    type: String,
    required: true,
  },

  university: {
    type: String,
  },

  reason: {
    type: String,
  },

  // Registration status
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "waitlist"],
    default: "pending",
  },

  // NEW: Attendance status set by admin
  attendanceStatus: {
    type: String,
    enum: ["pending", "attended", "absent"],
    default: "pending",
  },

  // NEW: Track feedback submission
  feedbackSubmitted: {
    type: Boolean,
    default: false,
  },

  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Registration", registrationSchema);