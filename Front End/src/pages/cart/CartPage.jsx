// src/pages/cart/CartPage.jsx
// @desc    CartPage - Displays all items added to the cart, allows category filtering, and enables checkout or cart clearing

import React, { useContext, useState } from "react";
import { CartContext } from "../../context/Cartcontext";
import { AuthContext } from "../../context/AuthContext"; // ✅ Added
import CartItem from "./CartItems";
import CategoryFilter from "../../components/common/CategoryFilter";
import SupportLink from "../../components/common/SupportLink";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user, loading } = useContext(AuthContext); // ✅ Added
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/products/${category}`);
  };

  const filteredCart =
    selectedCategory === "All"
      ? cart
      : cart.filter((item) => item.category === selectedCategory);

  const total = filteredCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Updated Checkout logic
  const handleCheckout = () => {
    if (loading) {
      console.log("⏳ Please wait... verifying user authentication");
      return;
    }

    if (!user) {
      console.warn("🚫 Not logged in — redirecting to login");
      navigate("/login");
    } else {
      console.log("✅ User verified — proceeding to checkout");
      navigate("/checkout", { state: { total } });
    }
  };

  // Inline gradient style
  const gradientStyle = {
    background:
      "linear-gradient(180deg, rgba(220,255,248,1) 0%, rgba(241,245,249,1) 60%, rgba(243,246,250,1) 100%)",
  };

  return (
    <div
      className="p-6 min-h-[80vh] flex flex-col items-center"
      style={gradientStyle}
    >
      {/* Page Heading */}
      <h2 className="text-3xl font-bold mb-4 text-teal-700 text-center drop-shadow-sm">
        My Basket 🛒
      </h2>

      {/* Category Filter Bar */}
      <div className="w-full max-w-4xl mb-6">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryClick}
        />
      </div>

      {/* Cart Content */}
      {cart.length === 0 ? (
        <p className="text-center mt-10 text-gray-700 text-lg font-medium">
          Oops! Your cart is empty. 😔
        </p>
      ) : (
        <div className="w-full max-w-3xl bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-100">
          <div className="space-y-4">
            {filteredCart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <h3 className="mt-6 font-bold text-center text-xl text-slate-700">
            Total: <span className="text-teal-700">₹{total.toLocaleString()}</span>
          </h3>

          <div className="flex justify-center gap-4 mt-5">
            <button
              className="px-6 py-2 bg-gradient-to-r from-teal-600 to-slate-600 text-white rounded-lg font-semibold shadow-md hover:from-teal-700 hover:to-slate-700 transition-all"
              onClick={handleCheckout}
            >
              Proceed to Checkout 💳
            </button>

            <button
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg font-semibold shadow-md hover:from-red-600 hover:to-red-800 transition-all"
              onClick={clearCart}
            >
              Clear Cart 🗑️
            </button>
          </div>
        </div>
      )}

      {/* Support link */}
      <div className="mt-10 text-center">
        <SupportLink message="Having trouble with your order or payment?" />
      </div>
    </div>
  );
};

export default CartPage;





 



