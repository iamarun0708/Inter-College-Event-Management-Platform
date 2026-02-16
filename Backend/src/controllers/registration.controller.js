const Registration = require("../models/Registration.model");
const Event = require("../models/Event.model");
const Notification = require("../models/Notification.model");

/* =========================================================
   AUTO REGISTRATION
exports.autoRegister = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event)
      return res.status(404).json({ message: "Event not found" });

    const now = new Date();

    // Deadline check
    if (now < event.registrationStart || now > event.registrationEnd) {
      return res.status(400).json({
        message: "Registration deadline passed or not started",
      });
    }

    // Already registered
    const existing = await Registration.findOne({
      event: event._id,
      student: req.user._id,
    });
    if (existing) {
      return res.status(400).json({ message: "Already registered" });
    }

    // Capacity check
    const approvedCount = await Registration.countDocuments({
      event: event._id,
      status: "approved",
    });

    if (approvedCount >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    const status = event.requiresApproval ? "pending" : "approved";

    const registration = await Registration.create({
      event: event._id,
      student: req.user._id,
      department: "N/A",
      university: event.collegeName,
      status,
    });

    await Notification.create({
      recipient: req.user._id,
      message: `You have registered for ${event.title}. Status: ${status}`,
      type: "info",
    });

    res.json({
      message: "Registration successful",
      registration,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   MANUAL REGISTRATION
exports.manualRegister = async (req, res) => {
  try {
    const { department, university, reason } = req.body;

    const event = await Event.findById(req.params.eventId);
    if (!event)
      return res.status(404).json({ message: "Event not found" });

    const now = new Date();

    if (now < event.registrationStart || now > event.registrationEnd) {
      return res.status(400).json({
        message: "Registration deadline passed or not started",
      });
    }

    const existing = await Registration.findOne({
      event: event._id,
      student: req.user._id,
    });

    if (existing) {
      return res.status(400).json({ message: "Already registered" });
    }

    const registration = await Registration.create({
      event: event._id,
      student: req.user._id,
      department,
      university,
      reason,
      status: "pending",
    });

    await Notification.create({
      recipient: req.user._id,
      message: `Manual registration submitted for ${event.title}. Awaiting approval.`,
      type: "info",
    });

    res.json({ message: "Manual registration submitted", registration });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   GET MY REGISTRATIONS
exports.getMyRegistrations = async (req, res) => {
  try {
    const regs = await Registration.find({ student: req.user._id })
      .populate("event", "title date location status registrationEnd");

    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   CANCEL REGISTRATION
exports.cancelRegistration = async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id).populate("event");

    if (!reg) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // Ensure student owns this registration
    if (reg.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to cancel this registration",
      });
    }

    const now = new Date();

    // Deadline check
    if (reg.event.registrationEnd) {
      const deadline = new Date(reg.event.registrationEnd);
      if (now > deadline) {
        return res.status(400).json({
          message: "Cancellation deadline has passed",
        });
      }
    }

    await Registration.findByIdAndDelete(req.params.id);

    await Notification.create({
      recipient: reg.student,
      message: `Your registration for ${reg.event.title} has been cancelled.`,
      type: "alert",
    });

    res.json({ message: "Registration cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   ADMIN: APPROVE / REJECT / WAITLIST
exports.updateRegistrationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected", "waitlist"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const reg = await Registration.findById(req.params.id)
      .populate("student")
      .populate("event");

    if (!reg) return res.status(404).json({ message: "Not found" });

    reg.status = status;
    await reg.save();

    await Notification.create({
      recipient: reg.student._id,
      message: `Your registration for ${reg.event.title} is ${status}`,
      type:
        status === "approved"
          ? "success"
          : status === "rejected"
          ? "error"
          : "info",
    });

    res.json({ message: `Registration ${status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================================================
   ADMIN: GET PARTICIPANTS FOR EVENT
exports.getEventParticipants = async (req, res) => {
  try {
    const { eventId } = req.params;

    const participants = await Registration.find({ event: eventId })
      .populate("student", "fullName email _id")
      .populate("event", "title")
      .select("student department university status createdAt");

    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching participants" });
  }
};

/* =========================================================
   ADMIN: EVENT STATS
exports.getEventStats = async (req, res) => {
  try {
    const { eventId } = req.params;

    const total = await Registration.countDocuments({ event: eventId });
    const approved = await Registration.countDocuments({
      event: eventId,
      status: "approved",
    });
    const rejected = await Registration.countDocuments({
      event: eventId,
      status: "rejected",
    });
    const waitlist = await Registration.countDocuments({
      event: eventId,
      status: "waitlist",
    });

    res.json({ total, approved, rejected, waitlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   ADMIN: GET ALL REGISTRATIONS (DASHBOARD)
exports.getAllRegistrationsAdmin = async (req, res) => {
  try {
    const regs = await Registration.find()
      .populate("student", "fullName email")
      .populate("event", "title");

    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
