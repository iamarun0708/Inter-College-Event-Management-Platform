import { useParams, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import cultureImg from "../assets/culture.jpg";
import tech from "../assets/event1.jpg";
import sports from "../assets/sports.jpg";

const events = [
  {
    id: 1,
    title: "Cultural Fest",
    image: cultureImg,
    date: "2 Nov 2026",
    location: "Gallery Hall",
    status: "Open",
    description:
      "Join us for an exciting cultural fest featuring dance, music, drama, and food stalls from across campus.",
  },
  {
    id: 2,
    title: "Tech Symposium 2026",
    image: tech,
    date: "15 Nov 2026",
    location: "Innovation Lab",
    status: "Open",
    description:
      "A 24-hour coding marathon where students collaborate to build innovative solutions.",
  },
  {
    id: 3,
    title: "Sports Meet",
    image: sports,
    date: "25 oct 2026",
    location: "Main Auditorium",
    status: "Open",
    description:
      "A 24-hour coding marathon where students collaborate to build innovative solutions.",
  }
];

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === Number(id));

  if (!event) return <h2>Event not found</h2>;

  return (
    <div className="page-container">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="details-card">

        <img
          src={event.image}
          alt={event.title}
          className="details-img"
        />

        <div className="details-content">
          <h1>{event.title}</h1>

          <div className="details-meta">
            📅 {event.date} &nbsp; • &nbsp; 📍 {event.location}
          </div>

          <span className="status-pill open">
            {event.status}
          </span>

          <p className="details-desc">
            {event.description}
          </p>

          <button className="primary-btn">
            Register Now
          </button>
        </div>

      </div>
    </div>
  );
}
