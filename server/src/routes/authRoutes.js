import express from "express";

import {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
} from "../controllers/authController.js";

import {
    protect,
} from "../middleware/authMiddleware.js";

import {
    registerValidator,
    loginValidator,
} from "../validators/authValidator.js";

import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
    "/register",
    registerValidator,
    validateRequest,
    registerUser
);

router.post(
    "/login",
    loginValidator,
    validateRequest,
    loginUser
);

router.get(
    "/profile",
    protect,
    getProfile
);

router.put(
    "/profile",
    protect,
    updateProfile
);

export default router;