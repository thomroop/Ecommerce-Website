// @desc    Redux Store - Combines all app slices (auth, products, orders) into a single state tree
// @route   Frontend Redux Configuration
// @access  Shared (used globally by the React app)

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import orderReducer from "./orderSlice";

// ✅ Centralized Redux store configuration
const store = configureStore({
  reducer: {
    auth: authReducer,      // 🔐 Authentication & user management
    products: productReducer, // 🛍️ Product CRUD operations
    orders: orderReducer,     // 📦 Order tracking & updates
  },
});

export default store; // ✅ Export to be used in main.jsx
