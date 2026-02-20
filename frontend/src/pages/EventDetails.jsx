import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/eventDetails.css";

// fallback image
import defaultImg from "../assets/event1.jpg";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showManual, setShowManual] = useState(false);
  const [form, setForm] = useState({
    department: "",
    university: "",
    reason: "",
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const { data } = await API.get(`/events/${id}`);
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Event not found or server error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEventDetails();
  }, [id]);

  /* ================= REGISTRATION FUNCTIONS ================= */

  const autoRegister = async () => {
    try {
      const res = await API.post(`/registrations/auto/${id}`);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const manualRegister = async () => {
    try {
      const res = await API.post(`/registrations/manual/${id}`, form);
      alert(res.data.message);
      setShowManual(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="event-loading">
        <h2>Loading event details...</h2>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="event-error">
        <h2>{error || "Event not found"}</h2>
        <button onClick={() => navigate(-1)}>← Go Back</button>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="event-details-page">
      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Events
      </button>

      <div className="event-details-card">
        {/* EVENT IMAGE */}
        <img
          src={event.image || defaultImg}
          alt={event.title}
          onError={(e) => (e.target.src = defaultImg)}
        />

        {/* EVENT INFO */}
        <div className="event-info">
          <h1>{event.title}</h1>

          <span
            className={`status-badge ${
              (event.status || "open").toLowerCase()
            }`}
          >
            {event.status || "Open"}
          </span>

          <p className="event-description">{event.description}</p>

          <div className="event-meta">
            <p>
              <strong>📅 Date:</strong>{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
              <strong>📍 Location:</strong> {event.location}
            </p>
            <p>
              <strong>🏷 Category:</strong> {event.category || "General"}
            </p>
            <p>
              <strong>👥 Capacity:</strong> {event.capacity}
            </p>
            <p>
              <strong>🏫 Organized By:</strong>{" "}
              {event.collegeName || "Campus Admin"}
            </p>
          </div>

          {/* REGISTRATION BUTTONS */}
          <div style={{ marginTop: 20 }}>
            <button className="register-btn" onClick={autoRegister}>
              Auto Register
            </button>

            <button
              className="register-btn"
              style={{ marginLeft: 10 }}
              onClick={() => setShowManual(true)}
            >
              Manual Register
            </button>
          </div>

          {/* MANUAL FORM */}
          {showManual && (
            <div className="manual-form" style={{ marginTop: 20 }}>
              <h3>Manual Registration</h3>

              <input
                placeholder="Department"
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              />
              <input
                placeholder="University"
                onChange={(e) =>
                  setForm({ ...form, university: e.target.value })
                }
              />
              <textarea
                placeholder="Why do you want to join?"
                onChange={(e) =>
                  setForm({ ...form, reason: e.target.value })
                }
              />

              <button
                className="register-btn"
                onClick={manualRegister}
                style={{ marginTop: 10 }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
