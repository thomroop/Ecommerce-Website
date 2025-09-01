import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import httpMessages from "../constants/httpStatus.js";
import messages from "../constants/messages.js";
import { successResponse, errorResponse } from "../constants/response.js";

//  Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, httpMessages.BAD_REQUEST.code, messages.USER_ALREADY_EXISTS || "User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
    });

    return successResponse(
      res,
      { id: user._id, name: user.name, email: user.email, role: user.role },
      messages.USER_CREATED
    );
  } catch (error) {
    return errorResponse(res, httpMessages.INTERNAL_SERVER_ERROR.code, error.message);
  }
};

//  Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, httpMessages.BAD_REQUEST.code, messages.INVALID_CREDENTIALS);

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, httpMessages.BAD_REQUEST.code, messages.INVALID_CREDENTIALS);

    // generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return successResponse(
      res,
      { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } },
      messages.lOGIN_SUCCESS
    );
  } catch (error) {
    return errorResponse(res, httpMessages.INTERNAL_SERVER_ERROR.code, error.message);
  }
};

//  Get logged in user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return errorResponse(res, httpMessages.NOT_FOUND.code, messages.USER_NOT_FOUND);

    return successResponse(res, user, messages.OK.message);
  } catch (error) {
    return errorResponse(res, httpMessages.INTERNAL_SERVER_ERROR.code, error.message);
  }
};

//  Update user profile (self)
export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, address, password } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return errorResponse(res, httpMessages.NOT_FOUND.code, messages.USER_NOT_FOUND);

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    // if password update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    return successResponse(res, null, messages.USER_UPDATED);
  } catch (error) {
    return errorResponse(res, httpMessages.INTERNAL_SERVER_ERROR.code, error.message);
  }
};

//  Admin: Get all users
export const getAllUsers = async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.user) {
      return errorResponse(res, httpMessages.UNAUTHORIZED.code, "User not found");
    }

    // Check if user is Admin
    if (req.user.role !== "Admin") {
      return errorResponse(res, httpMessages.FORBIDDEN.code, "Admin access required");
    }

    // Fetch all users without passwords
    const users = await User.find().select("-password");
    return successResponse(res, users, messages.OK.message);

  } catch (error) {
    return errorResponse(res, httpMessages.INTERNAL_SERVER_ERROR.code, error?.message || "Internal Server Error");
  }
};


//  Admin: Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return errorResponse(res, httpMessages.NOT_FOUND.code, messages.USER_NOT_FOUND);

    await user.deleteOne();
    return successResponse(res, null, messages.USER_DELETED);
  } catch (error) {
    return errorResponse(res, httpMessages.INTERNAL_SERVER_ERROR.code, error.message);
  }
};

//  Admin: Update user role
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return errorResponse(res, httpMessages.NOT_FOUND.code, messages.USER_NOT_FOUND);

    user.role = role || user.role;
    await user.save();

    return successResponse(res, null, "User role updated successfully");
  } catch (error) {
    return errorResponse(res, httpMessages.INTERNAL_SERVER_ERROR.code, error.message);
  }
};
