import { useNavigate } from "react-router-dom";
function SettingsModal() {
  const navigate = useNavigate();
  return (
    <div className="modal-bg">
      <div
        className="modal"
        style={{
          maxWidth: "360px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "36px",
          }}
        >
          ⚙️
        </div>

        <div className="modal-title">
          Settings
        </div>

        <div
          style={{
            margin: "20px 0",
          }}
        >
          Settings are coming soon! Backend integration will unlock notification preferences, unit settings, and more.
        </div>

        <button
          className="btn-full"
          onClick={() => {navigate(-1)}}
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;