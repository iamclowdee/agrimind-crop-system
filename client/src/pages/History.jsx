import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getPredictionHistory,
} from "../services/predictionService";

import HistoryHeader from "../components/history/HistoryHeader";
import EmptyHistory from "../components/history/EmptyHistory";
import HistoryToolbar from "../components/history/HistoryToolbar";
import HistoryCard from "../components/history/HistoryCard";
import RevenueModal from "../components/history/RevenueModal";
import MarkGrownModal from "../components/history/MarkGrownModal";
import CostRevenueChart from "../components/history/CostRevenueChart";
import ProfitTrendChart from "../components/history/ProfitTrendChart";
import AnalyticsSummary from "../components/history/AnalyticsSummary";

import "./History.css";

function History() {

    const navigate = useNavigate();

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedPrediction, setSelectedPrediction] =
        useState(null);

    const [showRevenueModal, setShowRevenueModal] =
        useState(false);

    const [showGrowingModal, setShowGrowingModal] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [filter, setFilter] =
        useState("all");

// ==========================================
// Fetch History
// ==========================================

const loadHistory = async () => {

    try {

        const response =
            await getPredictionHistory();

        setHistory(
            response.history || []
        );

    }

    catch (error) {

        console.error(error);

    }

    finally {

        setLoading(false);

    }

};

// ==========================================
// Load on Mount
// ==========================================

useEffect(() => {

    loadHistory();

}, []);

    // ==========================================
    // Search + Filter
    // ==========================================

    const filteredHistory = useMemo(() => {

        let data = [...history];

        if (search.trim()) {

            data = data.filter((item) =>

                item.recommended_crop

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    )

            );

        }

        if (filter !== "all") {

            data = data.filter(

                (item) =>

                    item.status === filter

            );

        }

        return data;

    }, [

        history,

        search,

        filter,

    ]);

    // ==========================================
    // Analytics
    // ==========================================

    const analytics = useMemo(() => {

        let totalInvestment = 0;

        let totalRevenue = 0;

        let totalProfit = 0;

        filteredHistory.forEach((item) => {

            totalInvestment +=

                item.investment || 0;

            totalRevenue +=

                item.revenue || 0;

            totalProfit +=

                item.profit || 0;

        });

        return {

            totalInvestment,

            totalRevenue,

            totalProfit,

        };

    }, [filteredHistory]);

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="history-loading">

                Loading...

            </div>

        );

    }

    // ==========================================
    // Page
    // ==========================================

    return (

        <div className="history-page">

            <HistoryHeader
                onBack={() =>
                    navigate(-1)
                }
            />

            {

                history.length === 0 ? (

                    <EmptyHistory />

                ) : (

                    <>

                        <HistoryToolbar

                            search={search}

                            setSearch={setSearch}

                            filter={filter}

                            setFilter={setFilter}

                            total={filteredHistory.length}

                        />

                        <AnalyticsSummary

                            analytics={analytics}

                            totalPredictions={filteredHistory.length}

                        />

                        <div className="history-analytics">

                            <h2>

                                📊 Analytics

                            </h2>

                            <div className="history-grid">

                                <CostRevenueChart

                                    investment={

                                        analytics.totalInvestment

                                    }

                                    revenue={

                                        analytics.totalRevenue

                                    }

                                />

                                <ProfitTrendChart

                                    history={

                                        filteredHistory

                                    }

                                />

                            </div>

                        </div>

                        <div className="history-list">

                            {

                                filteredHistory.map(

                                    (

                                        prediction

                                    ) => (

                                        <HistoryCard

                                            key={

                                                prediction._id

                                            }

                                            prediction={

                                                prediction

                                            }

                                            onView={() =>

                                                navigate(

                                                    "/result",

                                                    {

                                                        state: {

                                                            prediction,

                                                        },

                                                    }

                                                )

                                            }

                                            onRevenue={() => {

                                                setSelectedPrediction(

                                                    prediction

                                                );

                                                setShowRevenueModal(

                                                    true

                                                );

                                            }}

                                            onGrowing={() => {

                                                setSelectedPrediction(

                                                    prediction

                                                );

                                                setShowGrowingModal(

                                                    true

                                                );

                                            }}

                                            refreshHistory={

                                                loadHistory

                                            }

                                        />

                                    )

                                )

                            }

                        </div>

                    </>

                )

            }

            {

                showRevenueModal && (

                    <RevenueModal

                        prediction={

                            selectedPrediction

                        }

                        onClose={() =>

                            setShowRevenueModal(

                                false

                            )

                        }

                        refreshHistory={

                            loadHistory

                        }

                    />

                )

            }

            {

                showGrowingModal && (

                    <MarkGrownModal

                        prediction={

                            selectedPrediction

                        }

                        onClose={() =>

                            setShowGrowingModal(

                                false

                            )

                        }

                        refreshHistory={

                            loadHistory

                        }

                    />

                )

            }

        </div>

    );

}

export default History;