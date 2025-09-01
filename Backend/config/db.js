import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Admin:September2025@cluster0.sam5nii.mongodb.net/"
    );
    console.log("Mongo DB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed");
  }
};

export default connectDB; 
