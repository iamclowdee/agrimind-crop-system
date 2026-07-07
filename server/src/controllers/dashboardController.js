import {
    getDashboardData,
} from "../services/dashboardService.js";

export const getDashboardController =
    async (req, res, next) => {

        try {

            const dashboard =
                await getDashboardData(
                    req.user._id
                );

            res.status(200).json(
                dashboard
            );

        }

        catch (error) {

            next(error);

        }

    };