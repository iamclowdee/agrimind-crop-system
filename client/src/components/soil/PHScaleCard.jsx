function PHScaleCard({ prediction }) {

    const ph = prediction.ph;

    const pct = (ph / 14) * 100;

    const isGood = ph >= 6 && ph <= 7.5;

    const getPHStatus = () => {

        if (ph < 6) {

            return "⚠️ Acidic Soil";

        }

        if (ph > 7.5) {

            return "⚠️ Alkaline Soil";

        }

        return "✅ Good for most crops";

    };

    return (

        <div className="card">

            <div className="card-title">

                ⚗️ pH Scale

            </div>

            <div className="card-sub">

                Your soil pH compared with the ideal range

            </div>

            <div style={{ marginTop: "18px" }}>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "11px",
                        color: "var(--text3)",
                        marginBottom: "6px",
                    }}
                >

                    <span>Acidic (0)</span>

                    <span>Neutral (7)</span>

                    <span>Alkaline (14)</span>

                </div>

                <div
                    style={{
                        position: "relative",
                        height: "22px",
                        borderRadius: "10px",
                        background:
                            "linear-gradient(90deg,#E63946,#F4A261,#2A9D8F,#264653)",
                    }}
                >

                    <div
                        style={{
                            position: "absolute",
                            left: `calc(${pct}% - 7px)`,
                            top: "-3px",
                            width: "14px",
                            height: "28px",
                            borderRadius: "4px",
                            background: "var(--text)",
                            border: "3px solid white",
                            boxShadow: "0 2px 8px rgba(0,0,0,.2)",
                        }}
                    />

                </div>

                <div
                    style={{
                        marginTop: "14px",
                        textAlign: "center",
                        fontSize: "14px",
                        color: "var(--text2)",
                    }}
                >

                    pH:&nbsp;

                    <strong>

                        {ph}

                    </strong>

                </div>

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "8px",
                        fontWeight: 600,
                        color: isGood
                            ? "var(--green)"
                            : "var(--orange)",
                    }}
                >

                    {getPHStatus()}

                </div>

            </div>

        </div>

    );

}

export default PHScaleCard;