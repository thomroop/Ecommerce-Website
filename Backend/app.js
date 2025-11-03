// @desc    Main Application File - Initializes Express app, middleware, routes, and global error handling
// @route   Root
// @access  Public

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// ✅ Route imports
import uploadRoutes from "./routes/UploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();


// ✅ Setup __dirname for ES Modules

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ✅ Enable CORS (Allow Public Access)

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


// ------------------------------
// ✅ Middleware
// ------------------------------
app.use(express.json());

// ------------------------------
// ✅ Serve static uploads
// ------------------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------------------------
// ✅ Test route
// ------------------------------
app.get("/", (req, res) => {
  res.send("✅ API is running successfully...");
});

// ------------------------------
// ✅ Mount Routes
// ------------------------------
app.use("/api/upload", uploadRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", protect, cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stripe", stripeRoutes); // ✅ Stripe route
app.use("/api/contact", contactRoutes);
// ------------------------------
// ✅ 404 Handler
// ------------------------------
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ------------------------------
// ✅ Global Error Handler
// ------------------------------
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Server Error" });
});

export default app;




