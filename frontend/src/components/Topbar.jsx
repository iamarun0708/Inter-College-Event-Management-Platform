import { Bell } from "lucide-react";

import "../styles/topbar.css";

export default function Topbar() {
  return (
    <header className="topbar">
      <h3 className="topbar-title">Dashboard</h3>

      <div className="topbar-right">
        <Bell size={15} />
        <span className="topbar-user">User</span>
      </div>
    </header>
  );
}
