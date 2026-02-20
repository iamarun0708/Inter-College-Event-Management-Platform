import { useEffect, useState } from "react";
import API from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import "../styles/dashboard.css";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AdminFeedback() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [summary, setSummary] = useState(null);

  /* ================= FETCH EVENTS ================= */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to load events", err);
      }
    };

    fetchEvents();
  }, []);

  /* ================= FETCH SUMMARY ================= */
  useEffect(() => {
    const fetchSummary = async () => {
      if (!eventId) {
        setSummary(null);
        return;
      }

      try {
        const res = await API.get(`/feedback/summary/${eventId}`);
        setSummary(res.data);
      } catch (err) {
        alert("Failed to load feedback summary",err);
      }
    };

    fetchSummary();
  }, [eventId]);

  /* ================= PREPARE CHART DATA ================= */
  const ratingData = summary
    ? Object.entries(summary.ratingDistribution).map(([key, value]) => ({
        name: `${key} Star`,
        value,
      }))
    : [];

  const helpfulnessData = summary
    ? Object.entries(summary.helpfulnessDistribution).map(
        ([key, value]) => ({
          name: key,
          value,
        })
      )
    : [];

  const coordinationData = summary
    ? Object.entries(summary.coordinationDistribution).map(
        ([key, value]) => ({
          name: key,
          value,
        })
      )
    : [];

  return (
    <div className="page-container">
      <h1 className="page-title">Feedback Analysis</h1>

      {/* Event Dropdown */}
      <div className="filter-bar">
        <select
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      {!summary && (
        <p style={{ marginTop: 20 }}>
          Select an event to view feedback.
        </p>
      )}

      {summary && (
        <div>
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Responses</h3>
              <p>{summary.totalResponses}</p>
            </div>

            <div className="stat-card">
              <h3>Average Rating</h3>
              <p>{summary.averageRating} ⭐</p>
            </div>

            <div className="stat-card">
              <h3>Avg Satisfaction</h3>
              <p>{summary.averageSatisfaction}%</p>
            </div>
          </div>

          {/* Rating Pie Chart */}
          <h2>Rating Distribution</h2>
          <PieChart width={350} height={300}>
            <Pie
              data={ratingData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {ratingData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          {/* Helpfulness Bar Chart */}
          <h2>Helpfulness</h2>
          <BarChart width={500} height={300} data={helpfulnessData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>

          {/* Coordination Pie Chart */}
          <h2>Coordinator Performance</h2>
          <PieChart width={350} height={300}>
            <Pie
              data={coordinationData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {coordinationData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      )}
    </div>
  );
}