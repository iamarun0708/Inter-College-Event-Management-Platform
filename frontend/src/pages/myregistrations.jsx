import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/myregistrations.css";

export default function MyRegistrations() {
  const [regs, setRegs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch registrations
  const fetchRegistrations = async () => {
    try {
      const res = await API.get("/registrations/my");
      setRegs(res.data);
    } catch (err) {
      console.error("Failed to load registrations", err);
      setError("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Cancel registration
  const cancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this registration?"
    );

    if (!confirmCancel) return;

    try {
      const res = await API.delete(`/registrations/${id}`);
      alert(res.data.message);

      // Remove from UI
      setRegs((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Cancellation failed");
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading registrations...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">My Registrations</h1>
      <p className="page-subtitle">
        Track all events you’ve registered for
      </p>

      {regs.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <div className="card-grid">
          {regs.map((r) => (
            <div key={r._id} className="event-card">
              <div>
                <h3>{r.event?.title}</h3>
                <p className="muted">
                  {new Date(r.event?.date).toLocaleDateString()}
                </p>
                <p className="muted">{r.event?.location}</p>
              </div>

              <span
                className={`status-pill ${r.status.toLowerCase()}`}
              >
                {r.status}
              </span>

              <button
                className="primary-btn"
                onClick={() => cancel(r._id)}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
