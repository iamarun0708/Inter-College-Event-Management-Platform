import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/dashboard.css"; // Reuse dashboard styles

export default function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form State
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    location: "",
    category: "Tech",
    description: "",
    capacity: "",
    image: "" // We will paste a URL here for now
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.name || !eventData.date || !eventData.location) {
      alert("Please fill in the required fields");
      return;
    }

    try {
      setLoading(true);
      // POST /api/events - Ensure your backend has this route!
      await API.post("/events", eventData);
      alert("Event Created Successfully!");
      navigate("/admin"); // Go back to dashboard
    } catch (err) {
      console.error(err);
      alert("Failed to create event. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <button className="back-btn" onClick={() => navigate("/admin")}>← Back</button>
      
      <div className="form-card">
        <h1>Create New Event</h1>
        <p>Fill in the details to publish an event.</p>

        <form onSubmit={handleSubmit} className="create-event-form">
          <div className="form-group">
            <label>Event Name</label>
            <input name="name" onChange={handleChange} placeholder="e.g. Tech Symposium" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input name="date" type="date" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input name="location" onChange={handleChange} placeholder="e.g. Auditorium" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" onChange={handleChange}>
                <option value="Tech">Tech</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Workshop">Workshop</option>
              </select>
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input name="capacity" type="number" onChange={handleChange} placeholder="e.g. 200" />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" onChange={handleChange} placeholder="Event details..."></textarea>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input name="image" onChange={handleChange} placeholder="https://example.com/image.jpg" />
          </div>

          <button className="primary-btn" disabled={loading}>
            {loading ? "Creating..." : "Publish Event"}
          </button>
        </form>
      </div>
    </div>
  );
}