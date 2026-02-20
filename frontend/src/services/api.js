import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend base URL
});

// Automatically add the token to headers if it exists
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

/* =========================================================
   REGISTRATION APIs
========================================================= */

// Get participants for an event
export const getEventParticipants = (eventId) =>
  API.get(`/registrations/event/${eventId}`);

// Update registration status (approve/reject/waitlist)
export const updateRegistrationStatus = (id, status) =>
  API.put(`/registrations/status/${id}`, { status });

// NEW: Update attendance
export const updateAttendance = (id, attendanceStatus) =>
  API.patch(`/registrations/attendance/${id}`, {
    attendanceStatus,
  });

/* =========================================================
   FEEDBACK APIs
========================================================= */

// Submit feedback
export const submitFeedback = (data) =>
  API.post("/feedback/submit", data);

// Get feedback summary (admin analytics)
export const getFeedbackSummary = (eventId) =>
  API.get(`/feedback/summary/${eventId}`);

export default API;