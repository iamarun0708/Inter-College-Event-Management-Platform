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
};
