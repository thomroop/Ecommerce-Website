import Product from "../models/Product.js";
import RESPONSE_MESSAGES from "../constants/messages.js";

// @desc    Add new product
// @route   POST /api/products
// @access  Private/Admin
export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json({ success: true, message: RESPONSE_MESSAGES.PRODUCT_ADDED, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: RESPONSE_MESSAGES.SERVER_ERROR, error: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category").populate("seller");
    return res.status(200).json({ success: true, message: RESPONSE_MESSAGES.PRODUCT_FETCHED, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: RESPONSE_MESSAGES.SERVER_ERROR, error: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category").populate("seller");
    if (!product) return res.status(404).json({ success: false, message: RESPONSE_MESSAGES.PRODUCT_NOT_FOUND });

    return res.status(200).json({ success: true, message: RESPONSE_MESSAGES.PRODUCT_FETCHED, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: RESPONSE_MESSAGES.SERVER_ERROR, error: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ success: false, message: RESPONSE_MESSAGES.PRODUCT_NOT_FOUND });

    return res.status(200).json({ success: true, message: RESPONSE_MESSAGES.PRODUCT_UPDATED, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: RESPONSE_MESSAGES.SERVER_ERROR, error: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: RESPONSE_MESSAGES.PRODUCT_NOT_FOUND });

    return res.status(200).json({ success: true, message: RESPONSE_MESSAGES.PRODUCT_DELETED });
  } catch (error) {
    return res.status(500).json({ success: false, message: RESPONSE_MESSAGES.SERVER_ERROR, error: error.message });
  }
};
