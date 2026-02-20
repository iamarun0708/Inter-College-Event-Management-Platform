import { useEffect, useState } from "react";
import API from "../services/api";
import FeedbackForm from "./FeedbackForm";
import "../styles/dashboard.css";

export default function Feedback() {
  const [eligibleEvents, setEligibleEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH REGISTRATIONS ================= */
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await API.get("/registrations/my");

        // Filter eligible events
        const eligible = res.data.filter(
          (reg) =>
            reg.status === "approved" &&
            reg.attendanceStatus === "attended" &&
            !reg.feedbackSubmitted
        );

        setEligibleEvents(eligible);
      } catch (err) {
        console.error("Error fetching registrations", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  /* ================= RENDER ================= */
  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading feedback...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Event Feedback</h1>

      {eligibleEvents.length === 0 ? (
        <div className="empty-state">
          <p>
            You are not eligible to submit feedback yet.
            <br />
            Feedback becomes available after:
          </p>
          <ul>
            <li>Your registration is approved</li>
            <li>Admin marks you as attended</li>
          </ul>
        </div>
      ) : (
        <div>
          <p className="section-subtitle">
            Please submit your feedback for the attended event.
          </p>

          {/* Show form for first eligible event */}
          <FeedbackForm registration={eligibleEvents[0]} />
        </div>
      )}
    </div>
  );
}