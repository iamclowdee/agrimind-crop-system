import mongoose from "mongoose";

const cropHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    prediction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prediction",
    },

    cropName: String,

    season: String,

    investment: Number,

    area: Number,

    duration: Number,

    revenue: {
      type: Number,
      default: null,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "CropHistory",
  cropHistorySchema
);