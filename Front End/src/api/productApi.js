// @desc    Product API - Handles fetching product data from the backend
// @route   Frontend API
// @access  Public

import axios from "axios";

const API = axios.create({ baseURL: "https://ecommerce-website-1-h99k.onrender.com/api" });

// Get all products
export const getProducts = () => API.get("/products");
