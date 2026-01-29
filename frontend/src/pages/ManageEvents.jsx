import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/dashboard.css";

export default function ManageEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events").then(res => setEvents(res.data));
  }, []);

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await API.delete(`/events/${id}`);
    setEvents(events.filter(e => e._id !== id));
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Manage Events</h1>

      <table className="event-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Location</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.map(event => (
            <tr key={event._id}>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>{event.category}</td>
              <td>
                <span
                  style={{ cursor: "pointer", color: "#7c3aed" }}
                  onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                >
                   Edit
                </span>
                {" | "}
                <span
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => deleteEvent(event._id)}
                >
                   Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
