import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import BookingPage from "../pages/BookingPage";
import EventDetailsPage from "../pages/EventDetailsPage";
import PaymentPage from "../pages/PaymentPage";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import MyBookings from "../pages/MyBookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/myBookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/event/:id",
        element: (
          <PrivateRoute>
            <EventDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/booking/:eventId",
        element: (
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:bookingId",
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;
