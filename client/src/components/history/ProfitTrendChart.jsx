import {

    Chart as ChartJS,

    CategoryScale,

    LinearScale,

    PointElement,

    LineElement,

    Tooltip,

    Legend,

} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(

    CategoryScale,

    LinearScale,

    PointElement,

    LineElement,

    Tooltip,

    Legend

);

function ProfitTrendChart({

    history,

}) {

    // ==========================================
    // Only Harvested Crops
    // ==========================================

    const harvested = history

        .filter(

            (item) =>

                item.status === "harvested"

        )

        .sort(

            (a, b) =>

                new Date(a.createdAt) -

                new Date(b.createdAt)

        );

    // ==========================================

    const labels = harvested.map(

        (item) =>

            new Date(

                item.createdAt

            ).toLocaleDateString(

                "en-IN",

                {

                    month: "short",

                    year: "2-digit",

                }

            )

    );

    const profits = harvested.map(

        (item) =>

            item.profit || 0

    );

    // ==========================================

    const data = {

        labels,

        datasets: [

            {

                label: "Profit",

                data: profits,

                borderColor: "#2A9D8F",

                backgroundColor:

                    "rgba(42,157,143,.2)",

                pointBackgroundColor:

                    "#2A9D8F",

                pointRadius: 5,

                pointHoverRadius: 7,

                borderWidth: 3,

                fill: true,

                tension: .35,

            },

        ],

    };

    // ==========================================

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                display: false,

            },

            tooltip: {

                callbacks: {

                    label: (context) =>

                        `₹ ${context.raw.toLocaleString("en-IN")}`,

                },

            },

        },

        scales: {

            y: {

                beginAtZero: true,

                ticks: {

                    callback: (value) =>

                        `₹${value}`,

                },

            },

        },

    };

    return (

        <div className="card history-chart-card">

            <div className="card-title">

                📈 Profit Trend

            </div>

            <div className="card-sub">

                Profit earned from harvested crops

            </div>

            <div className="history-chart">

                {

                    harvested.length === 0 ? (

                        <div

                            className="chart-empty"

                        >

                            No harvested crops yet.

                        </div>

                    ) : (

                        <Line

                            data={data}

                            options={options}

                        />

                    )

                }

            </div>

        </div>

    );

}

export default ProfitTrendChart;