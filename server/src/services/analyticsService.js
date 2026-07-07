import Prediction from "../models/Prediction.js";

export const getAnalytics = async (userId) => {

    const predictionCount =
        await Prediction.countDocuments({
            user: userId,
        });

    const averageConfidence =
        await Prediction.aggregate([
            {
                $match: {
                    user: userId,
                },
            },
            {
                $group: {
                    _id: null,
                    averageConfidence: {
                        $avg: "$confidence",
                    },
                    highestConfidence: {
                        $max: "$confidence",
                    },
                    lowestConfidence: {
                        $min: "$confidence",
                    },
                },
            },
        ]);

    const cropDistribution =
        await Prediction.aggregate([
            {
                $match: {
                    user: userId,
                },
            },
            {
                $group: {
                    _id: "$recommended_crop",
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
        ]);

    const monthlyPredictions =
        await Prediction.aggregate([
            {
                $match: {
                    user: userId,
                },
            },
            {
                $group: {
                    _id: {
                        month: {
                            $month: "$createdAt",
                        },
                        year: {
                            $year: "$createdAt",
                        },
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]);

    return {

        success: true,

        predictionCount,

        averageConfidence:
            averageConfidence.length
                ? Number(
                      averageConfidence[0]
                          .averageConfidence.toFixed(2)
                  )
                : 0,

        highestConfidence:
            averageConfidence.length
                ? averageConfidence[0]
                      .highestConfidence
                : 0,

        lowestConfidence:
            averageConfidence.length
                ? averageConfidence[0]
                      .lowestConfidence
                : 0,

        mostRecommendedCrop:
            cropDistribution.length
                ? cropDistribution[0]._id
                : null,

        cropDistribution,

        monthlyPredictions,

    };

};