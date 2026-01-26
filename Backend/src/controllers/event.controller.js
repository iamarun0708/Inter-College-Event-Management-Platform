const Event = require('../models/Event.model');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Admin only)
const createEvent = async (req, res) => {
  try {
    // 
    const { title, description, location, date, time, category, capacity, requiresApproval, image } = req.body;

    const event = new Event({
      title,
      description,
      location,
      date,
      time,
      category,
      capacity: capacity || 100, // Default to 100 if empty
      requiresApproval: requiresApproval || false,
      image: image || '', 
      collegeName: req.user.collegeName || 'General',
      createdBy: req.user._id
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// @desc    Get all events (With Search & Filters!)
// @route   GET /api/events?keyword=AI&category=Tech
// @access  Public
const getEvents = async (req, res) => {
  try {
    // 1. Build the search query
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword, // Matches part of the name (e.g., "Tech")
            $options: 'i', // Case insensitive (tech = Tech)
          },
        }
      : {};

    // 2. Build filters (Category, College)
    const filter = { ...keyword }; // Start with the keyword search
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.collegeName) {
      filter.collegeName = req.query.collegeName;
    }

    // 3. Find events matching the filters
    const events = await Event.find(filter).sort({ date: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      
      event.title = req.body.title || event.title;
      event.description = req.body.description || event.description;
      event.location = req.body.location || event.location;
      event.date = req.body.date || event.date;
      event.time = req.body.time || event.time;
      event.category = req.body.category || event.category;
      event.capacity = req.body.capacity || event.capacity;
      event.requiresApproval = req.body.requiresApproval ?? event.requiresApproval;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      await event.deleteOne();
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };