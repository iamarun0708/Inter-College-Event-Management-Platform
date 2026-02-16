import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ===== PUBLIC PAGES ===== */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

/* ===== STUDENT PAGES ===== */
import StudentDashboard from "./pages/StudentDashboard";
import BrowseEvents from "./pages/BrowseEvents";
import MyRegistrations from "./pages/MyRegistrations";
import Certificates from "./pages/Certificates";
import EventDetails from "./pages/EventDetails";

/* ===== ADMIN PAGES ===== */
import AdminDashboard from "./pages/AdminDashboard";
<<<<<<< HEAD
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
=======
import CreateEvent from "./pages/CreateEvent";
import ManageEvents from "./pages/ManageEvents";
import Participants from "./pages/Participants";

/* ===== LAYOUTS ===== */
import StudentLayout from "./Layouts/StudentLayout";
import AdminLayout from "./Layouts/AdminLayout";

/* ===== STYLES ===== */
import "./styles/logo.css";
>>>>>>> origin/dev-varshini

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
=======
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

          {/* ✅ EVENT DETAILS (IMPORTANT) */}
          <Route path="/events/:id" element={<EventDetails />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create-event" element={<CreateEvent />} />
          <Route path="/admin/manage-events" element={<ManageEvents />} />
          <Route path="/admin/participants/:id" element={<Participants />} />

          {/* Reuse CreateEvent for edit */}
          <Route path="/admin/edit-event/:id" element={<CreateEvent />} />
        </Route>
>>>>>>> origin/dev-varshini
      </Routes>
    </BrowserRouter>
  );
}
