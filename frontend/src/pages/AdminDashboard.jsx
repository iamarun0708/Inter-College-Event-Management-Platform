import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/dashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [admin] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return { name: storedUser?.name || "Admin" };
  });

  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    pending: 0,
  });

  const [participants, setParticipants] = useState([]);

  /* ================= LOAD DASHBOARD ================= */
  const loadDashboard = async () => {
    try {
      const eventsRes = await API.get("/events");
      const regsRes = await API.get("/registrations/admin/all");

      const events = eventsRes.data;
      const regs = regsRes.data;

      const pending = regs.filter((r) => r.status === "pending");

      setStats({
        totalEvents: events.length,
        totalRegistrations: regs.length,
        pending: pending.length,
      });

      setParticipants(regs);
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  useEffect(() => {
  const loadDashboard = async () => {
    try {
      const eventsRes = await API.get("/events");
      const regsRes = await API.get("/registrations/admin/all");

      const events = eventsRes.data || [];
      const regs = regsRes.data || [];

      const pending = regs.filter((r) => r.status === "pending");

      setStats({
        totalEvents: events.length,
        totalRegistrations: regs.length,
        pending: pending.length,
      });

      setParticipants(regs);
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  loadDashboard();
}, []);


  /* ================= STATUS UPDATE ================= */
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/registrations/status/${id}`, { status });
      alert(`Registration ${status}`);
      loadDashboard();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Action failed");
    }
  };

  return (
    <div className="page-container">
      <div className="greeting">
        <h1>Hi, {admin.name}! 👋</h1>
        <p>Here’s an overview of your campus events.</p>
      </div>

      <h2 className="page-title">Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Events</p>
          <h3>{stats.totalEvents}</h3>
        </div>

        <div className="stat-card">
          <p>Total Registrations</p>
          <h3>{stats.totalRegistrations}</h3>
        </div>

        <div className="stat-card">
          <p>Pending Approvals</p>
          <h3>{stats.pending}</h3>
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

      {/* Participants Table */}
      <div className="card-section" style={{ marginTop: 30 }}>
        <h3>Participants</h3>

        {participants.length === 0 ? (
          <p>No participants yet.</p>
        ) : (
          <table className="participants-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Event</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {participants.map((p) => (
                <tr key={p._id}>
                  <td>{p.student?.fullName}</td>
                  <td>{p.student?.email}</td>
                  <td>{p.event?.title}</td>
                  <td>{p.status}</td>
                  <td className="action-buttons">
                    <button
                      className="approve-btn"
                      onClick={() =>
                        updateStatus(p._id, "approved")
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        updateStatus(p._id, "rejected")
                      }
                    >
                      Reject
                    </button>

                    <button
                      className="waitlist-btn"
                      onClick={() =>
                        updateStatus(p._id, "waitlist")
                      }
                    >
                      Waitlist
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
