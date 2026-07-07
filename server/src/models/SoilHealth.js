import mongoose from "mongoose";

const soilHealthSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    nitrogen: Number,

    phosphorus: Number,

    potassium: Number,

    ph: Number,

    humidity: Number,

    score: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "SoilHealth",
  soilHealthSchema
);