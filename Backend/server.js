// @desc    Server Entry Point - Loads environment variables, connects to MongoDB, and starts the Express server
// @route   Root
// @access  Public

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js"; // ✅ Import the main Express app

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// ✅ Register models before starting routes
import "./models/Category.js";
import "./models/Product.js";

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


