import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function DashboardSidebar({
  activeSection,
  setActiveSection,
}) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="sidebar">

      <div className="sidebar-logo"
      onClick={() => navigate("/")}
      style={{cursor: "pointer"}}>
        🌱 AgriMind
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">
          Main
        </div>

        <button
          className={`sidebar-item ${
            activeSection === "overview"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveSection("overview")
          }
        >
          📊 Overview
        </button>

        <button
          className={`sidebar-item ${
            activeSection === "rec"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveSection("rec")
          }
        >
          🌾 Crop Recommendation
        </button>

        <button
          className={`sidebar-item ${
            activeSection === "map" ? "active": ""}`}
          onClick={() =>
            setActiveSection("map")
          }>
          🗺 Live Location
        </button>

        <button
          className={`sidebar-item ${
            activeSection === "report"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveSection("report")
          }
        >
          📄 PDF Report
        </button>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">
          Records
        </div>

        <button
          className="sidebar-item"
          onClick={() =>
            navigate("/history")
          }
        >
          📅 Crop History
        </button>

        <button
          className="sidebar-item"
          onClick={() =>
            navigate("/soil")
          }
        >
          🧪 Soil Health
        </button>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">
          Account
        </div>

        <button
          className="sidebar-item"
          onClick={() => navigate("/")}
        >
          🏠 Home
        </button>

        <button
          className="sidebar-item"
          onClick={() =>
            navigate("/profile")
          }
        >
          👤 My Profile
        </button>

        <button
          className="sidebar-item"
          onClick={logout}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardSidebar;