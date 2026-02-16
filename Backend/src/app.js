const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const { notFound, errorHandler } = require("./middlewares/error.middleware");

const app = express();

/* =========================================================
   SECURITY MIDDLEWARE
========================================================= */
app.use(helmet());
app.use(cors());

/* =========================================================
   RATE LIMITER
========================================================= */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
});
app.use(limiter);

/* =========================================================
   BODY PARSER
========================================================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================================================
   ROUTES (SAFE LOADING)
========================================================= */
try {
  const authRoutes = require("./routes/auth.routes");
  app.use("/api/auth", authRoutes);
} catch (e) {
  console.log("Auth routes not loaded:", e.message);
}

try {
  const eventRoutes = require("./routes/event.routes");
  app.use("/api/events", eventRoutes);
} catch (e) {
  console.log("Event routes not loaded:", e.message);
}

try {
  const registrationRoutes = require("./routes/registration.routes");
  app.use("/api/registrations", registrationRoutes);
} catch (e) {
  console.log("Registration routes not loaded:", e.message);
}

try {
  const feedbackRoutes = require("./routes/feedback.routes");
  app.use("/api/feedback", feedbackRoutes);
} catch (e) {
  console.log("Feedback routes not loaded:", e.message);
}

try {
  const notificationRoutes = require("./routes/notification.routes");
  app.use("/api/notifications", notificationRoutes);
} catch (e) {
  console.log("Notification routes not loaded:", e.message);
}

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
