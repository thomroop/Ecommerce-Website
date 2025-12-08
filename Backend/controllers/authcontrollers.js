// @file    controllers/authControllers.js
// @desc    Handles user authentication, registration, and password management
// @access  Public and Private (depending on route)

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import responseMessages from "../constants/messages.js";
import { successResponse, errorResponse } from "../constants/response.js";
import STATUS_CODES from "../constants/httpStatus.js";
import sendEmail from "../utils/SendEmail.js";

console.log(" authControllers file loaded");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return errorResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        "All fields are required"
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        responseMessages.USER_EXISTS
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ ROLE LOGIC – no hard-coded email, matches enum ("User" / "Admin")
    const role = req.body.role || "User";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role, // use computed role
    });

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
      error.message
    );
  }
};

// @desc    Login user and return JWT token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        "Email and password are required"
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(
        res,
        STATUS_CODES.NOT_FOUND,
        responseMessages.USER_NOT_FOUND
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        responseMessages.INVALID_CREDENTIALS
      );
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

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
      error.message
    );
  }
};

// @desc    Send OTP for password reset
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        "Email is required"
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(
        res,
        STATUS_CODES.NOT_FOUND,
        "User not found"
      );
    }

    // Generate 6-digit OTP (valid for 10 minutes)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000;

    user.forgotPasswordOtp = otp;
    user.forgotPasswordExpiry = expiry;
    await user.save();

    const message = `
      <h3>Password Reset OTP</h3>
      <p>Use the following OTP to reset your password:</p>
      <h2>${otp}</h2>
      <p>This OTP will expire in 10 minutes.</p>
    `;

    await sendEmail(user.email, "Password Reset OTP", message);

    return successResponse(
      res,
      {},
      "OTP sent to your registered email address"
    );
  } catch (error) {
    return errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

// @desc    Reset password using OTP
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return errorResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        "All fields are required"
      );
    }

    const user = await User.findOne({
      email,
      forgotPasswordOtp: otp,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return errorResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        "Invalid or expired OTP"
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.forgotPasswordOtp = null;
    user.forgotPasswordExpiry = null;
    await user.save();

    return successResponse(res, {}, "Password reset successfully");
  } catch (error) {
    return errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

// @desc    Get logged-in user's profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return errorResponse(
        res,
        STATUS_CODES.NOT_FOUND,
        "User not found"
      );
    }

    return successResponse(
      res,
      user,
      "User profile fetched successfully",
      STATUS_CODES.OK
    );
  } catch (error) {
    return errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

console.log(" authControllers loaded successfully");


