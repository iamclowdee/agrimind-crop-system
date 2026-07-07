import Prediction from "../models/Prediction.js";

// ==========================================
// Create Prediction
// ==========================================

export const createPrediction = async (predictionData) => {

    return await Prediction.create(
        predictionData
    );

};

// ==========================================
// Get User Predictions
// ==========================================

export const getUserPredictions = async (userId) => {

    return await Prediction.find({

        user: userId,

    })

    .sort({

        createdAt: -1,

    })

    .select("-__v")

    .lean();

};

// ==========================================
// Get Prediction By ID
// ==========================================

export const getPredictionById = async (

    predictionId,

    userId

) => {

    return await Prediction.findOne({

        _id: predictionId,

        user: userId,

    })

    .select("-__v");

};

// ==========================================
// Latest Prediction
// ==========================================

export const getLatestPrediction = async (userId) => {

    return await Prediction.findOne({

        user: userId,

    })

    .sort({

        createdAt: -1,

    });

};

// ==========================================
// Delete Prediction
// ==========================================

export const deletePrediction = async (

    predictionId,

    userId

) => {

    return await Prediction.findOneAndDelete({

        _id: predictionId,

        user: userId,

    });

};

// ==========================================
// Clear User History
// ==========================================

export const clearPredictions = async (userId) => {

    return await Prediction.deleteMany({

        user: userId,

    });

};