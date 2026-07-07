import { useNavigate, useLocation } from "react-router-dom";
import { useData } from "../context/DataContext";
import { downloadPredictionPDF } from "../utils/pdfGenerator";
import { getCropInfo } from "../utils/cropUtils";

import "../pages/Result.css";

function Result() {

    const navigate = useNavigate();

    const { result } = useData();

    const location = useLocation();

    const prediction = location.state?.prediction ||result;

    if (!prediction) {

        return (

            <div className="empty-state">

                <h2>No Recommendation Found</h2>

                <button

                    className="btn-primary"

                    onClick={() => navigate("/dashboard")}

                >

                    Back to Dashboard

                </button>

            </div>

        );

    }

    const crop = prediction ? getCropInfo( prediction.recommended_crop ) : null;

    return (

        <div className="result-container">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="result-header">

                <button

                    className="btn-ghost"

                    onClick={() => navigate("/dashboard")}

                >

                    ← Back

                </button>

                <h2>

                    🌾 Recommendation Result

                </h2>

            </div>

            {/* ==========================================
                HERO
            ========================================== */}

            <div className="result-hero fade-up">

                <div className="crop-emoji">

                    {crop?.emoji}

                </div>

                <div className="hero-content">

                    <div className="hero-label">

                        Best Crop Match

                    </div>

                    <div className="crop-name">

                        {prediction.recommended_crop}

                    </div>

                    <div className="confidence-header">

                        <span>

                            Confidence

                        </span>

                        <span>

                            {prediction.confidence}%

                        </span>

                    </div>

                    <div className="confidence-bar-bg">

                        <div

                            className="confidence-bar"

                            style={{

                                width: `${prediction.confidence}%`

                            }}

                        />

                    </div>

                    <div className="season-pills">

                        <span className="season-pill">

                            🌱 {crop?.season}

                        </span>

                        <span className="season-pill">

                            📅 {crop?.seasonMonths}

                        </span>

                        <span className="season-pill">

                            ⏱ {crop?.duration} Days

                        </span>

                    </div>

                </div>

            </div>

            {/* ==========================================
                GRID
            ========================================== */}

            <div className="dash-grid">

                {/* Maintenance */}

                <div className="card">

                    <div className="card-title">

                        🌿 Maintenance Tips

                    </div>

                    <div className="card-sub">

                        Best practices for growing this crop

                    </div>

                    <ul className="tip-list">

                        {

                            crop?.tips.map(

                                (tip, index) => (

                                    <li

                                        key={index}

                                        className="tip-item"

                                    >

                                        ✅ {tip}

                                    </li>

                                )

                            )

                        }

                    </ul>

                </div>

                {/* Fertilizers */}

                <div className="card">

                    <div className="card-title">

                        🧪 Recommended Fertilizers

                    </div>

                    <div className="card-sub">

                        Suitable fertilizers

                    </div>

                    <ul className="tip-list">

                        {

                            crop?.fertilizers.map(

                                (item, index) => (

                                    <li

                                        key={index}

                                        className="tip-item"

                                    >

                                        🌱 {item}

                                    </li>

                                )

                            )

                        }

                    </ul>

                </div>

            </div>

            {/* ==========================================
                TOP RECOMMENDATIONS
            ========================================== */}

            <div className="card">

                <div className="card-title">

                    🏆 Top Recommendations

                </div>

                <div className="card-sub">

                    Ranked by confidence

                </div>

                <table className="prediction-table">

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>Crop</th>

                            <th>Confidence</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            prediction.top_recommendations?.map(

                                (

                                    item,

                                    index

                                ) => (

                                    <tr

                                        key={index}

                                    >

                                        <td>

                                            {index + 1}

                                        </td>

                                        <td>

                                            {item.crop}

                                        </td>

                                        <td>

                                            {item.probability}%

                                        </td>

                                    </tr>

                                )

                            )

                        }

                    </tbody>

                </table>

            </div>

            {/* ==========================================
                PREDICTION SUMMARY
            ========================================== */}

            <div className="card">

                <div className="card-title">

                    📊 Prediction Summary

                </div>

                <div className="card-sub">

                    Based on your soil inputs

                </div>

                <div className="summary-grid">

                    <div>

                        <strong>📍 Location</strong>

                        <p>{prediction.location || "-"}</p>

                    </div>

                    <div>

                        <strong>🌦 Season</strong>

                        <p>{prediction.season}</p>

                    </div>

                    <div>

                        <strong>⚗ pH</strong>

                        <p>{prediction.ph}</p>

                    </div>

                    <div>

                        <strong>🌡 Temperature</strong>

                        <p>{prediction.temperature}°C</p>

                    </div>

                    <div>

                        <strong>💧 Humidity</strong>

                        <p>{prediction.humidity}%</p>

                    </div>

                    <div>

                        <strong>🌧 Rainfall</strong>

                        <p>{prediction.rainfall} mm</p>

                    </div>

                </div>

            </div>

            {/* ==========================================
                ACTIONS
            ========================================== */}

            <div className="result-actions">

                <button

                    className="btn-primary"

                    onClick={() =>

                        navigate("/history")

                    }

                >

                    📜 Prediction History

                </button>

                <button

                    className="btn-secondary"

                    onClick={() =>

                        navigate("/dashboard")

                    }

                >

                    🔄 Predict Again

                </button>

                <button

                    className="btn-secondary"

                    onClick={() =>

                        downloadPredictionPDF({
                            ...prediction,
                            cropInfo: crop,
                        })
                    }>
                    📄 Download Report

                </button>

            </div>

        </div>

    );

}

export default Result;