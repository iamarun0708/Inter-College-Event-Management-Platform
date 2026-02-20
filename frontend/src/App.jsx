import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ===== PUBLIC PAGES ===== */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

/* ===== STUDENT PAGES ===== */
import StudentDashboard from "./pages/StudentDashboard";
import BrowseEvents from "./pages/BrowseEvents";
import MyRegistrations from "./pages/myregistrations";
import Certificates from "./pages/Certificates";
import EventDetails from "./pages/EventDetails";
import Notifications from "./pages/Notifications";
import Feedback from "./pages/Feedback"; // NEW

/* ===== ADMIN PAGES ===== */
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import ManageEvents from "./pages/ManageEvents";
import AdminParticipants from "./pages/AdminParticipants";
import AdminFeedback from "./pages/AdminFeedback"; // NEW

/* ===== LAYOUTS ===== */
import StudentLayout from "./Layouts/StudentLayout";
import AdminLayout from "./Layouts/AdminLayout";

/* ===== STYLES ===== */
import "./styles/logo.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= STUDENT ROUTES ================= */}
        <Route element={<StudentLayout />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/browseEvents" element={<BrowseEvents />} />
          <Route path="/registrations" element={<MyRegistrations />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/notifications" element={<Notifications />} />

          {/* Event Details */}
          <Route path="/events/:id" element={<EventDetails />} />

          {/* NEW: Student Feedback */}
          <Route path="/student/feedback" element={<Feedback />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create-event" element={<CreateEvent />} />
          <Route path="/admin/manage-events" element={<ManageEvents />} />

          {/* Edit Event */}
          <Route path="/admin/edit-event/:id" element={<CreateEvent />} />

          {/* Participant Management */}
          <Route
            path="/admin/participants/:eventId"
            element={<AdminParticipants />}
          />

          {/* NEW: Admin Feedback Analysis */}
          <Route path="/admin/feedback" element={<AdminFeedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}