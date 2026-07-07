import { useAuth } from "../../context/useAuth";
import "../../pages/Dashboard.css";
function DashboardTopbar() {
  const { user } = useAuth();

  return (
    <div className="dash-topbar">
      <div>
        <div className="dash-welcome">
          Good morning,
          <span>
            {" "}
            {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "Farmer"}!
          </span>
        </div>

        <div className="dash-sub">
          📋 Fill the recommendation form
        </div>
      </div>

      <div className="topbar-right">
        <div className="notif-btn">
          🔔
          <div className="notif-dot" />
        </div>

        <div className="user-avatar-dash">
          {user?.name
            ?.split(" ")
            .map((w) => w[0])
            .join("")}
        </div>
      </div>
    </div>
  );
}

export default DashboardTopbar;