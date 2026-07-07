import "../../pages/Dashboard.css";

import { useData } from "../../context/DataContext";
import { downloadPredictionPDF } from "../../utils/pdfGenerator";
import { getCropInfo } from "../../utils/cropUtils";

function ReportSection() {

    const { result } = useData();
    const crop = result ? getCropInfo(result.recommended_crop): null;

    // Backend response structure
    const prediction = result?.prediction;

    return (

        <div className="card">

            <div className="card-title">

                📄 PDF Report

            </div>

            <div className="card-sub">

                Download your latest crop recommendation report

            </div>

            {

                !prediction ? (

                    <div className="empty-state">

                        <div className="empty-icon">

                            📄

                        </div>

                        <div className="empty-title">

                            No report available

                        </div>

                        <div className="empty-sub">

                            Get a crop recommendation to generate a PDF report.

                        </div>

                    </div>

                ) : (

                    <div className="report-card">

                        <div className="report-info">

                            <div className="report-icon">

                                {crop ? crop.emoji : "🌾"}

                            </div>

                            <div>

                                <h4>

                                    {prediction.recommended_crop}

                                </h4>

                                <p>

                                    Confidence: {prediction.confidence}%

                                </p>

                                <small>

                                    {new Date(

                                        prediction.createdAt

                                    ).toLocaleDateString(

                                        "en-IN",

                                        {

                                            day: "numeric",

                                            month: "long",

                                            year: "numeric",

                                        }

                                    )}

                                </small>

                            </div>

                        </div>

                        <button

                            className="btn-primary"

                            style={{

                                width: "100%",

                                marginTop: "18px",

                            }}

                            onClick={() =>

                                downloadPredictionPDF(

                                    prediction

                                )

                            }

                        >

                            📥 Download PDF

                        </button>

                    </div>

                )

            }

        </div>

    );

}

export default ReportSection;