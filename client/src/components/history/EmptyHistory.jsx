import { useNavigate } from "react-router-dom";

function EmptyHistory() {

    const navigate = useNavigate();

    return (

        <div className="history-empty card">

            <div className="history-empty-icon">

                🌱

            </div>

            <h2>

                No crop history yet

            </h2>

            <p>

                Get a crop recommendation and mark it as grown
                to build your farming history and unlock
                analytics.

            </p>

            <button

                className="btn-primary"

                onClick={() =>
                    navigate("/dashboard")
                }

            >

                🌾 Get Recommendation

            </button>

        </div>

    );

}

export default EmptyHistory;