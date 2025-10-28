// @desc    ManageProducts Page - Enables admin to add, edit, and delete products using Redux for state management
// @route   Frontend Admin Page
// @access  Private (Admin only)

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../Redux/productSlice"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const toastShown = useRef(false);

  useEffect(() => {
    if (!toastShown.current && products.length > 0) {
      toast.success("Products loaded successfully ✅");
      toastShown.current = true;
    }
  }, [products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Please fill all fields");
      return;
    }

    if (isEditing) {
      dispatch(updateProduct(formData));
      toast.success("Product updated successfully ✏️");
    } else {
      dispatch(addProduct({ ...formData, id: Date.now() }));
      toast.success("Product added successfully ✅");
    }

    setFormData({ id: "", name: "", price: "", category: "" });
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    toast.info("Product deleted 🗑️");
  };

  return (
    <div className="p-6">
      {/* ✅ Header */}
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        Manage Products
      </h2>

      {/* ✅ Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 mb-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-teal-600 to-slate-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-teal-700 hover:to-slate-700 transition-all duration-200 shadow-md"
        >
          {isEditing ? "Update Product ✏️" : "Add Product ➕"}
        </button>
      </form>

      {/* ✅ Products Table */}
      <table className="w-full bg-white shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="p-2 border border-gray-200 text-left">ID</th>
            <th className="p-2 border border-gray-200 text-left">Name</th>
            <th className="p-2 border border-gray-200 text-left">Price</th>
            <th className="p-2 border border-gray-200 text-left">Category</th>
            <th className="p-2 border border-gray-200 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr
                key={p.id}
                className="text-slate-700 border-b hover:bg-teal-50 transition-colors"
              >
                <td className="p-2 border border-gray-200">{p.id}</td>
                <td className="p-2 border border-gray-200">{p.name}</td>
                <td className="p-2 border border-gray-200">₹{p.price}</td>
                <td className="p-2 border border-gray-200">{p.category}</td>
                <td className="p-2 border border-gray-200 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-gradient-to-r from-teal-600 to-slate-600 text-white px-3 py-1 rounded hover:from-teal-700 hover:to-slate-700 transition-all duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-1 rounded hover:from-red-600 hover:to-rose-700 transition-all duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="p-3 text-center text-slate-500 font-medium"
              >
                No products yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;




