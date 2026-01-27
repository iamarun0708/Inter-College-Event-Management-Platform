  /*useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.log(err));
  }, []);*/
import { useNavigate } from "react-router-dom";
import "../styles/browseEvents.css";
import cultureImg from "../assets/culture.jpg";
import tech from "../assets/event1.jpg";
import sports from "../assets/sports.jpg";


const events = [
  {
    id: 1,
    title: "Cultural Fest",
    image: cultureImg,
    category: "Cultural",
    status: "Open",
    
  },
  {
    id: 2,
    title: "Tech Symposium 2026",
    image: tech,
    category: "Tech",
    status: "Open",
  },
  {
    id: 3,
    title: "Sports Meet",
    image: sports,
    category: "Sports",
    status: "Closed",
  },
];

export default function BrowseEvents() {
  const navigate = useNavigate();

  return (
    <div className="browse-page">

      <h1>Browse Events</h1>
      <p className="subtitle">
        Discover events happening on your campus
      </p>

      <div className="filters">
        <select>
          <option>Category</option>
          <option>Tech</option>
          <option>Cultural</option>
          <option>Sports</option>
        </select>

        <select>
          <option>Status</option>
          <option>Open</option>
          <option>Closed</option>
        </select>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <div className="event-card glass" key={event.id}>
            <img src={event.image} />

            <h3>{event.title}</h3>

            <span className={`badge ${event.status.toLowerCase()}`}>
              {event.status}
            </span>

            <button
              className="view-btn"
              onClick={() =>
                navigate(`/events/${event.id}`)
              }
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
