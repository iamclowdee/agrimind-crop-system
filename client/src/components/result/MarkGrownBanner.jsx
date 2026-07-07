import { useState } from "react";
import GrownModal from "../modals/GrownModal";

function MarkGrownBanner() {

    const [open, setOpen] =
        useState(false);

    return (
        <>
            <div className="alert alert-info">

                <div>
                    <strong>
                        Did you decide to
                        grow this crop?
                    </strong>
                </div>

                <button
                    className="btn-primary"
                    onClick={() =>
                        setOpen(true)
                    }
                >
                    ✅ Mark as Grown
                </button>

            </div>

            {open && (
                <GrownModal
                    onClose={() =>
                        setOpen(false)
                    }
                />
            )}
        </>
    );
}

export default MarkGrownBanner;