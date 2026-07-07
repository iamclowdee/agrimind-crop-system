import { useNavigate } from "react-router-dom";
import ProfileModal from "../components/modals/ProfileModal";

function Profile() {

    const navigate = useNavigate();

  return (
    <>
        <ProfileModal
            onClose={() => navigate("/dashboard")}
        />
    </>
  );
}

export default Profile;