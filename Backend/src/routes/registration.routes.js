const express = require("express");
const router = express.Router();

const registrationController = require("../controllers/registration.controller");
const { protect } = require("../middlewares/auth.middleware");

// Auto register
router.post("/auto/:eventId", protect, registrationController.autoRegister);

// Manual register
router.post("/manual/:eventId", protect, registrationController.manualRegister);

// Get my registrations
router.get("/my", protect, registrationController.getMyRegistrations);

// Cancel registration
router.delete("/:id", protect, registrationController.cancelRegistration);

// Approve / reject / waitlist
router.put(
  "/status/:id",
  protect,
  registrationController.updateRegistrationStatus
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
const express = require('express');
const router = express.Router();
const {
    registerForEvent,
    getMyRegistrations,
    getEventRegistrations,
    updateRegistrationStatus
} = require('../controllers/registration.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.post('/', protect, authorize('student'), registerForEvent);
router.get('/my', protect, authorize('student'), getMyRegistrations);
router.get('/event/:eventId', protect, authorize('college_admin', 'super_admin'), getEventRegistrations);
router.put('/:id', protect, authorize('college_admin', 'super_admin'), updateRegistrationStatus);

module.exports = router;
//dummy files just to prevent server crashing
const router = require('express').Router();
module.exports = router;

