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
          alt={event.name}
          onError={(e) => (e.target.src = defaultImg)}
        />

        {/* EVENT INFO */}
        <div className="event-info">
          <h1>{event.name}</h1>

          <span className={`status-badge ${(event.status || "open").toLowerCase()}`}>
            {event.status || "Open"}
          </span>

          <p className="event-description">
            {event.description}
          </p>

          <div className="event-meta">
            <p><strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>📍 Location:</strong> {event.location}</p>
            <p><strong>🏷 Category:</strong> {event.category || "General"}</p>
            <p><strong>👥 Capacity:</strong> {event.capacity}</p>
            <p><strong>🏫 Organized By:</strong> {event.collegeName || "Campus Admin"}</p>
          </div>

          <button
            className="register-btn"
            onClick={() => alert("Registration will be available in Milestone 3")}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
