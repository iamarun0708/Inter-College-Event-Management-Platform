const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    // Reference to student
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reference to event
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    // Basic details
    department: {
      type: String,
      required: true,
    },

    college: {
      type: String,
      required: true,
    },

    // Event type
    eventType: {
      type: String,
      enum: [
        "Workshop",
        "Hackathon",
        "Seminar",
        "Technical Talk",
        "Cultural Event",
        "Competition",
      ],
      required: true,
    },

    // Helpfulness
    helpfulness: {
      type: String,
      enum: [
        "Very helpful",
        "Somewhat helpful",
        "Not helpful",
      ],
      required: true,
    },

    // Expectations
    expectation: {
      type: String,
      enum: [
        "Exceeded expectations",
        "Met expectations",
        "Below expectations",
      ],
      required: true,
    },

    // Star rating
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    // Satisfaction percentage
    satisfaction: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    // Coordinator performance
    coordination: {
      type: String,
      enum: [
        "Excellent",
        "Good",
        "Average",
        "Poor",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);