import {

    registerUserService,

    loginUserService,

    updateProfileService,

} from "../services/authService.js";


// =========================================
// Register
// =========================================

export const registerUser = async (

    req,

    res,

    next

) => {

    try {

        const result =
            await registerUserService(
                req.body
            );

        res.status(201).json(result);

    }

    catch (error) {

        next(error);

    }

};


// =========================================
// Login
// =========================================

export const loginUser = async (

    req,

    res,

    next

) => {

    try {

        const result =
            await loginUserService(
                req.body
            );

        res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};


// =========================================
// Get Profile
// =========================================

export const getProfile = async (

    req,

    res

) => {

    res.status(200).json({

        success: true,

        user: req.user,

    });

};


// =========================================
// Update Profile
// =========================================

export const updateProfile = async (

    req,

    res,

    next

) => {

    try {

        const result =
            await updateProfileService(

                req.user._id,

                req.body

            );

        res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};