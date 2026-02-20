import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/participants.css";

export default function Participants() {
  const { eventId } = useParams();

  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  /* ================= FETCH PARTICIPANTS ================= */
  const loadParticipants = async () => {
    try {
      const res = await API.get(
        `/registrations/event/${eventId}?search=${search}&status=${status}`
      );
      setParticipants(res.data);
    } catch (err) {
      console.error("Failed to load participants", err);
    }
  };

  /* ================= EFFECT ================= */
  useEffect(() => {
  const fetchParticipants = async () => {
    try {
      const res = await API.get(
        `/registrations/event/${eventId}?search=${search}&status=${status}`
      );
      setParticipants(res.data);
    } catch (err) {
      console.error("Failed to load participants", err);
    }
  };

  fetchParticipants();
}, [search, status, eventId]);

  /* ================= STATUS UPDATE ================= */
  const updateStatus = async (id, newStatus) => {
    try {
      await API.put(`/registrations/status/${id}`, {
        status: newStatus,
      });

      loadParticipants();
    } catch (err) {
      alert("Status update failed",err);
    }
  };

  /* ================= ATTENDANCE UPDATE ================= */
  const updateAttendance = async (id, attendanceStatus) => {
    try {
      await API.patch(`/registrations/attendance/${id}`, {
        attendanceStatus,
      });

      loadParticipants();
    } catch (err) {
      alert("Attendance update failed",err);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Participants</h1>

      {/* Filters */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="waitlist">Waitlist</option>
        </select>
      </div>

      {/* Table */}
      <table className="participants-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
            <th>Attendance</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {participants.length === 0 && (
            <tr>
              <td colSpan="7">No participants found</td>
            </tr>
          )}

          {participants.map((p) => (
            <tr key={p._id}>
              <td>{p.student?.fullName}</td>
              <td>{p.student?._id}</td>
              <td>{p.student?.email}</td>
              <td>{p.department}</td>

              {/* Registration Status */}
              <td>
                <span className={`status-pill ${p.status}`}>
                  {p.status}
                </span>
              </td>

              {/* Attendance Status */}
              <td>
                <span
                  className={`status-pill ${
                    p.attendanceStatus || "pending"
                  }`}
                >
                  {p.attendanceStatus || "pending"}
                </span>
              </td>

              {/* Actions */}
              <td>
                {/* Registration Actions */}
                <button
                  className="approve-btn"
                  onClick={() => updateStatus(p._id, "approved")}
                >
                  Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => updateStatus(p._id, "rejected")}
                >
                  Reject
                </button>

                {/* Attendance Actions (only if approved) */}
                {p.status === "approved" && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() =>
                        updateAttendance(p._id, "attended")
                      }
                    >
                      Attended
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        updateAttendance(p._id, "absent")
                      }
                    >
                      Absent
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}