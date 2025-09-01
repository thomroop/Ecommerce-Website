import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import responseMessages from "../constants/messages.js";
import { successResponse, errorResponse } from "../constants/response.js";
import STATUS_CODES from "../constants/httpStatus.js";

//  Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check for missing fields
    if (!name || !email || !password || !phone) {
      return errorResponse(res, STATUS_CODES.BAD_REQUEST, "All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, STATUS_CODES.BAD_REQUEST, responseMessages.USER_EXISTS);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: req.body.role || "User" // <-- Necessary change: allow role from request body
    });

    // Remove password before sending response
    const { password: _, ...userWithoutPassword } = user._doc;

    return successResponse(
      res,
      userWithoutPassword,
      responseMessages.USER_REGISTERED,
      STATUS_CODES.CREATED
    );
  } catch (error) {
    return errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      error.message || "Internal Server Error"
    );
  }
};

//  Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return errorResponse(res, STATUS_CODES.BAD_REQUEST, "Email and password are required");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, STATUS_CODES.NOT_FOUND, responseMessages.USER_NOT_FOUND);
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, STATUS_CODES.BAD_REQUEST, responseMessages.INVALID_CREDENTIALS);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Remove password before sending
    const { password: _, ...userWithoutPassword } = user._doc;

    return successResponse(
      res,
      { token, user: userWithoutPassword },
      responseMessages.LOGIN_SUCCESS
    );
  } catch (error) {
    return errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      error.message || "Internal Server Error"
    );
  }
};
