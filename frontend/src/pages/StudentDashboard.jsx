import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/dashboard.css";
import EventCountdown from "../components/EventCountdown";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ fullName: "Student" });
  const [events, setEvents] = useState([]);
  const [myRegs, setMyRegs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const fetchData = async () => {
      try {
        const [eventsRes, regsRes, notifRes] = await Promise.all([
          API.get("/events"),
          API.get("/registrations/my"),
          API.get("/notifications"),
        ]);

        setEvents(eventsRes.data);
        setMyRegs(regsRes.data);
        setNotifications(notifRes.data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <main className="main-content">
        {/* GREETING */}
        <div className="greeting">
          <h1>Hello, {user.fullName}! 👋</h1>
          <p>Here's what's happening with your campus events today.</p>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{events.length}</h3>
            <p>Events Available</p>
          </div>

          <div className="stat-card">
            <h3>{myRegs.length}</h3>
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
              events.slice(0, 3).map((event) => (
                <div
                  key={event._id}
                  className="event-row"
                  onClick={() => navigate(`/events/${event._id}`)}
                >
                  <div className="date-box purple">
                    <span>
                      {new Date(event.date)
                        .toLocaleString("default", { month: "short" })
                        .toUpperCase()}
                    </span>
                    <strong>{new Date(event.date).getDate()}</strong>
                  </div>

                  <div className="event-info">
                    <h4>{event.title}</h4>
                    <p>📍 {event.location}</p>

                    {/* COUNTDOWN TIMER */}
                    <EventCountdown date={event.date} />
                  </div>

                  <span
                    className={`status ${
                      (event.status || "Open").toLowerCase()
                    }`}
                  >
                    {event.status || "Open"}
                  </span>
                </div>
              ))}
          </section>

          {/* NOTIFICATIONS */}
          <section className="card-section">
            <div className="section-header">
              <h3>🔔 Notifications</h3>
            </div>

            {notifications.length === 0 && (
              <p>No notifications yet.</p>
            )}

            {notifications.slice(0, 3).map((n) => (
              <div key={n._id} className="notification-item">
                <strong>Notification</strong>
                <p>{n.message}</p>
                <span>
                  {new Date(n.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
