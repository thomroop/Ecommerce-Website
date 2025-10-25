// @desc    Authentication API - Handles user registration, login, and profile retrieval via backend endpoints
// @route   Frontend API
// @access  Public (register, login) / Private (profile)

// src/api/authApi.js

import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Register API
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL + "register", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server error" };
  }
};

// Login API
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server error" };
  }
};

// Get profile API (requires token)
export const getProfile = async (token) => {
  try {
    const response = await axios.get(API_URL + "profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server error" };
  }
};
