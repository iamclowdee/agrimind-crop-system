import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute({ children }) {

    const { user, loading } = useAuth();

    // Wait until profile is loaded
    if (loading) {

        return (

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    fontSize: "18px",
                }}
            >
                Loading...
            </div>

        );

    }

    // Not logged in
    if (!user) {

        return <Navigate to="/login" replace />;

    }

    // Logged in
    return children;

}

export default ProtectedRoute;