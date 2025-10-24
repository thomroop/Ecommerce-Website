import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import httpMessages from "../constants/httpStatus.js";
import messages from "../constants/messages.js";
import { successResponse, errorResponse } from "../constants/response.js";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return errorResponse(res, httpMessages.BAD_REQUEST.code, messages.USER_CREATED);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, phone, role: role || "User" });

    return successResponse(res, { id: user._id, name: user.name, email: user.email, role: user.role }, messages.USER_CREATED);
  } catch (error) {
    return errorResponse(res, httpMessages.INTERNAL_SERVER_ERROR.code, error.message);
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, httpMessages.BAD_REQUEST.code, messages.INVALID_CREDENTIALS);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, httpMessages.BAD_REQUEST.code, messages.INVALID_CREDENTIALS);

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return successResponse(res, { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }, messages.LOGIN_SUCCESS);
  } catch (error) {
    return errorResponse(res, httpMessages.INTERNAL_SERVER_ERROR.code, error.message);
  }
};

// @desc    Get all users (Admin)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "Admin") return errorResponse(res, httpMessages.FORBIDDEN.code, "Admin access required");

    const users = await User.find().select("-password");
    return successResponse(res, users, messages.SERVER_RUNNING);
  } catch (error) {
    return errorResponse(res, httpMessages.INTERNAL_SERVER_ERROR.code, error.message);
  }
};
