import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/dashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "Student" });
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const loadData = async () => {
      try {
        const [eventsRes, regRes, notifRes] = await Promise.all([
          API.get("/events"),
          API.get("/registrations/my").catch(() => ({ data: [] })),
          API.get("/notifications").catch(() => ({ data: [] })),
        ]);

        setEvents(eventsRes.data || []);
        setRegistrations(regRes.data || []);
        setNotifications(notifRes.data || []);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="dashboard-container">
      <main className="main-content">
        {/* GREETING */}
        <div className="greeting">
          <h1>Hello, {user.name}! 👋</h1>
          <p>Here's what's happening with your campus events today.</p>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{events.length}</h3>
            <p>Events Available</p>
          </div>

          <div className="stat-card">
            <h3>{registrations.length}</h3>
            <p>My Registrations</p>
          </div>

          <div className="stat-card">
            <h3>{notifications.length}</h3>
            <p>Notifications</p>
          </div>
        </div>

        <div className="content-grid">
          {/* UPCOMING EVENTS */}
          <section className="card-section">
            <div className="section-header">
              <h3>📅 Upcoming Campus Events</h3>
              <span
                className="view-all"
                onClick={() => navigate("/browseEvents")}
              >
                View all
              </span>
            </div>

            {loading && <p>Loading events...</p>}

            {!loading && events.length === 0 && (
              <p>No upcoming events found.</p>
            )}

            {!loading &&
              events.slice(0, 3).map((event) => {
                const eventDate = event.startDate || event.date;

                return (
                  <div
                    key={event._id}
                    className="event-row"
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    <div className="date-box purple">
                      <span>
                        {new Date(eventDate)
                          .toLocaleString("default", { month: "short" })
                          .toUpperCase()}
                      </span>
                      <strong>
                        {new Date(eventDate).getDate()}
                      </strong>
                    </div>

                    <div className="event-info">
                      <h4>{event.title}</h4>
                      <p>📍 {event.location}</p>
                    </div>

                    <span
                      className={`status ${
                        (event.status || "Open").toLowerCase()
                      }`}
                    >
                      {event.status || "Open"}
                    </span>
                  </div>
                );
              })}
          </section>

          {/* NOTIFICATIONS */}
          <section className="card-section">
            <div className="section-header">
              <h3>🔔 Notifications</h3>
            </div>

            {notifications.length === 0 && (
              <div className="notification-item">
                <strong>Welcome to EveMan!</strong>
                <p>Explore events and start registering today.</p>
                <span>Just now</span>
              </div>
            )}

            {notifications.map((n) => (
              <div key={n._id} className="notification-item">
                <strong>{n.title || "Update"}</strong>
                <p>{n.message}</p>
                <span>
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
