// @desc    AuthContext - Manages user authentication, token storage, and profile retrieval across the app
// @route   Frontend Context
// @access  Private (shared with all authenticated components)

import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, getProfile } from "../api/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // ✅ Restore token & user from localStorage immediately
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true); // Track authentication loading state

  // ✅ Auto-fetch profile if token exists (on refresh or first load)
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getProfile(token);
        console.log("📡 Profile API raw response:", res);

        // ✅ Extract correct user data (backend wraps data under 'data')
        const rawUser = res.data || res.user || res; // 🔄 renamed

        if (rawUser) {
          // 🔄 NEW: derive role from rawUser / isAdmin
          const role =
            rawUser.role ||
            (typeof rawUser.isAdmin === "boolean"
              ? rawUser.isAdmin
                ? "admin"
                : "user"
              : "user");

          const userData = { ...rawUser, role: role.toLowerCase() };

          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          console.log("✅ Profile restored successfully:", userData);
        } else {
          console.warn("⚠️ No user data found in profile response.");
          logout();
        }
      } catch (err) {
        console.error("❌ Profile fetch failed:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
    else setLoading(false);
  }, [token]);

  // ✅ LOGIN FUNCTION
  const login = async (data) => {
    try {
      const res = await loginUser(data);
      const token = res.token || res.data?.token;
      const rawUser = res.user || res.data?.user || res.data; // 🔄 renamed

      if (!token) throw new Error("Token missing from server response");

      // 🔄 NEW: derive role from rawUser / isAdmin
      const role =
        rawUser.role ||
        (typeof rawUser.isAdmin === "boolean"
          ? rawUser.isAdmin
            ? "admin"
            : "user"
          : "user");

      const userData = { ...rawUser, role: role.toLowerCase() };

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






