// @desc    CartPage - Displays all items added to the cart, allows category filtering, and enables checkout or cart clearing
// @route   Frontend Cart Page
// @access  Private (User only)

import React, { useContext, useState } from "react";
import { CartContext } from "../../context/Cartcontext";
import CartItem from "./CartItems";
import CategoryFilter from "../../components/common/CategoryFilter";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  // ✅ Navigate to category page when a category is selected
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/products/${category}`);
  };

  // ✅ Filter cart items by category
  const filteredCart =
    selectedCategory === "All"
      ? cart
      : cart.filter((item) => item.category === selectedCategory);

  // ✅ Calculate total amount
  const total = filteredCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Handle checkout button click
  const handleCheckout = () => {
    navigate("/checkout", { state: { total } }); // send total to checkout page
  };

  return (
    <div className="p-6 bg-gray-50 min-h-[80vh]">
      <h2 className="text-2xl font-bold mb-4 text-yellow-600 text-center">
        Your Cart
      </h2>

      {/* ✅ Category filter bar */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryClick}
      />

      {/* ✅ Display message if cart is empty */}
      {cart.length === 0 ? (
        <p className="text-center mt-10 text-gray-700">Your cart is empty</p>
      ) : (
        <>
          {/* ✅ List of cart items */}
          <div className="space-y-4">
            {filteredCart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* ✅ Total price display */}
          <h3 className="mt-4 font-bold text-center">
            Total: ₹{total.toLocaleString()}
          </h3>

          {/* ✅ Action buttons */}
          <div className="flex justify-center gap-4 mt-3">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleCheckout}
            >
              Checkout
            </button>

            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;


 



