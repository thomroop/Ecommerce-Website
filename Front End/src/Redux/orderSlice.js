// @desc    orderSlice - Manages order state for both user and admin (add, update, delete, fetch orders)
// @route   Frontend Redux Store
// @access  Shared (used by Admin & User components)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [], // ✅ Stores all user or admin orders
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // ✅ Add a new order (user checkout)
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },

    // ✅ Update the status of an existing order
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) {
        order.status = status;
      }
    },

    // ✅ Delete an order (admin or cancellation)
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
    },

    // ✅ Set all orders at once (used when fetching orders from backend)
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { addOrder, updateOrderStatus, deleteOrder, setOrders } =
  orderSlice.actions;

export default orderSlice.reducer; // ✅ Required by store.js
