import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";

// =====================================
// Load Environment Variables
// =====================================

dotenv.config();

// =====================================
// Connect Database
// =====================================

connectDB();

// =====================================
// Start Express Server
// =====================================

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(
    `🚀 AgriMind Server running on http://localhost:${PORT}`
  );
});