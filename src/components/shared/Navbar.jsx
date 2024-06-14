import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <nav className="border-b">
      <div
        className="max-w-6xl mx-auto flex flex-wrap p-5 lg:px-0 flex-col md:flex-row items-center"
        bis_skin_checked="1"
      >
        <div>
          <Link to="/" className="text-xl font-bold">
            Ticket Booking
          </Link>
        </div>
        <div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center gap-2 md:gap-3">
          <Link to="/" className="px-3 py-2 hover:text-indigo-500 font-medium">
            Home
          </Link>
          {!user && (
            <Link
              to="/signin"
              className="px-3 py-2 hover:text-indigo-500 font-medium"
            >
              Sign In
            </Link>
          )}
        </div>
        {user && (
          <button
            onClick={handleSignOut}
            className="inline-flex items-center bg-indigo-500 border-0 py-2 px-4 text-white font-medium focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0"
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
