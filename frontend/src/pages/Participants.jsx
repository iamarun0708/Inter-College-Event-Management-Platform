import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function Participants() {
  const { id } = useParams();
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get(`/registrations/${id}`).then((res) =>
      setList(res.data)
    );
  }, [id]);

  const updateStatus = async (regId, status) => {
    await API.put(`/registrations/status/${regId}`, {
      status,
    });
    window.location.reload();
  };

  return (
    <div className="page-container">
      <h1>Participants</h1>

      <table className="event-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.map((p) => (
            <tr key={p._id}>
              <td>{p.student.name}</td>
              <td>{p.student.email}</td>
              <td>{p.student.department}</td>
              <td>{p.status}</td>
              <td>
                <button
                  onClick={() =>
                    updateStatus(p._id, "approved")
                  }
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    updateStatus(p._id, "rejected")
                  }
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
