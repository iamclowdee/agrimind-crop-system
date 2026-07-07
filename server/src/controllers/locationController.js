import { searchLocation } from "../services/locationService.js";

export const searchLocationController = async (

    req,
    res,
    next

) => {

    try {

        const { q } = req.query;

        const locations =
            await searchLocation(q);

        res.json({

            success: true,

            locations,

        });

    }

    catch (error) {

        next(error);

    }

};