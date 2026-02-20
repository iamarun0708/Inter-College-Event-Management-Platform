const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    // Core Event Details
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    collegeName: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    // Category
    category: {
      type: String,
      required: true,
      enum: ["Workshop", "Seminar", "Cultural", "Sports", "Tech", "Other"],
    },

    // Media
    image: {
      type: String,
      default: "https://via.placeholder.com/150",
    },

    // Capacity & Registration
    capacity: {
      type: Number,
      default: 100,
    },

    requiresApproval: {
      type: Boolean,
      default: false, // false = auto approve
    },

    // NEW: Registration window
    registrationStart: {
      type: Date,
      required: true,
    },

    registrationEnd: {
      type: Date,
      required: true,
    },

    // NEW: Organizer details
    organizingDepartment: {
      type: String,
    },

    contactInfo: {
      type: String,
    },

    // Visibility Control
    visibility: {
      type: String,
      enum: ["Public", "College-Only"],
      default: "Public",
    },

    // Event Status
    status: {
      type: String,
      enum: ["Open", "Closed", "Cancelled"],
      default: "Open",
    },

    // Admin who created event
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
