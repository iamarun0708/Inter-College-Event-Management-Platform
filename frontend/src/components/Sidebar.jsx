import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">EVEMAN</h2>

      <nav className="sidebar-menu">
        {/* Fixed Path: /student-dashboard (Matches your App.jsx) */}
        <NavLink to="/student-dashboard" className="nav-item">
          Dashboard
        </NavLink>

        <NavLink to="/browseEvents" className="nav-item">
          Browse Events
        </NavLink>

        <NavLink to="/registrations" className="nav-item">
          My Registrations
        </NavLink>

        <NavLink to="/certificates" className="nav-item">
          Certificates
        </NavLink>

        <NavLink to="/settings" className="nav-item">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;