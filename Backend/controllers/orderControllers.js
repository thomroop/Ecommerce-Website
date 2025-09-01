// controllers/orderController.js
import Order from "../models/order.js";
import httpStatus from "../constants/httpStatus.js";


// @desc Create new order
// @route POST /api/orders
// @access Private
export const createOrder = async (req, res) => {
  try {
    const { quantity, payment, deliveryPerson } = req.body;

    const order = new Order({
      customer: req.user._id, // from logged-in user
      quantity,
      payment,
      deliveryPerson,
    });

    const createdOrder = await order.save();

    res.status(httpStatus.CREATED).json({
      code: httpStatus.CREATED,
      message: httpMessages.CREATED.message,
      data: createdOrder,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

// @desc Get all orders (Admin)
// @route GET /api/orders
// @access Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .populate("deliveryPerson", "name email")
      .populate("payment");

    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: httpMessages.OK.message,
      data: orders,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

// @desc Update order status
// @route PUT /api/orders/:id
// @access Private/Admin
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(httpStatus.NOT_FOUND).json({
        code: httpStatus.NOT_FOUND,
        message: httpMessages.NOT_FOUND.message,
      });
    }

    order.status = req.body.status || order.status;
    if (req.body.deliveryPerson) order.deliveryPerson = req.body.deliveryPerson;

    const updatedOrder = await order.save();

    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

// @desc Delete order
// @route DELETE /api/orders/:id
// @access Private/Admin
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(httpStatus.NOT_FOUND).json({
        code: httpStatus.NOT_FOUND,
        message: httpMessages.NOT_FOUND.message,
      });
    }

    await order.deleteOne();

    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};
