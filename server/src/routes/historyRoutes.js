import express from "express";

import {

    getHistoryController,

    deleteHistoryController,

    clearHistoryController,

} from "../controllers/historyController.js";

import {

    protect,

} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(

    "/",

    protect,

    getHistoryController

);

router.delete(

    "/clear",

    protect,

    clearHistoryController

);

router.delete(

    "/:id",

    protect,

    deleteHistoryController

);

export default router;