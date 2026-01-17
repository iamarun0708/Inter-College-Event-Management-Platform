const Registration = require('../models/Registration.model');
const Event = require('../models/Event.model');

// @desc    Register for an event
// @route   POST /api/registrations
// @access  Private (Student)
const registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const alreadyRegistered = await Registration.findOne({
            event: eventId,
            user: req.user._id
        });

        if (alreadyRegistered) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        const registration = await Registration.create({
            event: eventId,
            user: req.user._id
        });

        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my registrations
// @route   GET /api/registrations/my
// @access  Private (Student)
const getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user._id })
            .populate('event', 'title startDate location');
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get event registrations
// @route   GET /api/registrations/event/:eventId
// @access  Private (College Admin)
const getEventRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ event: req.params.eventId })
            .populate('user', 'fullName email collegeName');
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update registration status
// @route   PUT /api/registrations/:id
// @access  Private (College Admin)
const updateRegistrationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const registration = await Registration.findById(req.params.id);

        if (registration) {
            registration.status = status;
            const updatedRegistration = await registration.save();
            res.json(updatedRegistration);
        } else {
            res.status(404).json({ message: 'Registration not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerForEvent,
    getMyRegistrations,
    getEventRegistrations,
    updateRegistrationStatus
};
