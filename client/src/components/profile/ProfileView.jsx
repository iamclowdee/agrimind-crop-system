import "../../pages/Profile.css";

function ProfileView({
  user,
  onEdit,
}) {
  return (
    <>
      <div className="modal-section">

        <div className="profile-avatar">
          {user?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div
          className="profile-field"
        >
          <span>
            Full Name
          </span>

          <span>
            {user?.name}
          </span>
        </div>

        <div
          className="profile-field"
        >
          <span>
            Email
          </span>

          <span>
            {user?.email}
          </span>
        </div>

        <div
          className="profile-field"
        >
          <span>
            Phone
          </span>

          <span>
            {user?.phone}
          </span>
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={onEdit}
      >
        ✏️ Edit Profile
      </button>
    </>
  );
}

export default ProfileView;