const express = require("express");
const router = express.Router();

const registrationController = require("../controllers/registration.controller");
const { protect } = require("../middlewares/auth.middleware");

/* =========================================================
   STUDENT ROUTES
========================================================= */

// Auto register
router.post("/auto/:eventId", protect, registrationController.autoRegister);

// Manual register
router.post("/manual/:eventId", protect, registrationController.manualRegister);

// Get my registrations
router.get("/my", protect, registrationController.getMyRegistrations);

// Cancel registration
router.delete("/:id", protect, registrationController.cancelRegistration);


/* =========================================================
   ADMIN ROUTES
   (Temporarily without isAdmin to prevent crash)
========================================================= */

// Approve / reject / waitlist
router.put(
  "/status/:id",
  protect,
  registrationController.updateRegistrationStatus
);

// NEW: Update attendance (for feedback eligibility)
router.patch(
  "/attendance/:id",
  protect,
  registrationController.updateAttendance
);

// Get participants for an event
router.get(
  "/event/:eventId",
  protect,
  registrationController.getEventParticipants
);

// Get event stats
router.get(
  "/stats/:eventId",
  protect,
  registrationController.getEventStats
);

// Get all registrations (dashboard participants)
router.get(
  "/admin/all",
  protect,
  registrationController.getAllRegistrationsAdmin
);

module.exports = router;