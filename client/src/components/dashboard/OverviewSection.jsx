import SeasonalCalendar from "./SeasonalCalendar";

function OverviewSection() {
  return (
    <>
      <div className="alert alert-info">
        🌱 Welcome! Go to
        <strong>
          {" "}
          Crop Recommendation
        </strong>
        {" "}to get started.
      </div>

      <div className="card">

        <div className="card-title">
          📅 Seasonal Calendar
        </div>

        <div className="card-sub">
          Planting windows for your region
        </div>

        <SeasonalCalendar />

      </div>
    </>
  );
}

export default OverviewSection;