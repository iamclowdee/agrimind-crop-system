function ResultHero({ crop }) {

    return (
        <div className="result-hero">

            <div className="crop-emoji">
                {crop.emoji}
            </div>

            <div style={{ flex: 1 }}>

                <div className="crop-name">
                    {crop.name}
                </div>

                <div
                    style={{
                        marginTop: "10px"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between"
                        }}
                    >
                        <span>
                            Confidence
                        </span>

                        <span>
                            {crop.confidence}%
                        </span>
                    </div>

                    <div className="confidence-bar-bg">
                        <div
                            className="confidence-bar"
                            style={{
                                width:
                                    `${crop.confidence}%`
                            }}
                        />
                    </div>
                </div>

                <div className="season-pills">

                    <span className="season-pill">
                        🌱 {crop.season}
                    </span>

                    <span className="season-pill">
                        ☀️ {crop.seasonType}
                    </span>

                    <span className="season-pill">
                        ⏱ {crop.duration}
                    </span>

                </div>

            </div>

        </div>
    );
}

export default ResultHero;