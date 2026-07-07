import express from "express";

import {

    getLatestSoilController,

    getSoilByPredictionController,

} from "../controllers/soilController.js";

import {

    protect,

} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(

    "/latest",

    protect,

    getLatestSoilController

);

router.get(

    "/:id",

    protect,

    getSoilByPredictionController

);

export default router;