import { useAuth } from "../../context/useAuth";

function LogoutModal({
  onClose,
}) {
  const { logout } =
    useAuth();

  return (
    <div className="modal-bg">
      <div
        className="modal"
        style={{
          maxWidth: "340px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "36px",
            marginBottom: "12px",
          }}
        >
          🚪
        </div>

        <div className="modal-title">
          Log out of AgriMind?
        </div>

        <div className="modal-sub">
          Your data will remain saved.
        </div>

        <div className="modal-actions">
          <button
            className="btn-ghost"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn-danger"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;