const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const notificationController = require("../controllers/notification.controller");

// Routes
router.get("/", authMiddleware.protect, notificationController.getMyNotifications);
router.put("/:id", authMiddleware.protect, notificationController.markAsRead);

module.exports = router;
