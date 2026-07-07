import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import './Navbar.css';

function Navbar() {

    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);  

    const [isDark, setIsDark] = useState(() => {
        return (
            localStorage.getItem("agrimind_theme") === "dark"
        );
    });
    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            isDark ? "dark" : "light"
        );
        localStorage.setItem(
            "agrimind_theme",
            isDark ? "dark" : "light"
        );
    }, [isDark]);
    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
    };

    const closeDropdown = () => {
    setIsDropdownOpen(false);
    };

    const openMobileSidebar = () => {
    setIsMobileOpen(true);
    };

    const closeMobileSidebar = () => {
    setIsMobileOpen(false);
    };

    const getInitials = (name) => {
    return name?.split(" ").map(word => word[0]).join("").toUpperCase();
    };

  const { user, logout, requireAuth } = useAuth();

  return (
    <>
      {/* <!-- NAV --> */}
    <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("/")}>
          <div className="nav-logo-icon">🌱</div> AgriMind
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="nav-link" onClick={() => navigate("/pricing")}>
            Pricing
          </button>
          <button className="nav-link" onClick={() => requireAuth("/dashboard")}>
            Dashboard
          </button>
          <button className="nav-link" onClick={() => requireAuth("/history")}>
            History
          </button>
          <button className="nav-link" onClick={() => requireAuth("/soil")}>
            Soil Health
          </button>
        </div>
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle dark mode">
            {isDark ? "☀️" : "🌙"}
        </button>
          {/* <!-- Guest buttons --> */}
          {!user && (
            <div className="nav-guest"
                style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "center"}}>
                <button
                    className="nav-link-auth"
                    onClick={() => navigate("/login")}>
                    Sign In
                </button>

                <button className="nav-cta"
                    onClick={() => navigate("/signup")}>
                    Get Started
                </button>
            </div>
        )}
          {/* <!-- Auth user --> */}
        {user && (
          <div className="avatar-wrap">
            <button className="user-avatar-nav"
              onClick={() =>toggleDropdown()}>{getInitials(user.name)}</button>
            {isDropdownOpen && (
            <div className="avatar-dropdown">
              <div className="avatar-dropdown-user">
                <div className="avatar-dropdown-name">{user?.name}</div>
                <div className="avatar-dropdown-email">{user?.email}</div>
              </div>

              <button className="dd-item"
                onClick={() => {
                  navigate("/profile");
                  closeDropdown();
                }}>
                👤 My Profile
              </button>

              <button className="dd-item"
                onClick={() => {
                        navigate("/settings");
                        closeDropdown();
                    }}>
                ⚙️ Settings
              </button>

              <button className="dd-item danger"
                onClick={() => {
                        logout();
                        closeDropdown();
                    }}>
                🚪 Logout
              </button>
            </div>
            )}
          </div>
        )}
          <button
            className="hamburger"
            onClick={openMobileSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
    </nav>

      {/* <!-- MOBILE SIDEBAR --> */}
      {isMobileOpen && (
        <div className="mobile-overlay"
            onClick={closeMobileSidebar}/>
      )}

      {isMobileOpen && (
        <div className="mobile-sidebar">

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px"
                }}>
                <div
                    style={{
                        fontWeight: 800,
                        fontSize: "15px",
                        color: "#fff"
                    }}>
                    🌱 AgriMind
                </div>

                <button
                    onClick={closeMobileSidebar}
                    style={{
                        background:
                            "rgba(255,255,255,.15)",
                        border: "none",
                        color: "#fff",
                        width: "28px",
                        height: "28px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px"
                    }}
                >
                    ✕
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px"
                }}>
                <button
                    className="sidebar-item"
                    onClick={() => {
                        navigate("/");
                        closeMobileSidebar();
                    }}>
                    <span className="icon">
                        🏠
                    </span>
                    Home
                </button>

                <button
                    className="sidebar-item"
                    onClick={() => {
                        navigate("/pricing");
                        closeMobileSidebar();
                    }}>
                    <span className="icon">
                        💰
                    </span>
                    Pricing
                </button>

                <button
                    className="sidebar-item"
                    onClick={() => {
                        requireAuth("/dashboard");
                        closeMobileSidebar();
                    }}>
                    <span className="icon">
                        📊
                    </span>
                    Dashboard
                </button>

                <button
                    className="sidebar-item"
                    onClick={() => {
                        requireAuth("/history");
                        closeMobileSidebar();
                    }}>
                    <span className="icon">
                        📅
                    </span>
                    Crop History
                </button>

                <button
                    className="sidebar-item"
                    onClick={() => {
                        requireAuth("/soil");
                        closeMobileSidebar();
                    }}>
                    <span className="icon">
                        🧪
                    </span>
                    Soil Health
                </button>

                <div
                    style={{
                        height: "1px",
                        background:
                            "rgba(255,255,255,.15)",
                        margin: "10px 0"
                    }}
                />

                {!user && (
                    <>
                        <button
                            className="sidebar-item"
                            onClick={() => {
                                navigate("/login");
                                closeMobileSidebar();
                            }}
                        >
                            <span className="icon">
                                🔑
                            </span>
                            Sign In
                        </button>

                        <button
                            className="sidebar-item"
                            onClick={() => {
                                navigate("/signup");
                                closeMobileSidebar();
                            }}
                        >
                            <span className="icon">
                                ✨
                            </span>
                            Get Started
                        </button>
                    </>
                )}

                {user && (
                    <button
                        className="sidebar-item"
                        onClick={() => {
                            logout();
                            closeMobileSidebar();
                        }}
                    >
                        <span className="icon">
                            🚪
                        </span>
                        Logout
                    </button>
                )}
            </div>

        </div>
    )}
    </>
  );
}

export default Navbar;