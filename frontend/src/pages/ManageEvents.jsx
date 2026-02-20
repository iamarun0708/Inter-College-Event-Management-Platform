import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/manageEvents.css";

export default function ManageEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all events on load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Delete event
  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
      alert("Event deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete event");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading events...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Manage Events</h1>
      <p className="page-subtitle">View, edit or manage participants</p>

      {/* Empty state */}
      {events.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No events found.</p>
      ) : (
        <div className="manage-grid">
          {events.map((event) => (
            <div key={event._id} className="manage-card">
              {/* Header */}
              <div className="manage-header">
                <h3>{event.title}</h3>
                <span className="category-pill">
                  {event.category}
                </span>
              </div>

              {/* Meta Info */}
              <p className="manage-meta">
                📅 {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="manage-meta">📍 {event.location}</p>
              <p className="manage-meta">
                👥 Capacity: {event.capacity}
              </p>

              {/* Actions */}
              <div className="manage-actions">
                <button
                  className="participants-btn"
                  onClick={() =>
                    navigate(`/admin/participants/${event._id}`)
                  }
                >
                  Participants
                </button>

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/admin/edit-event/${event._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteEvent(event._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}