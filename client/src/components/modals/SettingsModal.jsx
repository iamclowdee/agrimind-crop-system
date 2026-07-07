import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsModal.css";

function SettingsModal() {

    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [chatbot, setChatbot] = useState(true);

    return (

        <div className="modal-bg">

            <div
                className="modal"
                style={{
                    maxWidth: "500px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
            >

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                    }}
                >

                    <div style={{ fontSize: "40px" }}>
                        ⚙️
                    </div>

                    <div className="modal-title">
                        Settings
                    </div>

                    <p
                        style={{
                            color: "var(--text3)",
                            marginTop: "6px",
                        }}
                    >
                        Personalize your AgriMind experience.
                    </p>

                </div>

                {/* Appearance */}

                <div className="settings-section">

                    <h4>🎨 Appearance</h4>

                    <label className="setting-row">

                        <span>Dark Mode</span>

                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() =>
                                setDarkMode(!darkMode)
                            }
                        />

                    </label>

                </div>

                {/* Notifications */}

                <div className="settings-section">

                    <h4>🔔 Notifications</h4>

                    <label className="setting-row">

                        <span>Enable Notifications</span>

                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={() =>
                                setNotifications(!notifications)
                            }
                        />

                    </label>

                </div>

                {/* AI */}

                <div className="settings-section">

                    <h4>🤖 AI Assistant</h4>

                    <label className="setting-row">

                        <span>Enable Chatbot</span>

                        <input
                            type="checkbox"
                            checked={chatbot}
                            onChange={() =>
                                setChatbot(!chatbot)
                            }
                        />

                    </label>

                </div>

                {/* Units */}

                <div className="settings-section">

                    <h4>📏 Units</h4>

                    <label className="setting-row">

                        <span>Area Unit</span>

                        <select>

                            <option>Acres</option>

                            <option>Hectares</option>

                        </select>

                    </label>

                    <label className="setting-row">

                        <span>Temperature</span>

                        <select>

                            <option>°C</option>

                            <option>°F</option>

                        </select>

                    </label>

                </div>

                {/* Account */}

                <div className="settings-section">

                    <h4>👤 Account</h4>

                    <button className="btn-secondary">
                        Edit Profile
                    </button>

                    <button
                        className="btn-secondary"
                        style={{ marginLeft: "10px" }}
                    >
                        Change Password
                    </button>

                </div>

                <button
                    className="btn-full"
                    style={{ marginTop: "20px" }}
                    onClick={() => navigate(-1)}
                >
                    Save & Close
                </button>

            </div>

        </div>

    );

}

export default SettingsModal;