import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Protect routes (only logged in users can access)
export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (exclude password)
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      next();
    } else {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not authorized, token failed", error: error.message });
  }
};

// ✅ Admin middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ success: false, message: "Admin access required" });
  }
};
