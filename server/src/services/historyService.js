import Prediction from "../models/Prediction.js";

export const getHistory = async (userId) => {

    const history = await Prediction.find({

        user: userId,

    })

    .sort({

        createdAt: -1,

    })

    .select("-__v")

    .lean();

    return history;

};

export const deleteHistoryItem = async (

    predictionId,

    userId

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

    await prediction.deleteOne();

    return {

        success: true,

        message: "History deleted successfully.",

    };

};

export const clearHistory = async (userId) => {

    await Prediction.deleteMany({

        user: userId,

    });

    return {

        success: true,

        message: "History cleared successfully.",

    };

};