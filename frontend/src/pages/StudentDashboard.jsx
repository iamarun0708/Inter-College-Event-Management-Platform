import "../styles/dashboard.css";
import Logo from "../components/Logo";
import { NavLink } from "react-router-dom";
import {motion} from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";




export default function StudentDashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">

      {/* MAIN */}
      <main className="main-content">

        {/* GREETING */}
        <div className="greeting">
          <h1>Hello, User! 👋</h1>
          <p>Here's what's happening with your campus events today.</p>
        </div>

        {/* STATS */}
        
        <div className="stats-grid">
          <motion.div className="stat-card glass" whileHover={{ scale: 1.03 }} initial={{ opacity: 0, y: 40 }}animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h3><CountUp end={12} duration={5} /></h3>
            <p>Events Attended</p>
          </motion.div>
          <motion.div className="stat-card glass" whileHover={{ scale: 1.03 }}initial={{ opacity: 0, y: 40 }}animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h3><CountUp end={3} duration={3} /></h3>
            <p>Upcoming Events</p>
          </motion.div>
          <motion.div className="stat-card glass" whileHover={{ scale: 1.03 }} initial={{ opacity: 0, y: 40 }}animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h3><CountUp end={5} duration={3} /></h3>
            <p>New Notifications</p>
          </motion.div>
        </div>
       

        {/* CONTENT GRID */}
        <div className="content-grid">

  {/* UPCOMING EVENTS */}
  <section className="card-section">
    <div className="section-header">
      <h3>📅 My Upcoming Events</h3>
      <span className="view-all">View all</span>
    </div>

    <div className="event-row" onClick={() => navigate("/events/3")}>
      <div className="date-box purple">
        <span>OCT</span>
        <strong>25</strong>
      </div>

      <div className="event-info">
        <h4>Sports Meet</h4>
        <p>📍 Innovation Lab • ⏰ 24 Hours</p>
      </div>

      <span className="status approved">Approved</span>
    </div>

    <div className="event-row" onClick={() => navigate("/events/1")}>
      <div className="date-box orange">
        <span>NOV</span>
        <strong>02</strong>
      </div>

      <div className="event-info">
        <h4>Cultural Fest</h4>
        <p>📍 Gallery Hall B • ⏰ 4:00 PM</p>
      </div>

      <span className="status pending">Pending</span>
    </div>

    <div className="event-row" onClick={() => navigate("/events/2")}>
      <div className="date-box gray">
        <span>NOV</span>
        <strong>15</strong>
      </div>

      <div className="event-info">
        <h4>Tech Symposium 2026</h4>
        <p>📍 Main Auditorium • ⏰ 9:00 AM</p>
      </div>

      <span className="status waitlisted">Waitlisted</span>
    </div>
  </section>

  {/* NOTIFICATIONS */}
  <section className="card-section">
    <div className="section-header">
      <h3>🔔 Notifications</h3>
    </div>

    <div className="notification-item success">
      <strong>Registration Approved</strong>
      <p>Your spot for Tech Symposium has been confirmed</p>
      <span>2 hours ago</span>
    </div>

    <div className="notification-item info">
      <strong>Event Update</strong>
      <p>Venue changed to Gallery Hall B</p>
      <span>Yesterday</span>
    </div>

    <div className="notification-item new">
      <strong>New Event Added</strong>
      <p>Annual Sports Meet registrations open</p>
      <span>2 days ago</span>
    </div>

    <p className="view-all center">View all notifications</p>
  </section>

</div>

      </main>
    </div>
  );
}
