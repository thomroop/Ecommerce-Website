// @desc     Establish connection to MongoDB database using Mongoose
// @file     config/db.js
// @access   Private (Server Internal)
// @usage    Called from server.js to connect to MongoDB before starting the server
// @returns  Logs connection success or failure message in console

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Admin:September2025@cluster0.sam5nii.mongodb.net/loginreg"
    );
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

export default connectDB;

