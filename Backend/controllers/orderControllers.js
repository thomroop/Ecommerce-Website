import Order from "../models/Order.js";
import httpStatus from "../constants/httpStatus.js";
import { successResponse, errorResponse } from "../constants/response.js";

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { orderItems, status } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return errorResponse(
        res,
        httpStatus.BAD_REQUEST.code,
        "Order items are required"
      );
    }

    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    const order = new Order({
      customer: req.user._id,
      orderItems,
      totalPrice,
      status: status || "Pending",
    });

    const createdOrder = await order.save();
    return successResponse(
      res,
      createdOrder,
      "Order created successfully",
      httpStatus.CREATED.code
    );
  } catch (error) {
    return errorResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR.code,
      error.message
    );
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .populate("orderItems.product", "name price");
    return successResponse(
      res,
      orders,
      "Orders fetched successfully",
      httpStatus.OK.code
    );
  } catch (error) {
    return errorResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR.code,
      error.message
    );
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return errorResponse(res, httpStatus.NOT_FOUND.code, "Order not found");

    order.status = req.body.status || order.status;
    await order.save();

    return successResponse(
      res,
      order,
      "Order updated successfully",
      httpStatus.OK.code
    );
  } catch (error) {
    return errorResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR.code,
      error.message
    );
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return errorResponse(res, httpStatus.NOT_FOUND.code, "Order not found");

    await order.deleteOne();
    return successResponse(
      res,
      null,
      "Order deleted successfully",
      httpStatus.OK.code
    );
  } catch (error) {
    return errorResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR.code,
      error.message
    );
  }
};
