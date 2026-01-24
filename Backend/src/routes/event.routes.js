const express = require('express');
const router = express.Router();
const { 
  createEvent, 
  getEvents, 
  updateEvent, 
  deleteEvent 
} = require('../controllers/event.controller');
const { protect } = require('../middlewares/auth.middleware');

// Public: Get all events | Private: Create event
router.route('/')
  .get(getEvents)
  .post(protect, createEvent);

// Private: Update or Delete event by ID
router.route('/:id')
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

module.exports = router;