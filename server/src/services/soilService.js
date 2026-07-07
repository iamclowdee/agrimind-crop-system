import {

    getLatestPrediction,
    getPredictionById,

} from "../repositories/predictionRepository.js";

import {

    calculateSoilScore,
    getSoilCondition,

} from "../utils/soilScore.js";



export const getLatestSoilHealth = async (

    userId

) => {

    const prediction =
        await getLatestPrediction(userId);

    if (!prediction) {

        throw new Error(
            "No prediction history found."
        );

    }

    const score =
        calculateSoilScore(prediction);

    return {

        nitrogen:
            prediction.nitrogen,

        phosphorus:
            prediction.phosphorus,

        potassium:
            prediction.potassium,

        humidity:
            prediction.humidity,

        ph:
            prediction.ph,

        rainfall:
            prediction.rainfall,

        soil_moisture:
            prediction.soil_moisture,

        organic_carbon:
            prediction.organic_carbon,

        electrical_conductivity:
            prediction.electrical_conductivity,

        score,

        condition:
            getSoilCondition(score),

    };

};



export const getSoilHealthByPrediction = async (

    predictionId,

    userId

) => {

    const prediction =
        await getPredictionById(

            predictionId,

            userId

        );

    if (!prediction) {

        throw new Error(
            "Prediction not found."
        );

    }

    const score =
        calculateSoilScore(prediction);

    return {

        nitrogen:
            prediction.nitrogen,

        phosphorus:
            prediction.phosphorus,

        potassium:
            prediction.potassium,

        humidity:
            prediction.humidity,

        ph:
            prediction.ph,

        rainfall:
            prediction.rainfall,

        soil_moisture:
            prediction.soil_moisture,

        organic_carbon:
            prediction.organic_carbon,

        electrical_conductivity:
            prediction.electrical_conductivity,

        score,

        condition:
            getSoilCondition(score),

    };

};