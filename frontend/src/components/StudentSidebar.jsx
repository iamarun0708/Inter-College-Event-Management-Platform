import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function StudentSidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">EVEMAN</h2>

      <nav className="sidebar-menu">
        <NavLink
          to="/student-dashboard"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/browseEvents"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Browse Events
        </NavLink>

        <NavLink
          to="/registrations"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          My Registrations
        </NavLink>

        <NavLink
          to="/certificates"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Certificates
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
