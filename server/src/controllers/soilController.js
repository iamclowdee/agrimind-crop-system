import {

    getLatestSoilHealth,

    getSoilHealthByPrediction,

} from "../services/soilService.js";



export const getLatestSoilController = async (

    req,

    res,

    next

) => {

    try {

        const soil =

            await getLatestSoilHealth(

                req.user._id

            );

        res.status(200).json({

            success: true,

            soil,

        });

    }

    catch (error) {

        next(error);

    }

};



export const getSoilByPredictionController = async (

    req,

    res,

    next

) => {

    try {

        const soil =

            await getSoilHealthByPrediction(

                req.params.id,

                req.user._id

            );

        res.status(200).json({

            success: true,

            soil,

        });

    }

    catch (error) {

        next(error);

    }

};