import { useData } from "../../context/DataContext";

function SoilSuitability() {

    const { soilData } = useData();

    const score = 78;

    return (
        <div className="card">

            <div className="card-title">
                🧪 Soil Suitability
            </div>

            <div className="card-sub">
                Soil Match
            </div>

            <div
                style={{
                    textAlign: "center"
                }}
            >
                <h1>{score}</h1>

                <p>out of 100</p>
            </div>

        </div>
    );
}

export default SoilSuitability;