const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

const { protect } = require("../middlewares/auth.middleware");

/*
|--------------------------------------------------------------------------
| Event Routes
|--------------------------------------------------------------------------
| GET    /api/events        → Public (Students & Admin)
| POST   /api/events        → Private (Admin only)
| PUT    /api/events/:id    → Private (Admin only)
| DELETE /api/events/:id    → Private (Admin only - Soft delete recommended)
|--------------------------------------------------------------------------
*/

// Get all events (Visible to Students & Admin)
router.get("/", getEvents);

// Create new event (Admin)
router.post("/", protect, createEvent);

// Update event (Admin)
router.put("/:id", protect, updateEvent);

// Delete / Cancel event (Admin)
router.delete("/:id", protect, deleteEvent);

module.exports = router;
