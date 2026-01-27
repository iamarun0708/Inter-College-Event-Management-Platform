import "../styles/sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">EVEMAN</h2>

      <nav>
        <a href="/student">Dashboard</a>
        <a href="/browseEvents">Browse Events</a>
        <a href="/registrations">My Registrations</a>
        <a href="/certificates">Certificates</a>
        <a href="/settings">Settings</a>
      </nav>
    </aside>
  );
}

export default Sidebar;
