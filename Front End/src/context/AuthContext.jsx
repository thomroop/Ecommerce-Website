// @desc    AuthContext - Manages user authentication, token storage, and profile retrieval across the app
// @route   Frontend Context
// @access  Private (shared with all authenticated components)

import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, getProfile } from "../api/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ✅ Automatically fetch profile if token exists
  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((res) => {
          // Match backend response structure
          const userData = res.data || res.data?.data || res.user;
          setUser(userData);
        })
        .catch((err) => {
          console.error("Profile fetch failed:", err);
          logout(); // clear invalid token
        });
    }
  }, [token]);

  // ✅ LOGIN FUNCTION
  const login = async (data) => {
    try {
      const res = await loginUser(data);

      // Adjusted to match backend structure
      const token = res.token || res.data?.token;
      const userData = res.data || res.user;

      if (!token) throw new Error("Token missing from server response");

      // Save token and user to state + localStorage
      localStorage.setItem("token", token);
      setToken(token);
      setUser(userData);

      console.log("✅ Login successful:", userData);
      return userData;
    } catch (err) {
      console.error("❌ Login error:", err);
      throw err;
    }
  };

  // ✅ REGISTER FUNCTION
  const register = async (data) => {
    try {
      const res = await registerUser(data);
      console.log("✅ User registered:", res);
      return res;
    } catch (err) {
      console.error("❌ Registration error:", err);
      throw err;
    }
  };

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    console.log("🚪 Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


