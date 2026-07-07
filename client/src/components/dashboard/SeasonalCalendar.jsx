function SeasonalCalendar() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(4,1fr)",
        gap: "8px"
      }}
    >

      <div className="season-card active">
        <div>KHARIF</div>
        <small>Jun-Oct</small>
        <div>🌾</div>
      </div>

      <div className="season-card">
        <div>RABI</div>
        <small>Nov-Mar</small>
        <div>🌿</div>
      </div>

      <div className="season-card">
        <div>ZAID</div>
        <small>Mar-Jun</small>
        <div>🥦</div>
      </div>

      <div className="season-card">
        <div>PERENNIAL</div>
        <small>Year round</small>
        <div>🌳</div>
      </div>

    </div>
  );
}

export default SeasonalCalendar;