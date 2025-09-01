import Product from "../models/Product.js";
import RESPONSE_MESSAGES from "../constants/messages.js";

// 👉 Add new product
export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: RESPONSE_MESSAGES.PRODUCT_ADDED,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: RESPONSE_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// 👉 Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category").populate("seller");
    res.status(200).json({
      success: true,
      message: RESPONSE_MESSAGES.PRODUCT_LIST,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: RESPONSE_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// 👉 Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("seller");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.PRODUCT_NOT_FOUND
      });
    }
    res.status(200).json({
      success: true,
      message: RESPONSE_MESSAGES.PRODUCT_FETCHED,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: RESPONSE_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// 👉 Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.PRODUCT_NOT_FOUND
      });
    }
    res.status(200).json({
      success: true,
      message: RESPONSE_MESSAGES.PRODUCT_UPDATED,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: RESPONSE_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// 👉 Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.PRODUCT_NOT_FOUND
      });
    }
    res.status(200).json({
      success: true,
      message: RESPONSE_MESSAGES.PRODUCT_DELETED
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: RESPONSE_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};
