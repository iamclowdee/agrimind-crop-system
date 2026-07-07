// ======================================================
// AGRIMIND CROP DATABASE
// ======================================================

export const cropInfo = {

    Rice: {

        emoji: "🌾",

        duration: 120,

        season: "Kharif",

        seasonMonths: "June - October",

        fertilizers: [

            "Urea",

            "DAP",

            "MOP",

            "Zinc Sulphate",

        ],

        tips: [

            "Maintain standing water during vegetative growth.",

            "Control weeds during the first 40 days.",

            "Monitor for stem borer and leaf folder.",

            "Apply nitrogen in split doses.",

            "Harvest when 80–85% grains become golden.",

        ],

    },

    Wheat: {

        emoji: "🌿",

        duration: 140,

        season: "Rabi",

        seasonMonths: "November - April",

        fertilizers: [

            "Urea",

            "DAP",

            "MOP",

        ],

        tips: [

            "Provide timely irrigation during tillering.",

            "Avoid waterlogging.",

            "Monitor for rust disease.",

            "Apply nitrogen in two split doses.",

            "Harvest when grains become hard.",

        ],

    },

    Maize: {

        emoji: "🌽",

        duration: 95,

        season: "Kharif",

        seasonMonths: "June - September",

        fertilizers: [

            "Urea",

            "DAP",

            "MOP",

        ],

        tips: [

            "Maintain proper spacing.",

            "Control weeds early.",

            "Protect against fall armyworm.",

            "Ensure adequate irrigation during flowering.",

            "Harvest when kernels harden.",

        ],

    },

    Cotton: {

        emoji: "☁️",

        duration: 180,

        season: "Kharif",

        seasonMonths: "May - November",

        fertilizers: [

            "NPK",

            "Urea",

            "Potash",

        ],

        tips: [

            "Avoid excess nitrogen.",

            "Monitor bollworm regularly.",

            "Maintain proper plant spacing.",

            "Irrigate during flowering.",

            "Pick mature bolls regularly.",

        ],

    },

    Sugarcane: {

        emoji: "🎋",

        duration: 365,

        season: "Annual",

        seasonMonths: "Year Round",

        fertilizers: [

            "Urea",

            "DAP",

            "Potash",

        ],

        tips: [

            "Maintain adequate irrigation.",

            "Earth up regularly.",

            "Control borers.",

            "Remove dry leaves periodically.",

            "Harvest after 10–12 months.",

        ],

    },

    Banana: {

        emoji: "🍌",

        duration: 300,

        season: "Year Round",

        seasonMonths: "Any Time",

        fertilizers: [

            "NPK",

            "Organic Compost",

            "Potash",

        ],

        tips: [

            "Maintain high soil moisture.",

            "Support plants against wind.",

            "Remove suckers regularly.",

            "Mulch around the base.",

            "Harvest when fruits mature.",

        ],

    },

    Mango: {

        emoji: "🥭",

        duration: 1095,

        season: "Summer",

        seasonMonths: "March - June",

        fertilizers: [

            "Organic Compost",

            "NPK",

        ],

        tips: [

            "Prune annually.",

            "Monitor fruit fly.",

            "Apply manure before flowering.",

            "Ensure good drainage.",

            "Harvest mature fruits carefully.",

        ],

    },

    Grapes: {

        emoji: "🍇",

        duration: 150,

        season: "Winter",

        seasonMonths: "November - March",

        fertilizers: [

            "Organic Compost",

            "DAP",

            "Potash",

        ],

        tips: [

            "Train vines properly.",

            "Prune after harvest.",

            "Maintain canopy ventilation.",

            "Protect against powdery mildew.",

            "Harvest fully ripened bunches.",

        ],

    },

};

// ======================================================

export const getCropInfo = (cropName) => {

    return (

        cropInfo[cropName] ||

        {

            emoji: "🌱",

            duration: 90,

            season: "Unknown",

            seasonMonths: "Unknown",

            fertilizers: [

                "Consult Local Agriculture Office",

            ],

            tips: [

                "Maintain proper irrigation.",

                "Monitor pests regularly.",

                "Use balanced fertilizers.",

            ],

        }

    );

};