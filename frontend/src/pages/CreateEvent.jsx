import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/dashboard.css";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    category: "Tech",
    capacity: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      API.get(`/events/${id}`).then(res => setEvent(res.data));
    }
  }, [id]);

  const handleChange = (e) =>
    setEvent({ ...event, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (id) {
      await API.put(`/events/${id}`, event);
      alert("Event Updated");
    } else {
      await API.post("/events", event);
      alert("Event Created");
    }
    navigate("/admin/manage-events");
  };

  return (
    <div className="page-container">
      <h1 className="page-title">{id ? "Edit Event" : "Create Event"}</h1>

      <input name="name" placeholder="Event Title" value={event.name} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={event.description} onChange={handleChange} />
      <input type="datetime-local" name="date" value={event.date} onChange={handleChange} />
      <input name="location" placeholder="Location" value={event.location} onChange={handleChange} />

      <select name="category" value={event.category} onChange={handleChange}>
        <option>Tech</option>
        <option>Cultural</option>
        <option>Sports</option>
        <option>Workshop</option>
        <option>Seminar</option>
      </select>

      <input type="number" name="capacity" placeholder="Capacity" value={event.capacity} onChange={handleChange} />
      <input name="image" placeholder="Image URL" value={event.image} onChange={handleChange} />

      <button className="primary-btn" onClick={handleSubmit}>
        {id ? "Update Event" : "Create Event"}
      </button>
    </div>
  );
}
