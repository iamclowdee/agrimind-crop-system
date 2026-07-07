import { useState } from "react";
import "../../pages/Profile.css";
function ProfileEdit({
  user,
  onSave,
  onCancel,
}) {
  const [name, setName] =
    useState(user.name);

  const [phone, setPhone] =
    useState(user.phone);

  const [farm, setFarm] =
    useState(user.farm || "");

  const [location, setLocation] =
    useState(
      user.location || ""
    );

  const [land, setLand] =
    useState(user.land || "");

  return (
    <>
      <div className="form-group">
        <label>
          Full Name
        </label>

        <input
          className="form-input"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />
      </div>

      <div className="form-group">
        <label>
          Phone
        </label>

        <input
          className="form-input"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
        />
      </div>

      <div className="form-group">
        <label>
          Farm Name
        </label>

        <input
          className="form-input"
          value={farm}
          onChange={(e) =>
            setFarm(
              e.target.value
            )
          }
        />
      </div>

      <div className="form-group">
        <label>
          Location
        </label>

        <input
          className="form-input"
          value={location}
          onChange={(e) =>
            setLocation(
              e.target.value
            )
          }
        />
      </div>

      <div className="form-group">
        <label>
          Land
        </label>

        <input
          className="form-input"
          value={land}
          onChange={(e) =>
            setLand(
              e.target.value
            )
          }
        />
      </div>

      <div className="modal-actions">
        <button
          className="btn-ghost"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          className="btn-primary"
          onClick={() =>
            onSave({
              name,
              phone,
              farm,
              location,
              land,
            })
          }
        >
          Save Changes
        </button>
      </div>
    </>
  );
}

export default ProfileEdit;