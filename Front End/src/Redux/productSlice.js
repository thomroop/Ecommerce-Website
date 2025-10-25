// @desc    productSlice - Handles CRUD operations for products in Redux store
// @route   Frontend Redux Store
// @access  Shared (used by Admin & Product components)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // ✅ Stores all product data
};

const productSlice = createSlice({
  name: "products", // ✅ Redux slice name — used as key in store.js
  initialState,
  reducers: {
    // ✅ Add new product
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    // ✅ Update existing product by ID
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    // ✅ Delete a product by ID
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (p) => p.id !== action.payload
      );
    },
  },
});

// ✅ Export actions for component dispatch
export const { addProduct, updateProduct, deleteProduct } =
  productSlice.actions;

// ✅ Export reducer for store.js configuration
export default productSlice.reducer;

