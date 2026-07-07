import {

    Chart as ChartJS,

    CategoryScale,

    LinearScale,

    BarElement,

    Tooltip,

    Legend,

} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(

    CategoryScale,

    LinearScale,

    BarElement,

    Tooltip,

    Legend

);

function CostRevenueChart({

    investment,

    revenue,

}) {

    const data = {

        labels: [

            "Investment",

            "Revenue",

        ],

        datasets: [

            {

                label: "Amount (₹)",

                data: [

                    investment,

                    revenue,

                ],

                backgroundColor: [

                    "#E76F51",

                    "#2A9D8F",

                ],

                borderRadius: 8,

                borderSkipped: false,

            },

        ],

    };

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

                💰 Cost vs Revenue

            </div>

            <div className="card-sub">

                Total investment compared to total revenue

            </div>

            <div className="history-chart">

                <Bar

                    data={data}

                    options={options}

                />

            </div>

        </div>

    );

}

export default CostRevenueChart;