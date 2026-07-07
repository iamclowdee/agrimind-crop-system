import {
    getAnalytics,
} from "../services/analyticsService.js";

export const getAnalyticsController =
    async (
        req,
        res,
        next
    ) => {

        try {

            const analytics =
                await getAnalytics(
                    req.user._id
                );

            res.status(200).json(
                analytics
            );

        }

        catch (error) {

            next(error);

        }

    };