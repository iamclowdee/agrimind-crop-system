import {

    createPrediction,

    getPredictionHistory,

    getPredictionById,

    updatePrediction,

    deletePrediction,

    getLatestPrediction

} from "../services/predictionService.js";



// ==========================================
// Create Prediction
// ==========================================

export const createPredictionController = async (

    req,

    res,

    next

) => {

    try {

        const result = await createPrediction(

            req.user._id,

            req.body

        );

        res.status(201).json(result);

    }

    catch (error) {

        next(error);

    }

};



// ==========================================
// Prediction History
// ==========================================

export const getPredictionHistoryController = async (

    req,

    res,

    next

) => {

    try {

        const history = await getPredictionHistory(

            req.user._id

        );

        res.status(200).json({

            success: true,

            history,

        });

    }

    catch (error) {

        next(error);

    }

};



// ==========================================
// Prediction By ID
// ==========================================

export const getPredictionByIdController = async (

    req,

    res,

    next

) => {

    try {

        const prediction = await getPredictionById(

            req.params.id,

            req.user._id

        );

        if (!prediction) {

            res.status(404);

            throw new Error(

                "Prediction not found."

            );

        }

        res.status(200).json({

            success: true,

            prediction,

        });

    }

    catch (error) {

        next(error);

    }

};



// ==========================================
// Update Prediction
// ==========================================

export const updatePredictionController = async (

    req,

    res,

    next

) => {

    try {

        const prediction = await updatePrediction(

            req.params.id,

            req.user._id,

            req.body

        );

        res.status(200).json({

            success: true,

            message:

                "Prediction updated successfully.",

            prediction,

        });

    }

    catch (error) {

        next(error);

    }

};



// ==========================================
// Delete Prediction
// ==========================================

export const deletePredictionController = async (

    req,

    res,

    next

) => {

    try {

        const prediction = await deletePrediction(

            req.params.id,

            req.user._id

        );

        if (!prediction) {

            res.status(404);

            throw new Error(

                "Prediction not found."

            );

        }

        res.status(200).json({

            success: true,

            message:

                "Prediction deleted successfully.",

        });

    }

    catch (error) {

        next(error);

    }

};

export const getLatestPredictionController = async (

    req,

    res,

    next

) => {

    try {

        const prediction =

            await getLatestPrediction(

                req.user._id

            );

        res.status(200).json({

            success: true,

            prediction,

        });

    }

    catch (error) {

        next(error);

    }

};