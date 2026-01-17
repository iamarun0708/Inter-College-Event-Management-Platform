const Feedback = require('../models/Feedback.model');

// @desc    Add feedback
// @route   POST /api/feedback
// @access  Private (Student)
const addFeedback = async (req, res) => {
    try {
        const { eventId, rating, comments } = req.body;

        // Check if user already submitted feedback
        const feedbackExists = await Feedback.findOne({
            event: eventId,
            user: req.user._id
        });

        if (feedbackExists) {
            return res.status(400).json({ message: 'Feedback already submitted for this event' });
        }

        const feedback = await Feedback.create({
            event: eventId,
            user: req.user._id,
            rating,
            comments
        });

        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get feedback for event
// @route   GET /api/feedback/:eventId
// @access  Public
const getEventFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ event: req.params.eventId })
            .populate('user', 'fullName');
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addFeedback,
    getEventFeedback
};
