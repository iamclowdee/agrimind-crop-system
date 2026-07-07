import express from "express";

import {
    protect,
} from "../middleware/authMiddleware.js";

import {
    getAnalyticsController,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get(
    "/",
    protect,
    getAnalyticsController
);

export default router;