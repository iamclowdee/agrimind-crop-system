import { useNavigate } from "react-router-dom";

function SoilEmpty() {
  const navigate = useNavigate();

  return (
    <div className="soil-card text-center">
      <div
        style={{
          fontSize: "44px",
          opacity: ".4",
          marginBottom: "12px",
        }}
      >
        🧪
      </div>

      <div className="empty-title">
        No soil data yet
      </div>

      <div className="empty-sub">
        Submit the recommendation form to
        see soil health analysis.
      </div>

      <button
        className="btn-primary"
        style={{
          marginTop: "18px",
        }}
        onClick={() =>
          navigate("/dashboard")
        }
      >
        Fill the Form
      </button>
    </div>
  );
}

export default SoilEmpty;