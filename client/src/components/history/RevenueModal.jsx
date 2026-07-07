import { useState } from "react";

import { updatePrediction }

from "../../services/historyService";

function RevenueModal({

    prediction,

    onClose,

    refreshHistory,

}) {

    const [

        revenue,

        setRevenue,

    ] = useState(

        prediction?.revenue || ""

    );

    const [

        loading,

        setLoading,

    ] = useState(false);

    // ==========================================

    const handleSave = async () => {

        if (!revenue) {

            alert(

                "Please enter revenue."

            );

            return;

        }

        try {

            setLoading(true);

            await updatePrediction(

                prediction._id,

                {

                    revenue:

                        Number(revenue),

                    status:

                        "harvested",

                    harvestedDate:

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

                "Unable to update revenue."

            );

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================================

    return (

        <div className="modal-overlay">

            <div className="modal-card">

                <h2>

                    💰 Update Revenue

                </h2>

                <p>

                    <strong>

                        {

                            prediction.recommended_crop

                        }

                    </strong>

                </p>

                <div className="modal-group">

                    <label>

                        Revenue (₹)

                    </label>

                    <input

                        type="number"

                        className="styled-input"

                        value={revenue}

                        onChange={(e) =>

                            setRevenue(

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

export default RevenueModal;