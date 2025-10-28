// @desc    CartItem Component - Displays individual cart items with image, price, quantity, and add/remove buttons
// @route   Frontend Cart Component
// @access  Private (User only)

import React, { useContext } from "react";
import { CartContext } from "../../context/Cartcontext";

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-contain rounded-lg mr-4"
      />

      {/*  Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-slate-800 text-lg">{item.name}</h3>
        <p className="text-gray-600">
          ₹{item.price.toLocaleString()} × {item.quantity}
        </p>
        <p className="text-teal-700 font-medium mt-1">
          Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
        </p>
      </div>

      {/*  Quantity Buttons */}
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-gradient-to-r from-teal-600 to-slate-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-slate-700 transition-all"
          onClick={() => addToCart(item)}
        >
          +
        </button>
        <button
          className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-800 transition-all"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CartItem;
