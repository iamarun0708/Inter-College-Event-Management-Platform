import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/dashboard.css";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { id } = useParams(); // detect edit mode

  const [loading, setLoading] = useState(false);

  // Event state (matches backend Event.model.js)
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "Tech",
    capacity: 100,
    image: "",
  });

  // 🔥 Load existing event data when editing
  useEffect(() => {
    if (!id) return; // create mode

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/events/${id}`);
        const data = res.data;

        setEvent({
          title: data.title || "",
          description: data.description || "",
          date: data.date
            ? new Date(data.date).toISOString().slice(0, 16) // ✅ correct for datetime-local
            : "",
          location: data.location || "",
          category: data.category || "Tech",
          capacity: data.capacity || 100,
          image: data.image || "",
        });
      } catch (err) {
        console.error("Failed to load event", err);
        alert("Failed to load event data");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Input handler
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  // Create / Update submit
  const handleSubmit = async () => {
    try {
      if (id) {
        await API.put(`/events/${id}`, event);
        alert("Event Updated Successfully");
      } else {
        await API.post("/events", event);
        alert("Event Created Successfully");
      }
      navigate("/admin/manage-events");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">
        {id ? "Edit Event" : "Create Event"}
      </h1>

      {loading && <p>Loading event data...</p>}

      <input
        name="title"
        placeholder="Event Title"
        value={event.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={event.description}
        onChange={handleChange}
      />

      <input
        type="datetime-local"
        name="date"
        value={event.date}
        onChange={handleChange}
      />

      <input
        name="location"
        placeholder="Location"
        value={event.location}
        onChange={handleChange}
      />

      <select
        name="category"
        value={event.category}
        onChange={handleChange}
      >
        <option value="Tech">Tech</option>
        <option value="Cultural">Cultural</option>
        <option value="Sports">Sports</option>
        <option value="Workshop">Workshop</option>
        <option value="Seminar">Seminar</option>
      </select>

      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={event.capacity}
        onChange={handleChange}
      />

      <input
        name="image"
        placeholder="Image URL"
        value={event.image}
        onChange={handleChange}
      />

      <button className="primary-btn" onClick={handleSubmit}>
        {id ? "Update Event" : "Create Event"}
      </button>
    </div>
  );
}
