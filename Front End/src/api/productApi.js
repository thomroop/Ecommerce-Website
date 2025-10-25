// @desc    Product API - Handles fetching product data from the backend
// @route   Frontend API
// @access  Public

import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

// Get all products
export const getProducts = () => API.get("/products");
