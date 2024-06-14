import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const TicketBookingForm = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBooking = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const totalPrice = parseInt(form.totalPrice.value);

    try {
      if (ticketQuantity > 0) {
        const response = await axiosInstance.post("/bookings", {
          eventId,
          name,
          email,
          ticketQuantity,
          totalPrice,
        });
        if (event?.ticketPrice !== 0) {
          navigate(`/payment/${response?.data?.insertedId}`);
        } else {
          navigate("/");
          toast.success("Booking successful");
        }
      } else {
        toast.warning("Ticket quantity must greater than 0");
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(`/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchEvent();
  }, [eventId]);

  return (
    <form
      onSubmit={handleBooking}
      className="space-y-6"
      action="#"
      method="POST"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Name
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={user?.name}
            autoComplete="name"
            required
            className="input"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={user?.email}
            autoComplete="email"
            required
            className="input"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Number of tickets
        </label>
        <div className="mt-2">
          <input
            onChange={(e) => setTicketQuantity(parseInt(e.target.value))}
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            defaultValue={1}
            autoComplete="quantity"
            required
            className="input"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="totalPrice"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Total Price
        </label>
        <div className="mt-2">
          <input
            id="totalPrice"
            name="totalPrice"
            type="number"
            readOnly
            value={
              isNaN(ticketQuantity * event?.ticketPrice)
                ? ""
                : ticketQuantity * event?.ticketPrice
            }
            required
            className="input"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {event?.ticketPrice !== 0 ? "Proceed to payment" : "Book"}
        </button>
      </div>
    </form>
  );
};

export default TicketBookingForm;
