function AnalyticsSummary({

    analytics,

    totalPredictions,

}) {

    return (

        <div className="analytics-summary">

            <div className="summary-card">

                <div className="summary-icon">

                    💰

                </div>

                <div>

                    <div className="summary-label">

                        Total Investment

                    </div>

                    <div className="summary-value">

                        ₹{analytics.totalInvestment.toLocaleString("en-IN")}

                    </div>

                </div>

            </div>

            <div className="summary-card">

                <div className="summary-icon">

                    📈

                </div>

                <div>

                    <div className="summary-label">

                        Total Revenue

                    </div>

                    <div className="summary-value">

                        ₹{analytics.totalRevenue.toLocaleString("en-IN")}

                    </div>

                </div>

            </div>

            <div className="summary-card">

                <div className="summary-icon">

                    💵

                </div>

                <div>

                    <div className="summary-label">

                        Net Profit

                    </div>

                    <div

                        className={`summary-value ${

                            analytics.totalProfit >= 0

                                ? "profit-positive"

                                : "profit-negative"

                        }`}

                    >

                        ₹{analytics.totalProfit.toLocaleString("en-IN")}

                    </div>

                </div>

            </div>

            <div className="summary-card">

                <div className="summary-icon">

                    🌾

                </div>

                <div>

                    <div className="summary-label">

                        Total Crops

                    </div>

                    <div className="summary-value">

                        {totalPredictions}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AnalyticsSummary;