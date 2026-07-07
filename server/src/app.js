import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import soilRoutes from "./routes/soilRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";

const app = express();

/*
=========================================
MIDDLEWARE
=========================================
*/

// Parse JSON request bodies
app.use(express.json());

// Parse URL encoded form data
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

/*
=========================================
HEALTH CHECK
=========================================
*/

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AgriMind Express API Running 🚀",
  });
});

/*
=========================================
API ROUTES
=========================================
*/

app.use("/api/auth", authRoutes);
// app.use("/api/profile", profileRoutes);
app.use("/api/predict", predictionRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/soil", soilRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/location", locationRoutes);

/*
=========================================
404 HANDLER
=========================================
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/*
=========================================
ERROR HANDLER
=========================================
*/

// app.use(errorMiddleware);

import {
    notFound,
    errorHandler
} from "./middleware/errorMiddleware.js";

app.use(notFound);
app.use(errorHandler);

export default app;