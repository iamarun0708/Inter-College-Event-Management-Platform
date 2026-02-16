const express = require('express');
const router = express.Router();
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../controllers/event.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.route('/')
    .get(getEvents)
    .post(protect, authorize('college_admin', 'super_admin'), createEvent);

router.route('/:id')
    .get(getEventById)
    .put(protect, authorize('college_admin', 'super_admin'), updateEvent)
    .delete(protect, authorize('college_admin', 'super_admin'), deleteEvent);
const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

const { protect, isAdmin } = require("../middlewares/auth.middleware");

// Get all events
router.get("/", getEvents);

// Get single event by ID
router.get("/:id", getEventById);




// Create event
router.post("/", protect, isAdmin, createEvent);

// Update event
router.put("/:id", protect, isAdmin, updateEvent);

// Delete event
router.delete("/:id", protect, isAdmin, deleteEvent);

// 🔹 Delete / Cancel event (Admin only)
router.delete("/:id", protect, deleteEvent);


module.exports = router;
