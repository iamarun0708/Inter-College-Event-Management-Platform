import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/myregistrations.css";

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch student registrations
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const { data } = await API.get("/registrations/my");
        setRegistrations(data);
      } catch (err) {
        console.error("Failed to fetch registrations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  // Filter logic
  const filtered = registrations.filter((reg) => {
    const matchesSearch =
      reg.event?.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      reg.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Status message
  const getStatusMessage = (reg) => {
    if (reg.status === "Approved")
      return "Registration confirmed";
    if (reg.status === "Rejected")
      return "Registration rejected";
    return "Waiting for approval";
  };

  return (
    <div className="page-container">
      <h1 className="page-title">My Registrations</h1>
      <p className="page-subtitle">
        Track all events you’ve registered for
      </p>

      {/* SEARCH + FILTER */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Waitlisted">Waitlisted</option>
        </select>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p style={{ textAlign: "center" }}>
          Loading registrations...
        </p>
      ) : (
        <div className="card-grid">
          {filtered.length === 0 ? (
            <p>No registrations found.</p>
          ) : (
            filtered.map((reg) => (
              <div
                key={reg._id}
                className="event-card"
              >
                <div>
                  <h3>{reg.event?.title}</h3>
                  <p className="muted">
                    📅{" "}
                    {new Date(
                      reg.event?.startDate
                    ).toLocaleDateString()}
                  </p>
                  <p className="muted">
                    📍 {reg.event?.location}
                  </p>

                  {/* Status message */}
                  <p className="status-message">
                    {getStatusMessage(reg)}
                  </p>
                </div>

                <span
                  className={`status-pill ${
                    reg.status.toLowerCase()
                  }`}
                >
                  {reg.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
