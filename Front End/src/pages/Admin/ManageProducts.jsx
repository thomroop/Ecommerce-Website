// @desc    ManageProducts Page - Enables admin to add, edit, and delete products using Redux for state management
// @route   Frontend Admin Page
// @access  Private (Admin only)

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../Redux/productSlice"; // ✅ fixed path
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products); // ✅ fixed selector

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Prevent duplicate toasts (for Strict Mode)
  const toastShown = useRef(false);

  // ✅ Show success toast once when products load (for consistency)
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
      <h2 className="text-2xl font-bold mb-4 text-yellow-600">Manage Products</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6">
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-3 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-orange-600"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Products Table */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">₹{p.price}</td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-3 text-center text-gray-500">
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




