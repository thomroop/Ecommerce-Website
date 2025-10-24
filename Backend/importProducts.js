import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import Category from "./models/Category.js";
import User from "./models/User.js";
import connectDB from "./config/db.js";
import productData from "./Data/ProductList.js";

dotenv.config();
await connectDB();

const importProducts = async () => {
  try {
    // 1️⃣ Find the admin user (seller)
    const adminUser = await User.findOne({ role: "Admin" });
    if (!adminUser) throw new Error("Admin user not found. Please register an Admin first.");

    // 2️⃣ Ensure categories exist
    const uniqueCategories = [...new Set(productData.map(p => p.category))];
    const categoryMap = {};

    for (const catName of uniqueCategories) {
      let category = await Category.findOne({ name: catName });
      if (!category) {
        category = await Category.create({ name: catName });
      }
      categoryMap[catName] = category._id;
    }

    // 3️⃣ Replace string categories with ObjectIds and assign seller
    const formattedProducts = productData.map(product => ({
      ...product,
      category: categoryMap[product.category],
      seller: adminUser._id
    }));

    // 4️⃣ Clear old products and insert new
    await Product.deleteMany();
    await Product.insertMany(formattedProducts);

    console.log("✅ Products imported successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing products:", error.message);
    process.exit(1);
  }
};

importProducts();
