import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { successResponse, errorResponse } from "../constants/response.js";

// 🛒 Get user's cart
// GET /api/cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ automatically from logged-in user
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) return errorResponse(res, 404, "Cart not found");
    return successResponse(res, cart, "Cart fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// ➕ Add or update item in cart
// POST /api/cart/item
export const addOrUpdateItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return errorResponse(res, 404, "Product not found");

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    return successResponse(res, cart, "Cart updated successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// ❌ Remove an item from cart
// DELETE /api/cart/item/:productId
export const removeItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return errorResponse(res, 404, "Cart not found");

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();

    return successResponse(res, cart, "Item removed from cart");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// 🧹 Clear entire cart
// DELETE /api/cart/clear
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return errorResponse(res, 404, "Cart not found");

    cart.items = [];
    await cart.save();

    return successResponse(res, cart, "Cart cleared successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


// 📊 Get cart summary for all users (admin analytics)
// GET /api/cart/summary
export const getCartSummary = async (req, res) => {
  try {
    const summary = await Cart.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$user",
          totalItems: { $sum: "$items.quantity" },
          totalValue: {
            $sum: { $multiply: ["$items.quantity", "$productDetails.price"] },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 0,
          user: "$userInfo.name",
          email: "$userInfo.email",
          totalItems: 1,
          totalValue: 1,
        },
      },
    ]);

    return successResponse(res, summary, "Cart summary generated successfully");
  } catch (error) {
    console.error("Error in getCartSummary:", error);
    return errorResponse(res, 500, error.message);
  }
};