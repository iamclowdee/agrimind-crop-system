import { FaArrowLeft } from "react-icons/fa";

function HistoryHeader({ onBack }) {

    return (

        <div className="history-header">

            <button

                className="btn-ghost"

                onClick={onBack}

            >

                <FaArrowLeft />

                <span>

                    Back

                </span>

            </button>

            <div className="history-title">

                <span className="history-icon">

                    📅

                </span>

                <h1>

                    Crop History

                </h1>

            </div>

        </div>

    );

}

export default HistoryHeader;