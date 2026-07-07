import { useState } from "react";
import { updatePrediction } from "../../services/historyService";

function MarkGrownModal({

    prediction,

    onClose,

    refreshHistory,

}) {

    const [

        investment,

        setInvestment,

    ] = useState(

        prediction?.investment || ""

    );

    const [

        area,

        setArea,

    ] = useState(

        prediction?.area || ""

    );

    const [

        days,

        setDays,

    ] = useState(

        prediction?.daysToHarvest || ""

    );

    const [

        loading,

        setLoading,

    ] = useState(false);

    // ==========================================
    // Save
    // ==========================================

    const handleSave = async () => {

        if (

            !investment ||

            !area ||

            !days

        ) {

            alert(

                "Please fill all fields."

            );

            return;

        }

        try {

            setLoading(true);

            await updatePrediction(

                prediction._id,

                {

                    investment:

                        Number(investment),

                    area:

                        Number(area),

                    daysToHarvest:

                        Number(days),

                    status:

                        "growing",

                    plantedDate:

                        new Date(),

                }

            );

            await refreshHistory();

            onClose();

        }

        catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Unable to update crop."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal-card">

                <h2>

                    🌱 Mark as Growing

                </h2>

                <p>

                    <strong>

                        {

                            prediction.recommended_crop

                        }

                    </strong>

                </p>

                {/* Investment */}

                <div className="modal-group">

                    <label>

                        Investment (₹)

                    </label>

                    <input

                        type="number"

                        className="styled-input"

                        value={investment}

                        onChange={(e) =>

                            setInvestment(

                                e.target.value

                            )

                        }

                    />

                </div>

                {/* Area */}

                <div className="modal-group">

                    <label>

                        Area (Acres)

                    </label>

                    <input

                        type="number"

                        className="styled-input"

                        value={area}

                        onChange={(e) =>

                            setArea(

                                e.target.value

                            )

                        }

                    />

                </div>

                {/* Harvest */}

                <div className="modal-group">

                    <label>

                        Expected Harvest Days

                    </label>

                    <input

                        type="number"

                        className="styled-input"

                        value={days}

                        onChange={(e) =>

                            setDays(

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="modal-buttons">

                    <button

                        className="btn-ghost"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="btn-primary"

                        disabled={loading}

                        onClick={handleSave}

                    >

                        {

                            loading

                                ? "Saving..."

                                : "Save"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default MarkGrownModal;