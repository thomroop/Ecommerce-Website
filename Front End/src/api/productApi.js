// @desc    Product API - Handles fetching product data from the backend
// @route   Frontend API
// @access  Public

import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

// Get all products
export const getProducts = () => API.get("/products");

