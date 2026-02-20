const Feedback = require("../models/Feedback.model");
const Registration = require("../models/Registration.model");

/* =========================================================
   STUDENT: SUBMIT FEEDBACK
   Only if:
   - Registration approved
   - Attendance marked as attended
   - Feedback not already submitted
========================================================= */
exports.submitFeedback = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      eventId,
      department,
      college,
      eventType,
      helpfulness,
      expectation,
      rating,
      satisfaction,
      coordination,
    } = req.body;

    // Check registration eligibility
    const registration = await Registration.findOne({
      student: userId,
      event: eventId,
      status: "approved",
      attendanceStatus: "attended",
    });

    if (!registration) {
      return res.status(403).json({
        message: "You are not eligible to submit feedback for this event",
      });
    }

    // Prevent duplicate feedback
    if (registration.feedbackSubmitted) {
      return res.status(400).json({
        message: "Feedback already submitted",
      });
    }

    // Create feedback
    const feedback = await Feedback.create({
      userId,
      eventId,
      department,
      college,
      eventType,
      helpfulness,
      expectation,
      rating,
      satisfaction,
      coordination,
    });

    // Mark feedback as submitted
    registration.feedbackSubmitted = true;
    await registration.save();

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting feedback",
      error: error.message,
    });
  }
};

/* =========================================================
   ADMIN: GET FEEDBACK SUMMARY FOR EVENT
   Used for charts
========================================================= */
exports.getFeedbackSummary = async (req, res) => {
  try {
    const { eventId } = req.params;

    const feedbacks = await Feedback.find({ eventId });

    const totalResponses = feedbacks.length;

    // Default distributions
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const helpfulnessDistribution = {
      "Very helpful": 0,
      "Somewhat helpful": 0,
      "Not helpful": 0,
    };
    const coordinationDistribution = {
      Excellent: 0,
      Good: 0,
      Average: 0,
      Poor: 0,
    };

    let totalRating = 0;
    let totalSatisfaction = 0;

    feedbacks.forEach((f) => {
      // Rating distribution
      ratingDistribution[f.rating]++;

      // Helpfulness
      if (helpfulnessDistribution[f.helpfulness] !== undefined) {
        helpfulnessDistribution[f.helpfulness]++;
      }

      // Coordination
      if (coordinationDistribution[f.coordination] !== undefined) {
        coordinationDistribution[f.coordination]++;
      }

      totalRating += f.rating;
      totalSatisfaction += f.satisfaction;
    });

    const averageRating =
      totalResponses > 0 ? totalRating / totalResponses : 0;

    const averageSatisfaction =
      totalResponses > 0 ? totalSatisfaction / totalResponses : 0;

    res.json({
      totalResponses,
      averageRating: Number(averageRating.toFixed(2)),
      averageSatisfaction: Number(averageSatisfaction.toFixed(2)),
      ratingDistribution,
      helpfulnessDistribution,
      coordinationDistribution,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching feedback summary",
      error: error.message,
    });
  }
};