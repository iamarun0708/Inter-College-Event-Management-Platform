import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; // Import the connection bridge
import "../styles/browseEvents.css";

// Default image in case an event doesn't have one
import defaultImg from "../assets/event1.jpg"; 

export default function BrowseEvents() {
  const navigate = useNavigate();

  // 1. State to store the real events from DB
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. State for Filters
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  // 3. Fetch Events when page loads
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await API.get("/events"); // Calls GET http://localhost:5000/api/events
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // 4. Filter Logic (Runs automatically when you change dropdowns)
  const filteredEvents = events.filter((event) => {
    const matchCategory = category === "All" || event.category === category;
    
    // Note: If your backend doesn't return 'status', this part might need adjustment later.
    // For now, we assume all fetched events are "Open" unless you add logic.
    const matchStatus = status === "All" || (event.status || "Open") === status; 

    return matchCategory && matchStatus;
  });

  return (
    <div className="browse-page">
      <h1>Browse Events</h1>
      <p className="subtitle">Discover events happening on your campus</p>

      {/* FILTERS SECTION */}
      <div className="filters">
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="All">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
        </select>

        <select onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Loading events...</p>
      ) : (
        <div className="events-grid">
          {filteredEvents.length === 0 ? (
            <p>No events found matching your filters.</p>
          ) : (
            filteredEvents.map((event) => (
              <div className="event-card glass" key={event._id}>
                {/* Image Handling: Use backend URL or Fallback */}
                <img 
                  src={event.image || defaultImg} 
                  alt={event.name} 
                  onError={(e) => { e.target.src = defaultImg; }} // Safety net if URL breaks
                />

                <h3>{event.name}</h3>

                {/* Status Badge */}
                <span className={`badge ${(event.status || 'open').toLowerCase()}`}>
                  {event.status || 'Open'}
                </span>

                <p className="event-date">
                    📅 {new Date(event.date).toLocaleDateString()}
                </p>

                <button
                  className="view-btn"
                  onClick={() => navigate(`/events/${event._id}`)} // Uses MongoDB _id
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