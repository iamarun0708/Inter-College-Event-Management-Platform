import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import Topbar from "../components/Topbar";
import "../styles/dashboard.css";

export default function StudentLayout() {
  return (
    <div className="dashboard-layout">
      {/* STUDENT SIDEBAR */}
      <StudentSidebar />

      {/* MAIN CONTENT */}
      <div className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
