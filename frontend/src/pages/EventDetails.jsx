import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/eventDetails.css";

// fallback image
import defaultImg from "../assets/event1.jpg";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // registration states
  const [manual, setManual] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    university: "",
    phone: "",
    reason: "",
    communicationMode: "email",
  });

  const [timer, setTimer] = useState("");

  /* ================= FETCH EVENT ================= */

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const { data } = await API.get(`/events/${id}`);
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Event not found or server error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEventDetails();
  }, [id]);

  /* ================= TIMER ================= */

  useEffect(() => {
    if (!event?.date) return;

    const interval = setInterval(() => {
      const diff = new Date(event.date) - new Date();

      if (diff <= 0) {
        setTimer("Event started");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff / (1000 * 60)) % 60);

      setTimer(`${hours}h ${mins}m remaining`);
    }, 60000);

    return () => clearInterval(interval);
  }, [event]);

  /* ================= REGISTER ================= */

  const handleRegister = async () => {
    try {
      await API.post(`/registrations/${id}`, form);
      alert("Registration submitted!");
      navigate("/registrations");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="event-loading">
        <h2>Loading event details...</h2>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="event-error">
        <h2>{error || "Event not found"}</h2>
        <button onClick={() => navigate(-1)}>← Go Back</button>
      </div>
    );
  }

  const slotsLeft =
    event.capacity && event.registeredCount
      ? event.capacity - event.registeredCount
      : event.capacity || "N/A";

  /* ================= UI ================= */

  return (
    <div className="event-details-page">
      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Events
      </button>

      <div className="event-details-card">
        {/* EVENT IMAGE */}
        <img
          src={event.image || defaultImg}
          alt={event.name}
          onError={(e) => (e.target.src = defaultImg)}
        />

        {/* EVENT INFO */}
        <div className="event-info">
          <h1>{event.name}</h1>

          <span
            className={`status-badge ${(event.status || "open").toLowerCase()}`}
          >
            {event.status || "Open"}
          </span>

          <p className="event-description">{event.description}</p>

          <div className="event-meta">
            <p>
              <strong>📅 Date:</strong>{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
              <strong>⏱ Starts in:</strong> {timer || "Calculating..."}
            </p>
            <p>
              <strong>📍 Location:</strong> {event.location}
            </p>
            <p>
              <strong>🏷 Category:</strong>{" "}
              {event.category || "General"}
            </p>
            <p>
              <strong>🎟 Slots left:</strong> {slotsLeft}
            </p>
            <p>
              <strong>🏫 Organized By:</strong>{" "}
              {event.collegeName || "Campus Admin"}
            </p>
            <p>
              <strong>📧 Contact:</strong>{" "}
              {event.organizerEmail || "admin@campus.com"}
            </p>
          </div>

          <hr style={{ margin: "20px 0" }} />

          {/* REGISTRATION TYPE */}
          <label>
            <input
              type="checkbox"
              checked={manual}
              onChange={() => setManual(!manual)}
            />{" "}
            Manual Registration
          </label>

          {/* MANUAL FORM */}
          {manual && (
            <div className="registration-form">
              <input
                placeholder="Name"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              <input
                placeholder="Email"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              <input
                placeholder="University"
                onChange={(e) =>
                  setForm({ ...form, university: e.target.value })
                }
              />
              <input
                placeholder="Phone"
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
              <textarea
                placeholder="Why do you want to join this event?"
                onChange={(e) =>
                  setForm({ ...form, reason: e.target.value })
                }
              />

              <select
                onChange={(e) =>
                  setForm({
                    ...form,
                    communicationMode: e.target.value,
                  })
                }
              >
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
          )}

          {/* REGISTER BUTTON */}
          <button className="register-btn" onClick={handleRegister}>
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
