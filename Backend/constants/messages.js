// @desc     Centralized collection of reusable application messages
// @file     constants/messages.js
// @access   Public (Used across controllers and middleware)
// @usage    Provides consistent, human-readable success and error messages throughout the app
// @example  res.json({ message: messages.USER_CREATED })
// @returns  Object containing message constants for server, user, and product operations

const messages = {
  // -----------------------------
  // 🌐 Server messages
  // -----------------------------
  SERVER_RUNNING: "Server running on port",
  SERVER_ERROR: "Something went wrong on the server",
  API_RUNNING: "API is running...",

  // -----------------------------
  // 👤 User-related messages
  // -----------------------------
  USER_NOT_FOUND: "User not found",
  LOGIN_SUCCESS: "Login Successful",
  USER_CREATED: "User created successfully",
  USER_UPDATED: "User updated successfully",
  USER_DELETED: "User deleted successfully",
  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED: "Not authorized, token failed",
  FORBIDDEN: "Access denied",

  // -----------------------------
  // 🛒 Product-related messages
  // -----------------------------
  PRODUCT_ADDED: "Product added successfully",
  PRODUCT_FETCHED: "Product fetched successfully",
  PRODUCT_UPDATED: "Product updated successfully",
  PRODUCT_DELETED: "Product deleted successfully",
  PRODUCT_NOT_FOUND: "Product not found",
};

export default messages;
