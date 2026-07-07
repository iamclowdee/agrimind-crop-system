function SoilMetrics({ prediction }) {

    const nutrients = [

        {
            label: "Nitrogen (N)",
            value: prediction.nitrogen,
            status:
                prediction.nitrogen >= 80
                    ? "Optimal"
                    : prediction.nitrogen >= 40
                    ? "Moderate"
                    : "Low",
        },

        {
            label: "Phosphorus (P)",
            value: prediction.phosphorus,
            status:
                prediction.phosphorus >= 60
                    ? "Optimal"
                    : prediction.phosphorus >= 30
                    ? "Moderate"
                    : "Low",
        },

        {
            label: "Potassium (K)",
            value: prediction.potassium,
            status:
                prediction.potassium >= 80
                    ? "Optimal"
                    : prediction.potassium >= 40
                    ? "Moderate"
                    : "Low",
        },

        {
            label: "pH Level",
            value: prediction.ph,
            status:
                prediction.ph >= 6 &&
                prediction.ph <= 7.5
                    ? "Neutral"
                    : prediction.ph < 6
                    ? "Acidic"
                    : "Alkaline",
        },

        {
            label: "Humidity %",
            value: prediction.humidity,
            status:
                prediction.humidity >= 60
                    ? "Good"
                    : "Low",
        },

    ];

    return (

        <>

            {

                nutrients.map((item) => (

                    <div
                        key={item.label}
                        className="soil-card"
                    >

                        <div className="radial-wrap">

                            <div className="radial-center">

                                <div className="radial-val">

                                    {item.value}

                                </div>

                            </div>

                        </div>

                        <div className="nutrient-name">

                            {item.label}

                        </div>

                        <span
                            className={`nutrient-status ${
                                item.status === "Low"
                                    ? "status-low"
                                    : "status-good"
                            }`}
                        >

                            {item.status}

                        </span>

                    </div>

                ))

            }

        </>

    );

}

export default SoilMetrics;