import "../styles/myregistrations.css";

const registrations = [
  {
    id: 1,
    title: "Tech Symposium 2026",
    date: "25 Oct 2026",
    location: "Main Auditorium",
    status: "Approved",
  },
  {
    id: 2,
    title: "Annual Art Gala",
    date: "02 Nov 2026",
    location: "Gallery Hall B",
    status: "Pending",
  },
  {
    id: 3,
    title: "Campus Hackathon",
    date: "15 Nov 2026",
    location: "Innovation Lab",
    status: "Waitlisted",
  },
];

export default function MyRegistrations() {
  return (
    <div className="page-container">

      <h1 className="page-title">My Registrations</h1>
      <p className="page-subtitle">
        Track all events you’ve registered for
      </p>

      <div className="card-grid">
        {registrations.map((event) => (
          <div key={event.id} className="event-card">

            <div>
              <h3>{event.title}</h3>
              <p className="muted">{event.date}</p>
              <p className="muted">{event.location}</p>
            </div>

            <span
              className={`status-pill ${event.status.toLowerCase()}`}
            >
              {event.status}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}
