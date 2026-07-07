import { useState } from "react";
import { useData } from "../../context/DataContext";

function GrownModal({ onClose }) {

    const { result, history, setHistory } =
        useData();

    const [investment, setInvestment] =
        useState("");

    const [area, setArea] =
        useState("");

    const [days, setDays] =
        useState("");

    const save = () => {

        const entry = {
            id: Date.now(),
            name: result.crop.name,
            emoji: result.crop.emoji,
            seasonType:
                result.crop.seasonType,
            investment:
                Number(investment),
            area:
                Number(area),
            days:
                Number(days),
            revenue: null,
            completed: false
        };

        setHistory([
            entry,
            ...history
        ]);

        onClose();
    };

    return (
        <div className="modal-overlay">

            <div className="modal">

                <h2>
                    Mark Crop as Grown
                </h2>

                <input
                    className="styled-input"
                    placeholder="Investment"
                    value={investment}
                    onChange={(e) =>
                        setInvestment(
                            e.target.value
                        )
                    }
                />

                <input
                    className="styled-input"
                    placeholder="Area"
                    value={area}
                    onChange={(e) =>
                        setArea(
                            e.target.value
                        )
                    }
                />

                <input
                    className="styled-input"
                    placeholder="Days"
                    value={days}
                    onChange={(e) =>
                        setDays(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn-primary"
                    onClick={save}
                >
                    Save
                </button>

            </div>

        </div>
    );
}

export default GrownModal;