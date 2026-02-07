import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/dashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // ✅ Read-only admin name (no setter needed)
  const [admin] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return { name: storedUser?.name || "Admin" };
  });

  const [totalEvents, setTotalEvents] = useState(0);

  // ✅ Side-effect only (API call)
  useEffect(() => {
    API.get("/events")
      .then((res) => setTotalEvents(res.data.length))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="page-container">
      {/* 👋 ADMIN GREETING */}
      <div className="greeting">
        <h1>Hi, {admin.name}! 👋</h1>
        <p>Here’s an overview of your campus events.</p>
      </div>

      <h2 className="page-title">Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Events</p>
          <h3>{totalEvents}</h3>
        </div>

        <div className="stat-card">
          <p>Registrations</p>
          <h3>1234</h3>
        </div>

        <div className="stat-card">
          <p>Active Colleges</p>
          <h3>15</h3>
        </div>

        <div className="stat-card">
          <p>Pending Approvals</p>
          <h3>8</h3>
        </div>
      </div>

      <div className="admin-actions">
        <button
          className="primary-btn"
          onClick={() => navigate("/admin/create-event")}
        >
          + Create Event
        </button>

        <button
          className="primary-btn"
          onClick={() => navigate("/admin/manage-events")}
        >
          Manage Events
        </button>
      </div>
    </div>
  );
}
