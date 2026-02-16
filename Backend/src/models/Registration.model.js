const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    /* =========================
       RELATIONS
    ========================= */
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

    /* =========================
       STUDENT DETAILS
    ========================= */
    department: {
      type: String,
      required: true,
    },

    // Manual registration fields (Milestone 3)
    name: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    university: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    reason: {
      type: String,
      default: "",
    },

    communicationMode: {
      type: String,
      enum: ["email", "whatsapp"],
      default: "email",
    },

    /* =========================
       STATUS
    ========================= */
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "waitlist"],
      default: "pending",
    },

    registrationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Registration", registrationSchema);
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Registration', registrationSchema);
