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

/* =========================================================
   PUBLIC ROUTES
========================================================= */

// Get all events
router.get("/", getEvents);

// Get single event by ID
router.get("/:id", getEventById);


/* =========================================================
   ADMIN ROUTES
========================================================= */

// Create event
router.post("/", protect, isAdmin, createEvent);

// Update event
router.put("/:id", protect, isAdmin, updateEvent);

// Delete event
router.delete("/:id", protect, isAdmin, deleteEvent);


module.exports = router;
