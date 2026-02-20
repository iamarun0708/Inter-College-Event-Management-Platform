const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedback.controller");
const { protect } = require("../middlewares/auth.middleware");

/* =========================================================
   STUDENT ROUTES
========================================================= */

// Submit feedback (only eligible students)
router.post(
  "/submit",
  protect,
  feedbackController.submitFeedback
);


/* =========================================================
   ADMIN ROUTES
========================================================= */

// Get feedback summary for an event
router.get(
  "/summary/:eventId",
  protect,
  feedbackController.getFeedbackSummary
);

module.exports = router;