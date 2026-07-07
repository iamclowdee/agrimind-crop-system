import Prediction from "../models/Prediction.js";
import { predictCrop } from "./flaskService.js";

// =====================================================
// Create Prediction
// =====================================================

export const createPrediction = async (

    userId,

    inputData

) => {

    // Get ML Prediction
    const mlResponse = await predictCrop(inputData);

    if (!mlResponse.success) {

        throw new Error(

            mlResponse.error ||

            "Prediction failed."

        );

    }

    // Save Prediction
    const prediction = await Prediction.create({

        // ======================================
        // User
        // ======================================

        user: userId,

        // ======================================
        // Location
        // ======================================

        location:

            inputData.location || "",

        region:

            inputData.region || "",

        latitude:

            inputData.latitude || null,

        longitude:

            inputData.longitude || null,

        // ======================================
        // Soil Inputs
        // ======================================

        nitrogen:

            inputData.nitrogen,

        phosphorus:

            inputData.phosphorus,

        potassium:

            inputData.potassium,

        temperature:

            inputData.temperature,

        humidity:

            inputData.humidity,

        rainfall:

            inputData.rainfall,

        ph:

            inputData.ph,

        soil_moisture:

            inputData.soil_moisture,

        organic_carbon:

            inputData.organic_carbon,

        electrical_conductivity:

            inputData.electrical_conductivity,

        season:

            inputData.season,

        soil_color:

            inputData.soil_color,

        // ======================================
        // ML Output
        // ======================================

        recommended_crop:

            mlResponse.recommended_crop,

        confidence:

            mlResponse.confidence,

        top_recommendations:

            mlResponse.top_recommendations,

        // ======================================
        // Crop Lifecycle
        // ======================================

        status: "predicted",

        // ======================================
        // Farming Details
        // ======================================

        area:

            Number(inputData.area || 0),

        investment: 0,

        revenue: null,

        profit: null,

        daysToHarvest: 0,

        plantedDate: null,

        harvestedDate: null,

        notes: "",

    });

    return {

        success: true,

        message:

            "Prediction generated successfully.",

        prediction,

    };

};

// =====================================================
// Prediction History
// =====================================================

export const getPredictionHistory = async (

    userId

) => {

    return await Prediction.find({

        user: userId,

    })

        .sort({

            createdAt: -1,

        });

};

// =====================================================
// Get Prediction By ID
// =====================================================

export const getPredictionById = async (

    predictionId,

    userId

) => {

    return await Prediction.findOne({

        _id: predictionId,

        user: userId,

    });

};

// =====================================================
// Delete Prediction
// =====================================================

export const deletePrediction = async (

    predictionId,

    userId

) => {

    return await Prediction.findOneAndDelete({

        _id: predictionId,

        user: userId,

    });

};

// =====================================================
// Update Crop Tracking
// =====================================================

export const updatePrediction = async (

    predictionId,

    userId,

    updateData

) => {

    const prediction = await Prediction.findOne({

        _id: predictionId,

        user: userId,

    });

    if (!prediction) {

        throw new Error(

            "Prediction not found."

        );

    }

    if (

        updateData.status !== undefined

    ) {

        prediction.status =

            updateData.status;

    }

    if (

        updateData.area !== undefined

    ) {

        prediction.area =

            Number(updateData.area);

    }

    if (

        updateData.investment !== undefined

    ) {

        prediction.investment =

            Number(updateData.investment);

    }

    if (

        updateData.revenue !== undefined

    ) {

        prediction.revenue =

            Number(updateData.revenue);

    }

    if (

        updateData.daysToHarvest !== undefined

    ) {

        prediction.daysToHarvest =

            Number(

                updateData.daysToHarvest

            );

    }

    if (

        updateData.notes !== undefined

    ) {

        prediction.notes =

            updateData.notes;

    }

    if (

        updateData.plantedDate !== undefined

    ) {

        prediction.plantedDate =

            updateData.plantedDate;

    }

    if (

        updateData.harvestedDate !== undefined

    ) {

        prediction.harvestedDate =

            updateData.harvestedDate;

    }

    // Automatically calculate profit

    if (

        prediction.revenue !== null

    ) {

        prediction.profit =

            prediction.revenue -

            prediction.investment;

    }

    await prediction.save();

    return prediction;

};

// =====================================================
// Get Latest Prediction
// =====================================================

export const getLatestPrediction = async (userId) => {

    return await Prediction

        .findOne({

            user: userId,

        })

        .sort({

            createdAt: -1,

        });

};