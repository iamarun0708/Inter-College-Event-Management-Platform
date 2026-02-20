const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Error middleware
const {
  notFound,
  errorHandler,
} = require("./middlewares/error.middleware");

// Routes
const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes");
const registrationRoutes = require("./routes/registration.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const notificationRoutes = require("./routes/notification.routes");

const app = express();

/* =========================================================
   SECURITY MIDDLEWARE
========================================================= */
app.use(helmet());
app.use(cors());

/* =========================================================
   RATE LIMITING
========================================================= */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
});
app.use(limiter);

/* =========================================================
   BODY PARSING
========================================================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================================================
   API ROUTES
========================================================= */
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/notifications", notificationRoutes);

/* =========================================================
   ROOT ROUTE
========================================================= */
app.get("/", (req, res) => {
  res.send("CampusEventHub API is running...");
});

/* =========================================================
   ERROR HANDLING
========================================================= */
app.use(notFound);
app.use(errorHandler);

module.exports = app;
