import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/AuthContext.jsx";
import { CartProvider } from "./context/Cartcontext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ✅ Router should wrap all providers that depend on routes */}
    <BrowserRouter>
      {/* ✅ Redux should be top-level — used across contexts */}
      <Provider store={store}>
        {/* ✅ Auth loads first since Cart may depend on user */}
        <AuthProvider>
          {/* ✅ Cart depends on Auth */}
          <CartProvider>
            <App />
            <ToastContainer position="top-center" autoClose={2500} />
          </CartProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
