import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "./models/User.js";
import Product from "./models/Product.js";
import Category from "./models/Category.js";
import Cart from "./models/Cart.js";
import Order from "./models/Order.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();
    console.log("Existing data cleared");

    // Create Users
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: await bcrypt.hash("Admin123", 10),
      phone: "9999999999",
      role: "Admin",
    });

    const normalUser = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: await bcrypt.hash("User123", 10),
      phone: "8888888888",
      role: "User",
    });

    console.log("Users created");

    // Create Categories
    const categories = await Category.create([
      { name: "Electronics" },
      { name: "Clothing" },
      { name: "Books" },
    ]);
    console.log("Categories created");

    // Create Products
    const products = await Product.create([
      {
        name: "Smartphone",
        description: "Latest model smartphone",
        price: 500,
        stock: 10,
        category: categories[0]._id,
        seller: adminUser._id,
      },
      {
        name: "T-Shirt",
        description: "Cotton T-Shirt",
        price: 20,
        stock: 50,
        category: categories[1]._id,
        seller: adminUser._id,
      },
      {
        name: "Novel Book",
        description: "Bestselling novel",
        price: 15,
        stock: 30,
        category: categories[2]._id,
        seller: adminUser._id,
      },
    ]);
    console.log("Products created");

    // Create Cart for normal user
    await Cart.create({ 
      user: normalUser._id, 
      items: [
        { product: products[0]._id, quantity: 1 },
        { product: products[1]._id, quantity: 2 },
      ]
    });
    console.log("Cart created");

    // Create Order for normal user
    const orderItems = [
      { product: products[0]._id, quantity: 1, price: products[0].price },
      { product: products[1]._id, quantity: 2, price: products[1].price },
    ];
    const totalPrice = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    await Order.create({
      customer: normalUser._id,
      orderItems,
      totalPrice,
      status: "Pending",
    });
    console.log("Order created");

    console.log("Database seeding completed");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

