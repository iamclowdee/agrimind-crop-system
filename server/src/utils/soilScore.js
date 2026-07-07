import { getNutrientStatus } from "./soilAnalyzer.js";

export const calculateSoilScore = (soil) => {

    let score = 100;

    if (
        getNutrientStatus(
            "nitrogen",
            soil.nitrogen
        ).status !== "Optimal"
    ) {
        score -= 10;
    }

    if (
        getNutrientStatus(
            "phosphorus",
            soil.phosphorus
        ).status !== "Optimal"
    ) {
        score -= 10;
    }

    if (
        getNutrientStatus(
            "potassium",
            soil.potassium
        ).status !== "Optimal"
    ) {
        score -= 10;
    }

    if (
        soil.ph < 6 ||
        soil.ph > 7.5
    ) {
        score -= 15;
    }

    if (
        soil.humidity < 50 ||
        soil.humidity > 90
    ) {
        score -= 5;
    }

    return Math.max(score, 0);

};

export const getSoilCondition = (score) => {

    if (score >= 90)
        return "Excellent";

    if (score >= 75)
        return "Good";

    if (score >= 60)
        return "Moderate";

    if (score >= 40)
        return "Poor";

    return "Critical";

};