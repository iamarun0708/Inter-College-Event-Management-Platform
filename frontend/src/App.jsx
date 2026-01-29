import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import BrowseEvents from "./pages/browseEvents";
import MyRegistrations from "./pages/myregistrations";
import Certificates from "./pages/Certificates";
import EventDetails from "./pages/EventDetails";
import DashboardLayout from "./Layouts/dashboardLayout";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import "./styles/logo.css";
import ManageEvents from "./pages/ManageEvents";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* FIXED: Changed from /signup to /register */}

        {/* Student Protected Routes (Wrapped in Layout) */}
        <Route element={<DashboardLayout />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} /> {/* FIXED: Changed from /student */}
          <Route path="/browseEvents" element={<BrowseEvents />} />
          <Route path="/registrations" element={<MyRegistrations />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-event" element={<CreateEvent />} />
        <Route path="/admin/manage-events" element={<ManageEvents />} />
        <Route path="/admin/edit-event/:id" element={<CreateEvent />} />

        {/* COMING SOON: We will need to add Create Event routes here later */}
        {/* <Route path="/admin/create-event" element={<CreateEvent />} /> */}

      </Routes>
    </BrowserRouter>
  );
}
