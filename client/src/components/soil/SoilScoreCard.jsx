import { calcSoilScore } from "../../utils/calcSoilScore";

function SoilScoreCard({ prediction }) {

    const score = calcSoilScore(prediction);

    const getCondition = () => {

        if (score >= 85) {

            return {
                text: "Excellent",
                color: "var(--green)",
                background: "rgba(82,183,136,.15)"
            };

        }

        if (score >= 70) {

            return {
                text: "Good",
                color: "var(--green)",
                background: "rgba(82,183,136,.12)"
            };

        }

        if (score >= 50) {

            return {
                text: "Average",
                color: "var(--orange)",
                background: "rgba(224,122,47,.15)"
            };

        }

        return {

            text: "Poor",
            color: "#d62828",
            background: "rgba(214,40,40,.12)"

        };

    };

    const condition = getCondition();

    return (

        <div className="card">

            <div className="card-title">

                📊 Soil Quality Score

            </div>

            <div className="card-sub">

                Overall soil health assessment

            </div>

            <div
                style={{
                    textAlign: "center",
                    margin: "20px 0"
                }}
            >

                <div
                    style={{
                        fontSize: "44px",
                        fontWeight: 800,
                        color: condition.color,
                    }}
                >

                    {score}

                </div>

                <div
                    style={{
                        fontSize: "12px",
                        color: "var(--text3)"
                    }}
                >

                    out of 100

                </div>

                <div
                    style={{
                        display: "inline-block",
                        marginTop: "12px",
                        padding: "6px 14px",
                        borderRadius: "50px",
                        background: condition.background,
                        color: condition.color,
                        fontWeight: 700,
                        fontSize: "12px",
                    }}
                >

                    {condition.text}

                </div>

            </div>

            {/* Nitrogen */}

            <div className="prog-row">

                <div className="prog-label">

                    Nitrogen

                </div>

                <div className="prog-bg">

                    <div
                        className="prog-fill"
                        style={{
                            width: `${Math.min((prediction.nitrogen / 140) * 100, 100)}%`
                        }}
                    />

                </div>

                <div className="prog-val">

                    {prediction.nitrogen}

                </div>

            </div>

            {/* Phosphorus */}

            <div className="prog-row">

                <div className="prog-label">

                    Phosphorus

                </div>

                <div className="prog-bg">

                    <div
                        className="prog-fill"
                        style={{
                            width: `${Math.min((prediction.phosphorus / 145) * 100, 100)}%`
                        }}
                    />

                </div>

                <div className="prog-val">

                    {prediction.phosphorus}

                </div>

            </div>

            {/* Potassium */}

            <div className="prog-row">

                <div className="prog-label">

                    Potassium

                </div>

                <div className="prog-bg">

                    <div
                        className="prog-fill"
                        style={{
                            width: `${Math.min((prediction.potassium / 205) * 100, 100)}%`
                        }}
                    />

                </div>

                <div className="prog-val">

                    {prediction.potassium}

                </div>

            </div>

        </div>

    );

}

export default SoilScoreCard;