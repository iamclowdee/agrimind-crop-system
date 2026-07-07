import { useState } from "react";
import { useAuth } from "../../context/useAuth";

import ProfileView from "../profile/ProfileView";
import ProfileEdit from "../profile/ProfileEdit";

import "../../pages/Profile.css";

function ProfileModal({ onClose }) {
  const { user } =
    useAuth();

  const [editing, setEditing] =
    useState(false);

  return (
    <div className="modal-bg">
      <div className="modal">

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
          }}
        >
          <h2>
            👤 My Profile
          </h2>

          <button
  className="btn-ghost"
  onClick={() => {
    console.log("clicked");
    onClose();
  }}
>
  ✕
</button>
        </div>

        {!editing ? (
          <ProfileView
            user={user}
            onEdit={() =>
              setEditing(true)
            }
          />
        ) : (
          <ProfileEdit
            user={user}
            onCancel={() =>
              setEditing(false)
            }
            onSave={(data) => {
              console.log(data);
              setEditing(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileModal;