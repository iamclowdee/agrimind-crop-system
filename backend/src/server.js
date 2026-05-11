const express = require("express");
const cors = require("cors");
require("dotenv").config();

const cropRoutes = require("./routes/cropRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "AgriMind API",
    status: "running",
    endpoints: {
      health: "/api/health",
      recommendCrop: "/api/crops/recommend"
    }
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/crops", cropRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`AgriMind API running on http://localhost:${PORT}`);
});
