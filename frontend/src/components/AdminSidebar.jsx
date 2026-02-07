import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function AdminSidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">EVEMAN</h2>

      <nav className="sidebar-menu">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/create-event"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Create Event
        </NavLink>

        <NavLink
          to="/admin/manage-events"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Manage Events
        </NavLink>
      </nav>
    </aside>
  );
}
