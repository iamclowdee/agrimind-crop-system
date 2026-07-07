import express from "express";

import {
    predictionValidator,
} from "../validators/predictionValidator.js";

import validateRequest from "../middleware/validateRequest.js";

import { protect } from "../middleware/authMiddleware.js";

import {

    createPredictionController,

    getPredictionHistoryController,

    getLatestPredictionController,

    getPredictionByIdController,

    updatePredictionController,

    deletePredictionController,

} from "../controllers/predictionController.js";

const router = express.Router();

// ==========================================
// Create Prediction
// ==========================================

router.post(
    "/",
    protect,
    predictionValidator,
    validateRequest,
    createPredictionController
);

// ==========================================
// Prediction History
// ==========================================

router.get(
    "/history",
    protect,
    getPredictionHistoryController
);

// ==========================================
// Latest Prediction
// ==========================================

router.get(
    "/latest",
    protect,
    getLatestPredictionController
);

// ==========================================
// Prediction Details
// ==========================================

router.get(
    "/:id",
    protect,
    getPredictionByIdController
);

// ==========================================
// Update Prediction
// ==========================================

router.put(
    "/:id",
    protect,
    updatePredictionController
);

// ==========================================
// Delete Prediction
// ==========================================

router.delete(
    "/:id",
    protect,
    deletePredictionController
);

export default router;
