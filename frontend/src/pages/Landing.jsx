import { useNavigate } from "react-router-dom";
import "../styles/landing.css";
import Logo from "../components/Logo";
import heroImg from "../assets/Hero.svg";

// Import sample images safely (if they exist)
// If you don't have these specific images, just comment them out or use placeholders
import eventImg1 from "../assets/event1.jpg";
import eventImg2 from "../assets/event2.jpg";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* NAVBAR */}
      <nav className="navbar">
        <Logo size="small" />
        <div className="nav-links">
          {/* Public links redirect to Login for now */}
          <span onClick={() => navigate("/login")}>Dashboard</span>
          <span onClick={() => navigate("/login")}>Events</span>
          <button onClick={() => navigate("/login")}>Sign In</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1>A better way to manage your events</h1>
          <ul className="hero-points">
            <li>Plan and promote your events</li>
            <li>Engage your audience</li>
            <li>Track registrations</li>
          </ul>
          <button className="primary-btn" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
        <div className="hero-right">
          <img src={heroImg} alt="Events Illustration" />
        </div>
      </section>

      {/* STATIC EVENTS SHOWCASE (Purely Visual) */}
      <section className="events">
        <h2>Why Join Us?</h2>
        <div className="event-grid">
           <div className="event-card">
              <h3>🚀 Tech Fests</h3>
              <p>Participate in coding marathons and hackathons.</p>
           </div>
           <div className="event-card">
              <h3>🎭 Cultural</h3>
              <p>Showcase your talents in music and dance.</p>
           </div>
           <div className="event-card">
              <h3>⚽ Sports</h3>
              <p>Compete in inter-college tournaments.</p>
           </div>
           <div className="event-card">
              <h3>🎤 Seminars</h3>
              <p>Learn from industry experts and alumni.</p>
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div>
          <h3>EVEMAN</h3>
          <p>Manage college events smartly.</p>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p>support@eveman.com</p>
        </div>
      </footer>
    </div>
  );
}