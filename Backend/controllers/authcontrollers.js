import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import responseMessages from "../constants/messages.js";
import { successResponse, errorResponse } from "../constants/response.js";
import STATUS_CODES from "../constants/httpStatus.js";
import sendEmail from "../utilis/SendEmail.js";


console.log("✅ authcontrollers file loaded");

// ✅ REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return errorResponse(res, STATUS_CODES.BAD_REQUEST, "All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, STATUS_CODES.BAD_REQUEST, responseMessages.USER_EXISTS);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: req.body.role || "User",
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
      error.message || "Internal Server Error"
    );
  }
};


// ✅ LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, STATUS_CODES.BAD_REQUEST, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, STATUS_CODES.NOT_FOUND, responseMessages.USER_NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, STATUS_CODES.BAD_REQUEST, responseMessages.INVALID_CREDENTIALS);
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
      error.message || "Internal Server Error"
    );
  }
};

// ✅ FORGOT PASSWORD (Send OTP)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(res, STATUS_CODES.BAD_REQUEST, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, STATUS_CODES.NOT_FOUND, "User not found");
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

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

    return successResponse(res, {}, "OTP sent to your registered email address");
  } catch (error) {
    return errorResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// ✅ RESET PASSWORD (Verify OTP)
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return errorResponse(res, STATUS_CODES.BAD_REQUEST, "All fields are required");
    }

    const user = await User.findOne({
      email,
      forgotPasswordOtp: otp,
      forgotPasswordExpiry: { $gt: Date.now() }, // Check if OTP is still valid
    });

    if (!user) {
      return errorResponse(res, STATUS_CODES.BAD_REQUEST, "Invalid or expired OTP");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.forgotPasswordOtp = null;
    user.forgotPasswordExpiry = null;
    await user.save();

    return successResponse(res, {}, "Password reset successfully");
  } catch (error) {
    return errorResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

// ✅ GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return errorResponse(res, STATUS_CODES.NOT_FOUND, "User not found");
    }

    // Success response with user details
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
      error.message || "Internal Server Error"
    );
  }
};



console.log("✅ authcontrollers loaded successfully");