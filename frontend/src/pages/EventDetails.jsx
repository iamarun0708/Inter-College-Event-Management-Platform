import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api"; // Import the bridge
import "../styles/dashboard.css";

// Fallback image
import defaultImg from "../assets/event1.jpg";

export default function EventDetails() {
  const { id } = useParams(); // This gets the long MongoDB string ID
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Calls GET http://localhost:5000/api/events/:id
        const { data } = await API.get(`/events/${id}`);
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Event not found or server error");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  // Handle Loading State
  if (loading) return <div className="page-container"><h2>Loading event details...</h2></div>;
  
  // Handle Error State
  if (error || !event) return <div className="page-container"><h2>{error || "Event not found"}</h2></div>;

  return (
    <div className="page-container">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="details-card">
        {/* Image with Fallback */}
        <img
          src={event.image || defaultImg}
          alt={event.name}
          className="details-img"
          onError={(e) => { e.target.src = defaultImg; }}
        />

        <div className="details-content">
          <h1>{event.name}</h1>

          <div className="details-meta">
            {/* Format Date to look nice */}
            📅 {new Date(event.date).toLocaleDateString()} &nbsp; • &nbsp; 
            📍 {event.location} &nbsp; • &nbsp; 
            👥 Capacity: {event.capacity}
          </div>

          <span className={`status-pill ${(event.status || 'open').toLowerCase()}`}>
            {event.status || 'Open'}
          </span>

          <p className="details-desc">
            {event.description}
          </p>

          <div className="organizer-info">
             <small>Organized by: {event.collegeName || "Campus Admin"}</small>
          </div>

          <button 
            className="primary-btn"
            onClick={() => alert("Registration feature is coming in Milestone 3!")}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}