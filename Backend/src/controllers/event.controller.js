<<<<<<< HEAD
const Event = require('../models/Event.model');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (College Admin)
const createEvent = async (req, res) => {
    try {
        const { title, description, hostingCollege, category, location, startDate, endDate } = req.body;

        const event = new Event({
            title,
            description,
            hostingCollege,
            category,
            location,
            startDate,
            endDate,
            organizer: req.user._id
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (College Admin)
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            event.title = req.body.title || event.title;
            event.description = req.body.description || event.description;
            event.hostingCollege = req.body.hostingCollege || event.hostingCollege;
            event.category = req.body.category || event.category;
            event.location = req.body.location || event.location;
            event.startDate = req.body.startDate || event.startDate;
            event.endDate = req.body.endDate || event.endDate;

            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (College Admin)
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
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
=======
const Event = require("../models/Event.model");

/**
 * @desc    Create a new event
 * @route   POST /api/events
 * @access  Private (Admin only)
 */
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      date,
      category,
      capacity,
      requiresApproval,
      image,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      location,
      date,
      category,
      capacity: capacity || 100,
      requiresApproval: requiresApproval || false,
      image: image || "",
      status: "Open",
      collegeName: req.user.collegeName,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create event",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all events (Students + Admin)
 * @route   GET /api/events
 * @access  Public
 */
const getEvents = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          title: { $regex: req.query.keyword, $options: "i" },
        }
      : {};

    const filter = {
      ...keyword,
      status: { $ne: "Cancelled" },
    };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.collegeName) {
      filter.collegeName = req.query.collegeName;
    }

    const events = await Event.find(filter).sort({ date: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};

/**
 * @desc    Get single event by ID (FOR EDIT FORM)
 * @route   GET /api/events/:id
 * @access  Public (or Admin)
 */
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch event",
      error: error.message,
    });
  }
};

/**
 * @desc    Update event
 * @route   PUT /api/events/:id
 * @access  Private (Admin only)
 */
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = req.body.title ?? event.title;
    event.description = req.body.description ?? event.description;
    event.location = req.body.location ?? event.location;
    event.date = req.body.date ?? event.date;
    event.category = req.body.category ?? event.category;
    event.capacity = req.body.capacity ?? event.capacity;
    event.requiresApproval =
      req.body.requiresApproval ?? event.requiresApproval;
    event.image = req.body.image ?? event.image;
    event.status = req.body.status ?? event.status;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update event",
      error: error.message,
    });
  }
};

/**
 * @desc    Delete event (Soft Delete)
 * @route   DELETE /api/events/:id
 * @access  Private (Admin only)
 */
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.status = "Cancelled";
    await event.save();

    res.json({ message: "Event cancelled successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete event",
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,   // ✅ IMPORTANT
  updateEvent,
  deleteEvent,
>>>>>>> origin/dev-varshini
};
