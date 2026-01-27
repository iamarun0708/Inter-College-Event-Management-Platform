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
import "./styles/logo.css";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route element={<DashboardLayout />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/browseEvents" element={<BrowseEvents />} />
          <Route path="/registrations" element={<MyRegistrations />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route
            path="/events/:id"
            element={<EventDetails />}
          />

        </Route>
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
