// src/pages/cart/CartItem.jsx
import React, { useContext } from "react";
import { CartContext } from "../../context/Cartcontext";

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
      {/* Product Image */}
      <img
        src={item.image}       // 👈 image from cart
        alt={item.name}
        className="w-20 h-20 object-contain rounded mr-4"
      />

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p>
          ₹{item.price.toLocaleString()} × {item.quantity}
        </p>
      </div>

      {/* Quantity Buttons */}
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => addToCart(item)}
        >
          +
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CartItem;
