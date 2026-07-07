import { useNavigate } from "react-router-dom";
import { downloadPredictionPDF } from "../../utils/pdfGenerator";
import { getCropInfo }from "../../utils/cropUtils";

import { deletePrediction } from "../../services/historyService";

function HistoryCard({

    prediction,

    onRevenue,

    onGrowing,

    refreshHistory,

}) {

    const navigate = useNavigate();

    const {

        _id,

        recommended_crop,

        confidence,

        createdAt,

        season,

        status,

        investment,

        revenue,

        profit,

        area,

        daysToHarvest,

        location,

    } = prediction;

    // ==========================================
    // Crop Emoji
    // ==========================================

    const crop = getCropInfo(recommended_crop);

    const emoji = crop.emoji;

    // ==========================================
    // Date
    // ==========================================

    const formattedDate =
        new Date(createdAt).toLocaleDateString(

            "en-IN",

            {

                day: "numeric",

                month: "short",

                year: "numeric",

            }

        );

    // ==========================================
    // Status Badge
    // ==========================================

    const getStatusClass = () => {

        switch (status) {

            case "growing":

                return "status-growing";

            case "harvested":

                return "status-harvested";

            default:

                return "status-predicted";

        }

    };

    // ==========================================
    // Delete Prediction
    // ==========================================

    const handleDelete = async () => {

        const confirmDelete = window.confirm(

            "Delete this prediction permanently?"

        );

        if (!confirmDelete) return;

        try {

            await deletePrediction(_id);

            refreshHistory();

        }

        catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Unable to delete prediction."

            );

        }

    };

    // ==========================================

    return (

        <div className="history-card">

            {/* LEFT */}

            <div className="history-left">

                <div className="crop-badge">

                    {emoji}

                </div>

                <div className="history-info">

                    <h3>

                        {recommended_crop}

                    </h3>

                    <div className="history-meta">

                        <span>

                            📍 {location || "Unknown"}

                        </span>

                        <span>

                            📅 {formattedDate}

                        </span>

                    </div>

                    <div className="history-meta">

                        <span>

                            🌦 {season}

                        </span>

                        <span>

                            🎯 {confidence}%

                        </span>

                    </div>

                    <div className="history-meta">

                        <span>

                            📐 {area || 0} Acres

                        </span>

                        <span>

                            🌾 {daysToHarvest || 0} Days

                        </span>

                    </div>

                </div>

            </div>

            {/* RIGHT */}

            <div className="history-right">

                <span

                    className={`status-badge ${getStatusClass()}`}

                >

                    {status}

                </span>

                <div className="money-grid">

                    <div>

                        <small>

                            Investment

                        </small>

                        <strong>

                            ₹{investment || 0}

                        </strong>

                    </div>

                    <div>

                        <small>

                            Revenue

                        </small>

                        <strong>

                            {

                                revenue !== null

                                    ? `₹${revenue}`

                                    : "--"

                            }

                        </strong>

                    </div>

                    <div>

                        <small>

                            Profit

                        </small>

                        <strong

                            className={

                                profit === null

                                    ? ""

                                    : profit >= 0

                                        ? "profit-positive"

                                        : "profit-negative"

                            }

                        >

                            {

                                profit === null

                                    ? "--"

                                    : `₹${profit}`

                            }

                        </strong>

                    </div>

                </div>

                <div className="history-actions">

                    {/* View */}

                    <button

                        className="btn-primary"

                        onClick={() =>

                            navigate(

                                "/result",

                                {

                                    state: {

                                        prediction,

                                    },

                                }

                            )

                        }

                    >

                        👁 View

                    </button>

                    {/* Growing */}

                    {

                        status === "predicted" && (

                            <button

                                className="btn-secondary"

                                onClick={() =>

                                    onGrowing(

                                        prediction

                                    )

                                }

                            >

                                🌱 Growing

                            </button>

                        )

                    }

                    {/* Revenue */}

                    {

                        status === "growing" && (

                            <button

                                className="btn-secondary"

                                onClick={() =>

                                    onRevenue(

                                        prediction

                                    )

                                }

                            >

                                💰 Revenue

                            </button>

                        )

                    }

                    {/* PDF (Coming Next) */}

                    <button

                        className="btn-secondary"
                        onClick={() =>
                            downloadPredictionPDF(
                                prediction
                            )
                        }
                    >📄 PDF
                    </button>

                    {/* Delete */}

                    <button

                        className="btn-ghost"

                        onClick={handleDelete}

                    >

                        🗑 Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default HistoryCard;