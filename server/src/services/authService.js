import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


// =========================================
// Register User
// =========================================

export const registerUserService = async (data) => {

    const existingUser = await User.findOne({
        email: data.email,
    });

    if (existingUser) {
        throw new Error("User already exists.");
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
        data.password,
        salt
    );

    const user = await User.create({

        name: data.name,

        email: data.email,

        password: hashedPassword,

        phone: data.phone || "",

        farmName: data.farmName || "",

        location: data.location || "",

        landOwned: data.landOwned || 0,

    });

    return {

        success: true,

        message: "Registration successful.",

        token: generateToken(user._id),

        user: {

            _id: user._id,

            name: user.name,

            email: user.email,

            phone: user.phone,

            farmName: user.farmName,

            location: user.location,

            landOwned: user.landOwned,

        },

    };

};


// =========================================
// Login User
// =========================================

export const loginUserService = async (data) => {

    const user = await User.findOne({

        email: data.email,

    });

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    const passwordMatch = await bcrypt.compare(

        data.password,

        user.password

    );

    if (!passwordMatch) {
        throw new Error("Invalid email or password.");
    }

    return {

        success: true,

        message: "Login successful.",

        token: generateToken(user._id),

        user: {

            _id: user._id,

            name: user.name,

            email: user.email,

            phone: user.phone,

            farmName: user.farmName,

            location: user.location,

            landOwned: user.landOwned,

        },

    };

};


// =========================================
// Update Profile
// =========================================

export const updateProfileService = async (

    userId,

    data

) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    user.name =
        data.name ?? user.name;

    user.phone =
        data.phone ?? user.phone;

    user.farmName =
        data.farmName ?? user.farmName;

    user.location =
        data.location ?? user.location;

    user.landOwned =
        data.landOwned ?? user.landOwned;

    if (data.password) {

        const salt =
            await bcrypt.genSalt(10);

        user.password =
            await bcrypt.hash(
                data.password,
                salt
            );

    }

    const updatedUser =
        await user.save();

    return {

        success: true,

        message: "Profile updated successfully.",

        user: {

            _id: updatedUser._id,

            name: updatedUser.name,

            email: updatedUser.email,

            phone: updatedUser.phone,

            farmName: updatedUser.farmName,

            location: updatedUser.location,

            landOwned: updatedUser.landOwned,

        },

    };

};