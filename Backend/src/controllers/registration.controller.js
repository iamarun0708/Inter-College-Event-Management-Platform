const Registration = require("../models/Registration.model");
const Event = require("../models/Event.model");

// GET Participants for a specific Event (Participant List)
// Includes: Student name, Student ID, Department, Registration status
const getEventParticipants = async (req, res) => {
  try {
    const { eventId } = req.params;
    const participants = await Registration.find({ event: eventId })
      .populate("student", "fullName email"); 

    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching participants" });
  }
};

// Admin Actions: Approve / reject registration
const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body; 

    const registration = await Registration.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

    if (!registration) return res.status(404).json({ message: "Registration not found" });

    res.json({ message: `Registration ${status}`, registration });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// Slot Control: Remove participants if required
const removeParticipant = async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Participant removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// Bulk update registration status
exports.bulkUpdateStatus = async (req, res) => {
  try {
    const { registrationIds, status } = req.body; // registrationIds: ["id1", "id2"]

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await Registration.updateMany(
      { _id: { $in: registrationIds } },
      { $set: { status: status } }
    );

    res.json({ 
      message: `Successfully updated ${updated.modifiedCount} registrations to ${status}` 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.exportParticipants = async (req, res) => {
  try {
    const participants = await Registration.find({ event: req.params.eventId })
      .populate("student", "fullName email")
      .select("student department status registrationDate");

    // This data structure supports the "Participant List" requirements:
    // Student Name, Student ID (from student._id), Department, Status
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getEventParticipants, 
  updateRegistrationStatus, 
  removeParticipant, 
  bulkUpdateStatus: exports.bulkUpdateStatus, 
  exportParticipants: exports.exportParticipants
};