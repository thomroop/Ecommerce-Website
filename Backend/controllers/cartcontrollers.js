import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { successResponse, errorResponse } from "../constants/response.js";

// 👉 Get cart for a user
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("items.product");
    if (!cart) return errorResponse(res, 404, "Cart not found");

    return successResponse(res, cart, "Cart fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// 👉 Add or update item in cart
export const addOrUpdateItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

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
        // Update quantity
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

// 👉 Remove item from cart
export const removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;
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

// 👉 Clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return errorResponse(res, 404, "Cart not found");

    cart.items = [];
    await cart.save();

    return successResponse(res, cart, "Cart cleared successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
