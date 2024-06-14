import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/others/LoadingSpinner";
import axiosInstance from "../utils/axiosInstance";
import BookingTable from "../components/others/BookingTable";
import toast from "react-hot-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(
          `/bookings/email/${user?.email}`
        );
        setBookings(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchEvent();
  }, [user?.email]);

  if (!bookings) {
    return <LoadingSpinner />;
  }

  return (
    <section className="max-w-6xl mx-auto p-5 lg:px-0">
      <div>
        {bookings?.length === 0 ? (
          <p className="text-lg font-medium text-center mt-12">
            No Bookings Found.
          </p>
        ) : (
          <BookingTable bookings={bookings} />
        )}
      </div>
    </section>
  );
};

export default MyBookings;
