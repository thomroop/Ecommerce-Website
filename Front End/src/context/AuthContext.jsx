// @desc    AuthContext - Manages user authentication, token storage, and profile retrieval across the app
// @route   Frontend Context
// @access  Private (shared with all authenticated components)

import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, getProfile } from "../api/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Restore token & user from localStorage
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true);

  // Auto-fetch profile if token exists
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getProfile(token);
        console.log("📡 Profile API raw response:", res);

        const rawUser = res.data || res.user || res;

        if (rawUser) {
          const userData = { ...rawUser }; // ← keep role exactly as backend sends
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          console.log("✅ Profile restored:", userData);
        } else {
          console.warn("⚠️ No user data in profile");
          logout();
        }
      } catch (err) {
        console.error("❌ Profile fetch failed:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // LOGIN FUNCTION
  const login = async (data) => {
    try {
      const res = await loginUser(data);
      const token = res.token || res.data?.token;
      const rawUser = res.user || res.data?.user || res.data;

      if (!token) throw new Error("Token missing from server response");

      // Keep backend role exactly: "Admin" or "User"
      const userData = { ...rawUser };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setToken(token);
      setUser(userData);

      console.log("✅ Login successful:", userData);
      return userData;
    } catch (err) {
      console.error("❌ Login error:", err);
      throw err;
    }
  };

  // REGISTER FUNCTION
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

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    console.log("🚪 Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;






