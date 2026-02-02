import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/browseEvents.css";

// Default image fallback
import defaultImg from "../assets/event1.jpg";

export default function BrowseEvents() {
  const navigate = useNavigate();

  // Events state
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await API.get("/events");
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Apply filters
  const filteredEvents = events.filter((event) => {
    const eventStatus = event.status || "Open";

    const matchCategory =
      category === "All" || event.category === category;

    const matchStatus =
      status === "All" || eventStatus === status;

    return matchCategory && matchStatus;
  });

  return (
    <div className="browse-page">
      <h1>Browse Events</h1>
      <p className="subtitle">Discover events happening on your campus</p>

      {/* FILTERS */}
      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Loading events...
        </p>
      ) : (
        <div className="events-grid">
          {filteredEvents.length === 0 ? (
            <p>No events found matching your filters.</p>
          ) : (
            filteredEvents.map((event) => (
              <div className="event-card glass" key={event._id}>
                <img
                  src={event.image || defaultImg}
                  alt={event.title}
                  onError={(e) => (e.target.src = defaultImg)}
                />

                <h3>{event.title}</h3>

                {/* Status badge */}
                <span
                  className={`badge ${
                    (event.status || "Open").toLowerCase()
                  }`}
                >
                  {event.status || "Open"}
                </span>

                <p className="event-date">
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>

                <button
                  className="view-btn"
                  onClick={() => navigate(`/events/${event._id}`)}
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
