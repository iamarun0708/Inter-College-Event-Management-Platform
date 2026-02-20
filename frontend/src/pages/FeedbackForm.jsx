import { useState } from "react";
import { submitFeedback } from "../services/api";
import "../styles/createEvent.css";

export default function FeedbackForm({ registration }) {
  const [form, setForm] = useState({
    department: registration.department || "",
    college: registration.university || "",
    eventType: "",
    helpfulness: "",
    expectation: "",
    rating: 5,
    satisfaction: 80,
    coordination: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitFeedback({
        eventId: registration.event._id,
        ...form,
      });

      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit feedback",err);
    }
  };

  if (submitted) {
    return (
      <div className="empty-state">
        <h2>Thank you for your feedback!</h2>
      </div>
    );
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>Feedback for {registration.event.title}</h2>

      {/* Event Type */}
      <label>What was the event about?</label>
      <select
        value={form.eventType}
        onChange={(e) => handleChange("eventType", e.target.value)}
        required
      >
        <option value="">Select</option>
        <option>Workshop</option>
        <option>Hackathon</option>
        <option>Seminar</option>
        <option>Technical Talk</option>
        <option>Cultural Event</option>
        <option>Competition</option>
      </select>

      {/* Helpfulness */}
      <label>Did this event help you?</label>
      <select
        value={form.helpfulness}
        onChange={(e) => handleChange("helpfulness", e.target.value)}
        required
      >
        <option value="">Select</option>
        <option>Very helpful</option>
        <option>Somewhat helpful</option>
        <option>Not helpful</option>
      </select>

      {/* Expectations */}
      <label>Did the event meet your expectations?</label>
      <select
        value={form.expectation}
        onChange={(e) => handleChange("expectation", e.target.value)}
        required
      >
        <option value="">Select</option>
        <option>Exceeded expectations</option>
        <option>Met expectations</option>
        <option>Below expectations</option>
      </select>

      {/* Star Rating */}
      <label>Overall Rating</label>
      <div style={{ marginBottom: "15px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              fontSize: "28px",
              cursor: "pointer",
              color: star <= form.rating ? "#facc15" : "#ccc",
            }}
            onClick={() => handleChange("rating", star)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Satisfaction Slider */}
      <label>Satisfaction: {form.satisfaction}%</label>
      <input
        type="range"
        min="0"
        max="100"
        value={form.satisfaction}
        onChange={(e) =>
          handleChange("satisfaction", Number(e.target.value))
        }
      />

      {/* Coordinator rating */}
      <label>Were the coordinators organized?</label>
      <select
        value={form.coordination}
        onChange={(e) => handleChange("coordination", e.target.value)}
        required
      >
        <option value="">Select</option>
        <option>Excellent</option>
        <option>Good</option>
        <option>Average</option>
        <option>Poor</option>
      </select>

      <button type="submit" className="primary-btn">
        Submit Feedback
      </button>
    </form>
  );
}