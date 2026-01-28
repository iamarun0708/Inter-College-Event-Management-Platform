import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import API from "../services/api"; // Import the bridge
import "../styles/dashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "User" });
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    // 1. Get User Name from Local Storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    // 2. Fetch Real Events for the "Upcoming" section
    const fetchEvents = async () => {
      try {
        const { data } = await API.get("/events");
        // Take only the first 3 events to show on dashboard
        setRecentEvents(data.slice(0, 3));
      } catch (err) {
        console.error("Error loading dashboard events", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="dashboard-container">
      <main className="main-content">
        
        {/* GREETING */}
        <div className="greeting">
          <h1>Hello, {user.name}! 👋</h1>
          <p>Here's what's happening with your campus events today.</p>
        </div>

        {/* STATS (Static for now as we paused Milestone 3) */}
        <div className="stats-grid">
          <motion.div className="stat-card glass" whileHover={{ scale: 1.03 }}>
            <h3><CountUp end={12} duration={2} /></h3>
            <p>Events Available</p>
          </motion.div>
          <motion.div className="stat-card glass" whileHover={{ scale: 1.03 }}>
            <h3><CountUp end={0} duration={2} /></h3>
            <p>My Registrations</p>
          </motion.div>
          <motion.div className="stat-card glass" whileHover={{ scale: 1.03 }}>
            <h3><CountUp end={5} duration={2} /></h3>
            <p>Notifications</p>
          </motion.div>
        </div>

        <div className="content-grid">
          
          {/* UPCOMING EVENTS LIST */}
          <section className="card-section">
            <div className="section-header">
              <h3>📅 Upcoming Campus Events</h3>
              <span className="view-all" onClick={() => navigate("/browseEvents")}>
                View all
              </span>
            </div>

            {/* Render Real Events */}
            {recentEvents.length > 0 ? (
              recentEvents.map((event) => (
                <div 
                  className="event-row" 
                  key={event._id} 
                  onClick={() => navigate(`/events/${event._id}`)}
                >
                  <div className="date-box purple">
                    <span>{new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                    <strong>{new Date(event.date).getDate()}</strong>
                  </div>

                  <div className="event-info">
                    <h4>{event.name}</h4>
                    <p>📍 {event.location}</p>
                  </div>

                  {/* Status Badge */}
                  <span className={`status ${event.status ? event.status.toLowerCase() : 'open'}`}>
                    {event.status || 'Open'}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ padding: "20px", color: "#666" }}>No events found. Check back later!</p>
            )}
          </section>

          {/* NOTIFICATIONS (Static for Demo) */}
          <section className="card-section">
            <div className="section-header">
              <h3>🔔 Notifications</h3>
            </div>
            
            <div className="notification-item new">
              <strong>Welcome to EveMan!</strong>
              <p>Explore events and start registering today.</p>
              <span>Just now</span>
            </div>

            <div className="notification-item info">
              <strong>System Update</strong>
              <p>Milestone 2 Features are now live.</p>
              <span>1 day ago</span>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}