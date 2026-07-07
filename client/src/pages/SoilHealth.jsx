import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import SoilEmpty from "../components/soil/SoilEmpty";
import SoilMetrics from "../components/soil/SoilMetrics";
import PHScaleCard from "../components/soil/PHScaleCard";
import SoilScoreCard from "../components/soil/SoilScoreCard";

import { getLatestPrediction } from "../services/predictionService";

import "./SoilHealth.css";

function SoilHealth() {

    const navigate = useNavigate();

    const [prediction, setPrediction] = useState(null);

    const [loading, setLoading] = useState(true);

    // ==========================================
    // Load Latest Prediction
    // ==========================================

    const loadLatestPrediction = async () => {

        try {

            const response = await getLatestPrediction();

            console.log("Latest Prediction:", response);

            setPrediction(response.prediction);

        }

        catch (error) {

            console.error("Unable to load prediction:", error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadLatestPrediction();

    }, []);

    // ==========================================
    // Loading State
    // ==========================================

    if (loading) {

        return (

            <div className="soil-loading">

                <h2>Loading Soil Health...</h2>

            </div>

        );

    }

    // ==========================================
    // Empty State
    // ==========================================

    if (!prediction) {

        return <SoilEmpty />;

    }

    // ==========================================
    // Page
    // ==========================================

    return (

        <div className="soil-page">

            <button

                className="back-button"

                onClick={() => navigate(-1)}

            >

                ← Back

            </button>

            <div className="soil-container">

                <div className="soil-header">

                    <h1>

                        🧪 Soil Health Analysis

                    </h1>

                    <p>

                        Latest soil analysis from your most recent crop prediction.

                    </p>

                </div>

                <div className="soil-grid">

                    <SoilMetrics

                        prediction={prediction}

                    />

                </div>

                <div className="dash-grid">

                    <PHScaleCard

                        prediction={prediction}

                    />

                    <SoilScoreCard

                        prediction={prediction}

                    />

                </div>

            </div>

        </div>

    );

}

export default SoilHealth;