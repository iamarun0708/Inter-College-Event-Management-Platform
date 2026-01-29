import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/dashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [totalEvents, setTotalEvents] = useState(0);

  useEffect(() => {
    API.get("/events")
      .then(res => setTotalEvents(res.data.length))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">Total Events<br /><strong>{totalEvents}</strong></div>
        <div className="stat-card">Registrations<br /><strong>1234</strong></div>
        <div className="stat-card">Active Colleges<br /><strong>15</strong></div>
        <div className="stat-card">Pending Approvals<br /><strong>8</strong></div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <button className="primary-btn" onClick={() => navigate("/admin/create-event")}>
          + Create Event
        </button>
        <button
          className="primary-btn"
          style={{ marginLeft: "15px" }}
          onClick={() => navigate("/admin/manage-events")}
        >
          Manage Events
        </button>
      </div>
    </div>
  );
}
