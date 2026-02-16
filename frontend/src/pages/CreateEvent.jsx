import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/dashboard.css";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { id } = useParams(); // detect edit mode

  const [loading, setLoading] = useState(false);

  // Event state (Milestone 3 structure)
  const [event, setEvent] = useState({
    title: "",
    description: "",
    department: "",
    summary: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    location: "",
    category: "Tech",
    capacity: 100,
    image: "",
    status: "Open",
  });

  // Load event in edit mode
  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/events/${id}`);
        const data = res.data;

        setEvent({
          title: data.title || "",
          description: data.description || "",
          department: data.department || "",
          summary: data.summary || "",
          startDate: data.startDate
            ? new Date(data.startDate)
                .toISOString()
                .slice(0, 16)
            : "",
          endDate: data.endDate
            ? new Date(data.endDate)
                .toISOString()
                .slice(0, 16)
            : "",
          registrationDeadline: data.registrationDeadline
            ? new Date(data.registrationDeadline)
                .toISOString()
                .slice(0, 10)
            : "",
          location: data.location || "",
          category: data.category || "Tech",
          capacity: data.capacity || 100,
          image: data.image || "",
          status: data.status || "Open",
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

  // Submit handler
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

      {/* Title */}
      <input
        name="title"
        placeholder="Event Title"
        value={event.title}
        onChange={handleChange}
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={event.description}
        onChange={handleChange}
        className="description-field"
      />

      {/* Department */}
      <input
        name="department"
        placeholder="Department"
        value={event.department}
        onChange={handleChange}
      />

      {/* Summary */}
      <textarea
        name="summary"
        placeholder="Event Summary"
        value={event.summary}
        onChange={handleChange}
        className="description-field"
      />

      {/* Start date */}
      <label>Start Date & Time</label>
      <input
        type="datetime-local"
        name="startDate"
        value={event.startDate}
        onChange={handleChange}
      />

      {/* End date */}
      <label>End Date & Time</label>
      <input
        type="datetime-local"
        name="endDate"
        value={event.endDate}
        onChange={handleChange}
      />

      {/* Registration deadline */}
      <label>Registration Deadline</label>
      <input
        type="date"
        name="registrationDeadline"
        value={event.registrationDeadline}
        onChange={handleChange}
      />

      {/* Location */}
      <input
        name="location"
        placeholder="Location"
        value={event.location}
        onChange={handleChange}
      />

      {/* Category */}
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

      {/* Capacity */}
      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={event.capacity}
        onChange={handleChange}
      />

      {/* Image */}
      <input
        name="image"
        placeholder="Image URL"
        value={event.image}
        onChange={handleChange}
      />

      {/* Draft option */}
      <select
        name="status"
        value={event.status}
        onChange={handleChange}
      >
        <option value="Open">Open</option>
        <option value="Draft">Draft</option>
      </select>

      {/* Submit */}
      <button className="primary-btn" onClick={handleSubmit}>
        {id ? "Update Event" : "Create Event"}
      </button>
    </div>
  );
}
