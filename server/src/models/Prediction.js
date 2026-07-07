import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(

    {

        // ==========================================
        // User
        // ==========================================

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        // ==========================================
        // Location
        // ==========================================

        location: {

            type: String,

            default: "",

            trim: true,

        },

        region: {

            type: String,

            default: "",

            trim: true,

        },

        latitude: {

            type: Number,

            default: null,

        },

        longitude: {

            type: Number,

            default: null,

        },

        // ==========================================
        // Soil Inputs
        // ==========================================

        nitrogen: {

            type: Number,

            required: true,

        },

        phosphorus: {

            type: Number,

            required: true,

        },

        potassium: {

            type: Number,

            required: true,

        },

        temperature: {

            type: Number,

            required: true,

        },

        humidity: {

            type: Number,

            required: true,

        },

        rainfall: {

            type: Number,

            required: true,

        },

        ph: {

            type: Number,

            required: true,

        },

        soil_moisture: {

            type: Number,

            required: true,

        },

        organic_carbon: {

            type: Number,

            required: true,

        },

        electrical_conductivity: {

            type: Number,

            required: true,

        },

        season: {

            type: String,

            required: true,

        },

        soil_color: {

            type: String,

            required: true,

        },

        // ==========================================
        // ML Output
        // ==========================================

        recommended_crop: {

            type: String,

            required: true,

        },

        confidence: {

            type: Number,

            required: true,

        },

        top_recommendations: [

            {

                crop: String,

                probability: Number,

            },

        ],

        // ==========================================
        // Crop Lifecycle
        // ==========================================

        status: {

            type: String,

            enum: [

                "predicted",

                "growing",

                "harvested",

            ],

            default: "predicted",

        },

        // ==========================================
        // Farming Details
        // ==========================================

        area: {

            type: Number,

            default: 0,

        },

        investment: {

            type: Number,

            default: 0,

        },

        revenue: {

            type: Number,

            default: null,

        },

        profit: {

            type: Number,

            default: null,

        },

        daysToHarvest: {

            type: Number,

            default: 0,

        },

        plantedDate: {

            type: Date,

            default: null,

        },

        harvestedDate: {

            type: Date,

            default: null,

        },

        notes: {

            type: String,

            default: "",

            trim: true,

        },

    },

    {

        timestamps: true,

    }

);

const Prediction = mongoose.model(

    "Prediction",

    predictionSchema

);

export default Prediction;