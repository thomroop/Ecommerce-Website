// @desc    authSlice - Manages authentication state and user persistence in Redux
// @route   Frontend Redux Store
// @access  Shared (used across the app for auth control)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // ✅ Stores currently logged-in user info
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Login: saves user data in Redux + localStorage
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    // ✅ Logout: clears user data from Redux + localStorage
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },

    // ✅ Auto-load user from localStorage (called on app start)
    loadUserFromStorage: (state) => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        state.user = JSON.parse(storedUser);
      }
    },
  },
});

export const { login, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer; // ✅ required for configureStore()
