// @desc    AdminProducts Page - Displays all products for admins with edit and delete options
// @route   Frontend Admin Page
// @access  Private (Admin only)

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <p className="text-center text-slate-600 font-medium">
        Loading products...
      </p>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-teal-700">
        Product Management
      </h1>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
        <thead className="bg-gradient-to-r from-teal-600 to-slate-600 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr
                key={p._id}
                className="border-t hover:bg-teal-50 transition-all duration-200"
              >
                <td className="p-3 text-slate-800 font-medium">{p.name}</td>
                <td className="p-3 text-slate-700">{p.category}</td>
                <td className="p-3 text-slate-800 font-semibold">
                  ₹{p.price}
                </td>
                <td className="p-3">
                  <button className="bg-gradient-to-r from-teal-600 to-slate-600 text-white px-3 py-1 rounded-lg shadow hover:from-teal-700 hover:to-slate-700 transition-all mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition-all">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-slate-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
