import {

    getHistory,

    deleteHistoryItem,

    clearHistory,

} from "../services/historyService.js";

export const getHistoryController = async (

    req,

    res,

    next

) => {

    try {

        const history = await getHistory(

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

export const deleteHistoryController = async (

    req,

    res,

    next

) => {

    try {

        const result = await deleteHistoryItem(

            req.params.id,

            req.user._id

        );

        res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};

export const clearHistoryController = async (

    req,

    res,

    next

) => {

    try {

        const result = await clearHistory(

            req.user._id

        );

        res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};