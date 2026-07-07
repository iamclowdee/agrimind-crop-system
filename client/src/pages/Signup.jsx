import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();

  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [banner, setBanner] =
    useState("");

  const getPasswordStrength = () => {
    const pwd = formData.password;

    let score = 0;

    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    return score;
  };

  const getStrengthLabel = () => {
    const score = getPasswordStrength();

    if (score <= 1) return "Weak";
    if (score === 2) return "Fair";
    if (score === 3) return "Good";
    return "Strong";
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));

    setBanner("");
  };

  const handleSignup = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Please enter your full name.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email.";
    }

    if (
      !/^[6-9]\d{9}$/.test(
        formData.phone
      )
    ) {
      newErrors.phone =
        "Enter a valid Indian phone number.";
    }

    if (
      formData.password.length < 8
    ) {
      newErrors.password =
        "Password must be at least 8 characters.";
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(newErrors);

    if (
      Object.keys(newErrors).length > 0
    ) {
      return;
    }

    const result = signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    if (!result.success) {
      setBanner(result.message);
    }
  };

  const strength = getPasswordStrength();

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
            Create your account
          </div>

          <div className="auth-sub">
            Start farming smarter with AgriMind
          </div>
        </div>

        {/* Name */}

        <div className="form-group">
          <label className="form-label">
            Full Name
          </label>

          <input
            className={`form-input ${
              errors.name
                ? "error"
                : ""
            }`}
            type="text"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && (
            <div className="field-error show">
              {errors.name}
            </div>
          )}
        </div>

        {/* Email */}

        <div className="form-group">
          <label className="form-label">
            Email Address
          </label>

          <input
            className={`form-input ${
              errors.email
                ? "error"
                : ""
            }`}
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <div className="field-error show">
              {errors.email}
            </div>
          )}
        </div>

        {/* Phone */}

        <div className="form-group">
          <label className="form-label">
            Phone Number
          </label>

          <input
            className={`form-input ${
              errors.phone
                ? "error"
                : ""
            }`}
            type="tel"
            maxLength={10}
            name="phone"
            placeholder="10-digit Indian number"
            value={formData.phone}
            onChange={handleChange}
          />

          {errors.phone && (
            <div className="field-error show">
              {errors.phone}
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
              name="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="button"
              className="pwd-toggle"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword
                ? "🙈"
                : "👁"}
            </button>
          </div>

          {formData.password && (
            <div className="pwd-strength">
              <div className="pwd-strength-bars">

                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`pwd-bar ${
                      strength >= bar
                        ? strength === 1
                          ? "weak"
                          : strength === 2
                          ? "fair"
                          : strength === 3
                          ? "good"
                          : "strong"
                        : ""
                    }`}
                  />
                ))}
              </div>

              <div className="pwd-strength-label">
                {getStrengthLabel()}
              </div>
            </div>
          )}

          {errors.password && (
            <div className="field-error show">
              {errors.password}
            </div>
          )}
        </div>

        {/* Confirm Password */}

        <div className="form-group">
          <label className="form-label">
            Confirm Password
          </label>

          <div className="form-input-wrap">
            <input
              className={`form-input ${
                errors.confirmPassword
                  ? "error"
                  : ""
              }`}
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
            />

            <button
              type="button"
              className="pwd-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword
                ? "🙈"
                : "👁"}
            </button>
          </div>

          {errors.confirmPassword && (
            <div className="field-error show">
              {errors.confirmPassword}
            </div>
          )}
        </div>

        {/* Banner */}

        {banner && (
          <div className="alert alert-warning">
            ⚠️ {banner}
          </div>
        )}

        {/* Submit */}

        <button
          className="btn-full"
          onClick={handleSignup}
        >
          Create Account →
        </button>

        {/* Switch */}

        <div className="auth-switch">
          Already have an account?{" "}
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
              navigate("/login")
            }
          >
            Sign In
          </button>
        </div>

      </div>
    </div>
    <Footer />
  </>
  );
}

export default Signup;