import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Toaster } from "react-hot-toast";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
        <Toaster />
      </Elements>
    </AuthProvider>
  </React.StrictMode>
);
