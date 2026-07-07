function AdditionalInputs({
  data,
  onChange
}) {
  return (
    <>
      <div className="input-row">
        <label className="input-label">
          🗓Season
        </label>

        <select
          className="styled-select styled-input"
          value={data.season}
          onChange={(e) =>
            onChange(
              "season",
              e.target.value)}>

          <option value="">
            Select
          </option>
          <option>Kharif</option>
          <option>Rabi</option>
          <option>Zaid</option>
        </select>
      </div>

      <div className="input-row">
        <label className="input-label">
          🏔Soil Type
        </label>

        <select
          className="styled-input"
          value={data.soil_type}
          onChange={(e) =>
            onChange(
              "soil_type",
              e.target.value
            )
          }
        >
          <option value="">Select</option>
          <option value="alluvial">Loamy</option>
          <option value="black">Silt</option>
          <option value="red">Clay</option>
          <option value="laterite">Laterite</option>
          <option value="sandy">Sandy</option>
          {/* <option value="clay"></option> */}
        </select>
      </div>

      <div className="input-row">
        <label className="input-label">
          🟫Soil Color
        </label>

        <input
          className="styled-input"
          value={data.soil_color}
          placeholder="Color of soil"
          onChange={(e) =>
            onChange(
              "soil_color",
              e.target.value
            )
          }
        />
      </div>

      <div className="input-row">
        <label className="input-label">
          📐Area <span className="unit-tag">acres</span>
        </label>

        <input
          className="styled-input"
          value={data.area}
          placeholder="1–100"
          onChange={(e) =>
            onChange(
              "area",
              e.target.value
            )
          }
        />
      </div>
    </>
  );
}

export default AdditionalInputs;