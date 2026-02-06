const express = require("express");
const router = express.Router();
const { 
  getEventParticipants, 
  updateRegistrationStatus, 
  removeParticipant,
  bulkUpdateStatus,
  exportParticipants
} = require("../controllers/registration.controller");
const { getEventStats } = require("../controllers/event.controller");
const { protect } = require("../middlewares/auth.middleware");

// 1. Participant List & Data Export (Milestone 3)
router.get("/event/:eventId", protect, getEventParticipants);
router.get("/export/:eventId", protect, exportParticipants);

// 2. Admin Actions (Individual & Bulk)
router.put("/status/:id", protect, updateRegistrationStatus);
router.put("/bulk-status", protect, bulkUpdateStatus);

// 3. Slot Control & Overview
router.delete("/:id", protect, removeParticipant);
router.get("/stats/:eventId", protect, getEventStats);

module.exports = router;