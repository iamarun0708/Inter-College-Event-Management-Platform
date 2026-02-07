import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import "../styles/dashboard.css";

export default function AdminLayout() {
  return (
    <div className="dashboard-layout">
      {/* ADMIN SIDEBAR */}
      <AdminSidebar />

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
