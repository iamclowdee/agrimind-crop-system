// ==========================================
// Nutrient Status
// ==========================================

export const getNutrientStatus = (

    nutrient,

    value

) => {

    switch (nutrient) {

        case "nitrogen":

            if (value < 50)

                return {

                    status: "Low",

                    color: "orange",

                };

            if (value <= 120)

                return {

                    status: "Optimal",

                    color: "green",

                };

            return {

                status: "High",

                color: "red",

            };

        case "phosphorus":

            if (value < 30)

                return {

                    status: "Low",

                    color: "orange",

                };

            if (value <= 80)

                return {

                    status: "Optimal",

                    color: "green",

                };

            return {

                status: "High",

                color: "red",

            };

        case "potassium":

            if (value < 40)

                return {

                    status: "Low",

                    color: "orange",

                };

            if (value <= 90)

                return {

                    status: "Optimal",

                    color: "green",

                };

            return {

                status: "High",

                color: "red",

            };

        default:

            return {

                status: "Unknown",

                color: "gray",

            };

    }

};

// ==========================================
// pH Analysis
// ==========================================

export const analyzePH = (ph) => {

    if (ph < 6)

        return {

            status: "Acidic",

            recommendation:
                "Add agricultural lime.",

        };

    if (ph <= 7.5)

        return {

            status: "Neutral",

            recommendation:
                "Suitable for most crops.",

        };

    return {

        status: "Alkaline",

        recommendation:
            "Use sulfur or organic compost.",

    };

};