function HistoryAnalytics() {
  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <h3>
        📊 Analytics
      </h3>

      <div className="dash-grid">
        <div className="card">
          <div className="card-title">
            💰 Cost vs Revenue
          </div>

          <div className="card-sub">
            Investment vs Revenue
          </div>

          <div
            style={{
              height: "190px",
            }}
          >
            Chart.js here
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            📈 Profit Trend
          </div>

          <div className="card-sub">
            Net Profit
          </div>

          <div
            style={{
              height: "190px",
            }}
          >
            Chart.js here
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryAnalytics;