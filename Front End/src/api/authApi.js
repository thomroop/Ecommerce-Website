// @desc    Authentication API - Handles user registration, login, and profile retrieval via backend endpoints
// @route   Frontend API
// @access  Public (register, login) / Private (profile)

// ✅ src/api/authApi.js
import axios from "axios";

// -------------------------
// 🌐 Base API URL (sanitized)
// -------------------------
const rawApiUrl = import.meta.env.VITE_API_BASE_URL || "";
// 🔧 remove ONE trailing slash if present: "…/api/" -> "…/api"
const API_URL = rawApiUrl.replace(/\/$/, "");

// (Optional) Debug logs – help you confirm at runtime
console.log("🔗 rawApiUrl:", rawApiUrl);
console.log("✅ API_URL used:", API_URL);

// -------------------------
//  Register User
// -------------------------
export const registerUser = async (userData) => {
  try {
    // Final endpoint → .../api/auth/register
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Registration error:", error.response?.data || error.message);
    throw error.response ? error.response.data : { message: "Server error" };
  }
};

// -------------------------
//  Login User
// -------------------------
export const loginUser = async (userData) => {
  try {
    // Final endpoint → .../api/auth/login
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    throw error.response ? error.response.data : { message: "Server error" };
  }
};

// -------------------------
// Get Profile (Protected)
// -------------------------
export const getProfile = async (token) => {
  try {
    // Final endpoint → .../api/auth/profile
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Profile error:", error.response?.data || error.message);
    throw error.response ? error.response.data : { message: "Server error" };
  }
};
