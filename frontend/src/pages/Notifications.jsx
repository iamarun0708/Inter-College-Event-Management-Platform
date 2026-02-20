import { useEffect, useState } from "react";
import API from "../services/api";

export default function Notifications() {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    API.get("/notifications").then((res) => setNotifs(res.data));
  }, []);

  return (
    <div className="page-container">
      <h1>Notifications</h1>

      {notifs.map((n) => (
        <div key={n._id} className="notification-item">
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
}
