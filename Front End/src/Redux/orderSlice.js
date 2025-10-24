// src/Redux/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [], // stores all user or admin orders
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // ✅ add new order to the list
      state.orders.push(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) {
        order.status = status;
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
    },
    setOrders: (state, action) => {
      // ✅ for fetching all orders (admin)
      state.orders = action.payload;
    },
  },
});

export const { addOrder, updateOrderStatus, deleteOrder, setOrders } =
  orderSlice.actions;

export default orderSlice.reducer; // ✅ required by store.js
