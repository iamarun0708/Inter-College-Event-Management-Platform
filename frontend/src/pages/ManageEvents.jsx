import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/manageEvents.css";

export default function ManageEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
        setFilteredEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Apply search + filter
  useEffect(() => {
    let temp = [...events];

    if (search) {
      temp = temp.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      temp = temp.filter((e) => e.category === category);
    }

    setFilteredEvents(temp);
  }, [search, category, events]);

  // Delete event
  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this event?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/events/${id}`);

      // Remove from UI
      setEvents((prev) => prev.filter((e) => e._id !== id));

      alert("Event cancelled successfully");
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
      <p className="page-subtitle">View, edit or delete events</p>

      {/* SEARCH + FILTER */}
      <div className="manage-controls">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
        </select>
      </div>

      {/* EMPTY STATE */}
      {filteredEvents.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No events found.</p>
      ) : (
        <div className="manage-grid">
          {filteredEvents.map((event) => (
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

              {event.department && (
                <p className="manage-meta">
                  🏫 Dept: {event.department}
                </p>
              )}

              {/* Description preview */}
              {event.summary && (
                <div className="description-box">
                  {event.summary}
                </div>
              )}

              {/* Actions */}
              <div className="manage-actions">
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
