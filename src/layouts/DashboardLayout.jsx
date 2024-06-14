import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineBars3 } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { MdEditDocument, MdPayment } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { IoListSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [largeScreen, setLargeScreen] = useState(false);
  const { user, logout } = useAuth();

  const location = useLocation();
  const eventDetails = location.pathname.includes("event");
  const bookings = location.pathname.split("/")[1];
  const payment = location.pathname.split("/")[1];

  const getClassNames = ({ isActive }) => (isActive ? "active" : "inactive");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
        setLargeScreen(true);
      } else {
        setSidebarOpen(false);
        setLargeScreen(false);
      }
    };

    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <section className="text-gray-600 h-screen overflow-hidden">
      <div className="flex relative" bis_skin_checked="1">
        <div className="lg:w-1/5">
          <div
            className={`h-screen w-full sm:w-[300px] lg:w-auto shadow-2xl lg:shadow-none text-white bg-indigo-600 duration-500 absolute lg:relative top-0 z-50 ${
              sidebarOpen ? "left-0" : "-left-[670px]"
            }`}
          >
            <div className="px-5 py-6 flex items-center justify-between">
              <Link to="/">
                <span className="text-xl font-bold">Ticket Booking</span>
              </Link>
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <RxCross1 className="text-xl" />
              </button>
            </div>
            <div className="flex flex-col justify-between min-h-[calc(100vh-76px)] p-5">
              <div className="flex flex-col space-y-2">
                <NavLink
                  to="/"
                  className={getClassNames}
                  onClick={() => !largeScreen && setSidebarOpen(false)}
                >
                  <AiOutlineHome className="text-xl inline mr-2 mb-1" />
                  Home
                </NavLink>
                {user && (
                  <NavLink
                    to="/myBookings"
                    className={getClassNames}
                    onClick={() => !largeScreen && setSidebarOpen(false)}
                  >
                    <IoListSharp className="text-xl inline mr-2" />
                    My Bookings
                  </NavLink>
                )}
                {!user && (
                  <NavLink
                    to="/signin"
                    className={getClassNames}
                    onClick={() => !largeScreen && setSidebarOpen(false)}
                  >
                    <IoIosLogIn className="text-xl inline mr-2 mb-1" />
                    Sign In
                  </NavLink>
                )}
                {eventDetails && (
                  <NavLink
                    to="#"
                    className={getClassNames}
                    onClick={() => !largeScreen && setSidebarOpen(false)}
                  >
                    <TbListDetails className="text-xl inline mr-2 mb-1" />
                    Event Details
                  </NavLink>
                )}
                {bookings === "booking" && (
                  <NavLink
                    to="#"
                    className={bookings === "booking" ? "active" : "inactive"}
                    onClick={() => !largeScreen && setSidebarOpen(false)}
                  >
                    <MdEditDocument className="text-xl inline mr-2 mb-1" />
                    Booking
                  </NavLink>
                )}
                {payment === "payment" && (
                  <NavLink
                    to="#"
                    className={payment !== "payment" ? "active" : "inactive"}
                    onClick={() => !largeScreen && setSidebarOpen(false)}
                  >
                    <MdPayment className="text-xl inline mr-2 mb-1" />
                    Payments
                  </NavLink>
                )}
              </div>

              <div>
                {user && (
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center bg-indigo-500 hover:bg-indigo-700 border-0 py-2 px-4 text-white font-medium focus:outline-none rounded text-base mt-4 md:mt-0 w-full"
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
            </div>
          </div>
        </div>
        <div
          className="w-full lg:w-4/5 h-screen overflow-y-auto"
          bis_skin_checked="1"
        >
          <div
            className="flex flex-wrap p-5 items-center justify-between border-b lg:hidden"
            bis_skin_checked="1"
          >
            <Link to="/">
              <span className="text-2xl font-bold">Ticket Booking</span>
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <HiOutlineBars3 className="text-2xl" />
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
