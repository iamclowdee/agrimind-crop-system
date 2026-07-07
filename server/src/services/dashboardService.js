import User from "../models/User.js";
import Prediction from "../models/Prediction.js";

import {
    calculateSoilScore,
    getSoilCondition,
} from "../utils/soilScore.js";

export const getDashboardData = async (userId) => {

    // Logged in user
    const user = await User.findById(userId)
        .select("-password")
        .lean();

    if (!user) {
        throw new Error("User not found.");
    }

    // Total predictions
    const totalPredictions =
        await Prediction.countDocuments({
            user: userId,
        });

    // Latest prediction
    const latestPrediction =
        await Prediction.findOne({
            user: userId,
        })
        .sort({
            createdAt: -1,
        })
        .lean();

    // Recent 5 predictions
    const recentPredictions =
        await Prediction.find({
            user: userId,
        })
        .sort({
            createdAt: -1,
        })
        .limit(5)
        .lean();

    // Average confidence
    const confidenceResult =
        await Prediction.aggregate([
            {
                $match: {
                    user: user._id,
                },
            },
            {
                $group: {
                    _id: null,
                    averageConfidence: {
                        $avg: "$confidence",
                    },
                },
            },
        ]);

    const averageConfidence =
        confidenceResult.length
            ? Number(
                  confidenceResult[0]
                      .averageConfidence.toFixed(2)
              )
            : 0;

    // Soil Summary
    let soil = null;

    if (latestPrediction) {

        const score =
            calculateSoilScore(
                latestPrediction
            );

        soil = {

            score,

            condition:
                getSoilCondition(score),

        };

    }

    return {

        success: true,

        user: {

            name: user.name,

            email: user.email,

            farmName: user.farmName,

            location: user.location,

            landOwned: user.landOwned,

        },

        stats: {

            totalPredictions,

            averageConfidence,

        },

        latestPrediction,

        recentPredictions,

        soil,

    };

};