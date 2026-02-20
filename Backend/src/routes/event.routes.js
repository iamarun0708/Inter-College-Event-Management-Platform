const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

const { protect } = require("../middlewares/auth.middleware");

/*
|--------------------------------------------------------------------------
| Event Routes
|--------------------------------------------------------------------------
| GET    /api/events         → Public (Students & Admin)
| GET    /api/events/:id     → Public (View / Edit Prefill)
| POST   /api/events         → Private (Admin only)
| PUT    /api/events/:id     → Private (Admin only)
| DELETE /api/events/:id     → Private (Admin only – Soft delete)
|--------------------------------------------------------------------------
*/

// 🔹 Get all events (Student + Admin)
router.get("/", getEvents);

// 🔹 Get single event by ID (For Edit Prefill & Event Details)
router.get("/:id", getEventById);

// 🔹 Create new event (Admin only)
router.post("/", protect, createEvent);

// 🔹 Update event (Admin only)
router.put("/:id", protect, updateEvent);

// 🔹 Delete / Cancel event (Admin only)
router.delete("/:id", protect, deleteEvent);

module.exports = router;
