// @desc    Authentication API - Handles user registration, login, and profile retrieval via backend endpoints
// @route   Frontend API
// @access  Public (register, login) / Private (profile)

// ✅ src/api/authApi.js
import axios from "axios";

// Base API URL from environment variable
const API_URL = import.meta.env.VITE_API_BASE_URL;

// -------------------------
// 📝 Register User
// -------------------------
export const registerUser = async (userData) => {
  try {
    // Correct endpoint → /api/auth/register
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    // Safe error handling
    throw error.response ? error.response.data : { message: "Server error" };
  }
};

// -------------------------
// 🔑 Login User
// -------------------------
export const loginUser = async (userData) => {
  try {
    // Correct endpoint → /api/auth/login
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server error" };
  }
};

// -------------------------
// 👤 Get Profile (Protected)
// -------------------------
export const getProfile = async (token) => {
  try {
    // Correct endpoint → /api/auth/profile
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server error" };
  }
};
