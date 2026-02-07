import { useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import "../styles/topbar.css";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="topbar">
      <h3 className="topbar-title">Dashboard</h3>

      <div className="topbar-right">
        <Bell size={16} />

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
