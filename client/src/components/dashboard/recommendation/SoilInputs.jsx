function SoilInputs({
  data,
  onChange
}) {
  return (
    <>
      <div className="input-row">
        <label className="input-label">
          ⚗️pH
        </label>

        <input
          className="styled-input"
          value={data.ph}
          placeholder="3.5–10"
          onChange={(e) =>
            onChange(
              "ph",
              e.target.value
            )
          }
        />
      </div>

      <div className="input-row">
        <label className="input-label">
          💧Moisture<span className="unit-tag">%</span>
        </label>

        <input
          className="styled-input"
          value={data.soil_moisture}
          placeholder="0–80"
          onChange={(e) =>
            onChange(
              "soil_moisture",
              e.target.value
            )
          }
        />
      </div>

      <div className="input-row">
        <label className="input-label">
          🌿Organic Carbon<span className="unit-tag">%</span>
        </label>

        <input
          className="styled-input"
          value={data.organic_carbon}
          placeholder="0.0-3.0"
          onChange={(e) =>
            onChange(
              "organic_carbon",
              e.target.value
            )
          }
        />
      </div>

      <div className="input-row">
        <label className="input-label">
          ⚡Electrical Conductivity<span className="unit-tag">dS/m</span>
        </label>

        <input
          className="styled-input"
          value={data.electrical_conductivity}
          placeholder="0.0-5.0"
          onChange={(e) =>
            onChange(
              "electrical_conductivity",
              e.target.value
            )
          }
        />
      </div>
    </>
  );
}

export default SoilInputs;