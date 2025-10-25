// @desc    User API - Handles retrieval of user profile details using authentication token
// @route   Frontend API
// @access  Private

import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

// Get user profile (requires JWT token)
export const getUserProfile = (token) =>
  API.get("/users/profile", { headers: { Authorization: `Bearer ${token}` } });

