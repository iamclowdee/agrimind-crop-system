function NutrientInputs({
  data,
  onChange
}) {
  return (
    <>
      <div className="input-row">
        <label className="input-label">
          🟫Nitrogen<span className="unit-tag">kg/ha</span>
        </label>

        <input
          className="styled-input"
          type="number"
          value={data.nitrogen}
          placeholder="0–200"
          onChange={(e) =>
            onChange(
              "nitrogen",
              e.target.value
            )
          }
        />
      </div>

      <div className="input-row">
        <label className="input-label">
          🟤Phosphorus <span className="unit-tag">kg/ha</span>
        </label>

        <input
          className="styled-input"
          type="number"
          value={data.phosphorus}
          placeholder="0-100"
          onChange={(e) =>
            onChange(
              "phosphorus",
              e.target.value
            )
          }
        />
      </div>

      <div className="input-row">
        <label className="input-label">
          🟡Potassium<span className="unit-tag">kg/ha</span>
        </label>

        <input
          className="styled-input"
          type="number"
          value={data.potassium}
          placeholder="0–205"
          onChange={(e) =>
            onChange(
              "potassium",
              e.target.value
            )
          }
        />
      </div>
    </>
  );
}

export default NutrientInputs;