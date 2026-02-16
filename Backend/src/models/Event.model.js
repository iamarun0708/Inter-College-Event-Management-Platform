const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    // Department conducting event
    department: String,

    // Short summary / eligibility
    summary: String,

    category: String,
    location: String,

    // Event timing
    startDate: { type: Date, required: true },
    endDate: Date,

    // Registration deadline
    registrationDeadline: Date,

    // Slot capacity
    capacity: {
      type: Number,
      default: 100,
    },

    // Track filled slots (important for milestone 3)
    registeredCount: {
      type: Number,
      default: 0,
    },

    image: String,

    status: {
      type: String,
      enum: ["Open", "Closed", "Draft"],
      default: "Open",
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Contact email of admin (for student view)
    contactEmail: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
