import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState("");

  const handleLogin = () => {
    const newErrors = {};

    if (!identifier.trim()) {
      newErrors.identifier =
        "Please enter your email or phone number.";
    }

    if (!password.trim()) {
      newErrors.password =
        "Please enter your password.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const result = login(
      identifier,
      password
    );

    if (!result.success) {
      setBanner(result.message);
    }
  };

  return (
    <>
    <Navbar />
    <div className="auth-page">
      <div className="auth-card fade-up">

        {/* Header */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              fontSize: "30px",
              marginBottom: "9px",
            }}
          >
            🌱
          </div>

          <div className="auth-title">
            Welcome back
          </div>

          <div className="auth-sub">
            Sign in to your AgriMind account
          </div>
        </div>

        {/* Email / Phone */}

        <div className="form-group">
          <label className="form-label">
            Email or Phone Number
          </label>

          <input
            className={`form-input ${
              errors.identifier
                ? "error"
                : ""
            }`}
            type="text"
            placeholder="email@example.com or 9876543210"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);

              setErrors((prev) => ({
                ...prev,
                identifier: "",
              }));

              setBanner("");
            }}/>

          {errors.identifier && (
            <div className="field-error show">
              {errors.identifier}
            </div>
          )}
        </div>

        {/* Password */}

        <div className="form-group">
          <label className="form-label">
            Password
          </label>

          <div className="form-input-wrap">
            <input
              className={`form-input ${
                errors.password
                  ? "error"
                  : ""
              }`}
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(
                  e.target.value
                );

                setErrors((prev) => ({
                  ...prev,
                  password: "",
                }));

                setBanner("");
              }}
            />

            <button
              type="button"
              className="pwd-toggle"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
            >
              {showPassword
                ? "🙈"
                : "👁"}
            </button>
          </div>

          {errors.password && (
            <div className="field-error show">
              {errors.password}
            </div>
          )}
        </div>

        {/* Login Error */}

        {banner && (
          <div className="alert alert-warning">
            ⚠️ {banner}
          </div>
        )}

        {/* Submit */}

        <button
          className="btn-full"
          onClick={handleLogin}>
          Sign In →
        </button>

        {/* Signup Link */}

        <div className="auth-switch">
          Don't have an account?{" "}
          <button
            type="button"
            style={{
              border: "none",
              background: "none",
              color: "var(--green)",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() =>
              navigate("/signup")
            }
          >
            Create one
          </button>
        </div>

      </div>
    </div>
    <Footer />
  </>
  );
}

export default Login;