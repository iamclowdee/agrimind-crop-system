function EnvironmentalInputs({
  data,
  onChange
}) {
  return (
    <>
      <div className="input-row">
        <label className="input-label">
          🌡Temperature<span className="unit-tag">°C</span>
        </label>

        <input
          className="styled-input"
          type="number"
          value={data.temperature}
          placeholder="8–44"
          onChange={(e) =>
            onChange(
              "temperature",
              e.target.value
            )
          }
        />
      </div>

      <div className="input-row">
        <label className="input-label">
          💧Humidity<span className="unit-tag">%</span>
        </label>

        <input
          className="styled-input"
          type="number"
          value={data.humidity}
          placeholder="14–100"
          onChange={(e) =>
            onChange(
              "humidity",
              e.target.value
            )
          }
        />
      </div>

      <div className="input-row">
        <label className="input-label">
          🌧Rainfall<span className="unit-tag">mm</span>
        </label>

        <input
          className="styled-input"
          type="number"
          value={data.rainfall}
          placeholder="200-2000"
          onChange={(e) =>
            onChange(
              "rainfall",
              e.target.value
            )
          }
        />
      </div>
    </>
  );
}

export default EnvironmentalInputs;