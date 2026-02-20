import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/createEvent.css";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { id } = useParams(); // event id for edit mode

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "Tech",
    capacity: 100,
    image: "",
    registrationStart: "",
    registrationEnd: "",
    organizingDepartment: "",
    contactInfo: "",
    requiresApproval: false,
  });

  const [loading, setLoading] = useState(false);

  /* ================= LOAD EVENT FOR EDIT ================= */
  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/events/${id}`);

        setForm({
          title: data.title || "",
          description: data.description || "",
          date: data.date ? data.date.slice(0, 16) : "",
          location: data.location || "",
          category: data.category || "Tech",
          capacity: data.capacity || 100,
          image: data.image || "",
          registrationStart: data.registrationStart
            ? data.registrationStart.slice(0, 16)
            : "",
          registrationEnd: data.registrationEnd
            ? data.registrationEnd.slice(0, 16)
            : "",
          organizingDepartment: data.organizingDepartment || "",
          contactInfo: data.contactInfo || "",
          requiresApproval: data.requiresApproval || false,
        });
      } catch (err) {
        console.error("Failed to load event:", err);
        alert("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  /* ================= FORM HANDLING ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (id) {
        // EDIT MODE
        await API.put(`/events/${id}`, form);
        alert("Event updated successfully");
      } else {
        // CREATE MODE
        await API.post("/events", form);
        alert("Event created successfully");
      }

      navigate("/admin/manage-events");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving event");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="page-container">
      <h1>{id ? "Edit Event" : "Create Event"}</h1>

      <form className="event-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="Tech">Tech</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Workshop">Workshop</option>
        </select>

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <label>Registration Start</label>
        <input
          type="datetime-local"
          name="registrationStart"
          value={form.registrationStart}
          onChange={handleChange}
          required
        />

        <label>Registration End</label>
        <input
          type="datetime-local"
          name="registrationEnd"
          value={form.registrationEnd}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="organizingDepartment"
          placeholder="Organizing Department"
          value={form.organizingDepartment}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contactInfo"
          placeholder="Admin Contact"
          value={form.contactInfo}
          onChange={handleChange}
          required
        />

        <label className="checkbox">
          <input
            type="checkbox"
            name="requiresApproval"
            checked={form.requiresApproval}
            onChange={handleChange}
          />
          Requires Admin Approval
        </label>

        <button
          type="submit"
          className="primary-btn"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : id
            ? "Update Event"
            : "Create Event"}
        </button>
      </form>
    </div>
  );
}
