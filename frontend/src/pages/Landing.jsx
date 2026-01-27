import { useNavigate } from "react-router-dom";
import "../styles/landing.css";
import Logo from "../components/Logo";
import heroImg from "../assets/Hero.svg";
import eventImg1 from "../assets/event1.jpg";
import eventImg2 from "../assets/event2.jpg";
import eventImg3 from "../assets/event3.jpg";
import eventImg4 from "../assets/event4.jpg";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="navbar">
        <Logo size="small" />
        <div className="nav-links">
          <span>Dashboard</span>
          <span>Events</span>
          <span>Help & Support</span>
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

    <button className="primary-btn" onClick={() => navigate("/login")}>Get Started</button>
  </div>

  <div className="hero-right">
    <img src={heroImg} alt="Events Illustration" />
  </div>
</section>


      <section className="events">
  <h2>Upcoming Events</h2>

  <div className="event-grid">
    <div className="event-card">
  <img src={eventImg1} alt="Event" />
  <p>Hackathon</p>
</div>


    <div className="event-card">
  <img src={eventImg2} alt="Event" />
  <p>Seminar</p>
</div>


    <div className="event-card">
  <img src={eventImg3} alt="Event" />
  <p>Conference</p>
</div>


    <div className="event-card">
  <img src={eventImg4} alt="Event" />
  <p>Podcasts</p>
</div>
</div>
</section>


      {/* FEEDBACK */}
      <section className="feedback">
        <h2>Feedback</h2>
        <div className="feedback-row">
          {[1,2].map((i) => (
            <div className="feedback-card" key={i}>
              <p>
                “EVEMAN made our college events super easy to manage.”
              </p>
              <span>— User</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <div className="about-text">
          <h2>Just to remind you, We are EVEMAN</h2>
          <p>
            EVEMAN helps colleges manage, organize and analyze events
            in a simple and effective way.
          </p>
        </div>
        <div className="about-image">
          <div className="image-placeholder">Image</div>
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
