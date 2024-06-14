import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../utils/axiosInstance";
import LoadingSpinner from "../components/others/LoadingSpinner";
import toast from "react-hot-toast";

const EventDetailsPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <LoadingSpinner />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div
        className="max-w-6xl mx-auto flex px-5 lg:px-0 py-24 items-center justify-center flex-col"
        bis_skin_checked="1"
      >
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src={event?.image}
          loading="lazy"
        />
        <div className="text-center lg:w-2/3 w-full" bis_skin_checked="1">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {event?.title}
          </h1>
          <p className="mb-8 leading-relaxed">{event?.description}</p>
          <p className="mb-8 leading-relaxed">
            Date:
            {new Date(event?.date).toLocaleDateString()}
          </p>
          <p className="mb-8 leading-relaxed">
            Time:
            {new Date(event?.time).toLocaleTimeString()}
          </p>
          <p className="mb-8 leading-relaxed">
            Location:
            {event?.location}
          </p>
          <p className="mb-8 leading-relaxed">
            Price:{" "}
            {event?.ticketPrice === 0 ? "free" : `$${event?.ticketPrice}`}
          </p>
          <p className="mb-8 leading-relaxed">
            Remaining Tickets: {event?.remainingTickets}
          </p>
          <div className="flex justify-center" bis_skin_checked="1">
            {user && (
              <Link to={`/booking/${event._id}`} className="text-indigo-500">
                Book Tickets
              </Link>
            )}
            {!user && (
              <p>
                Please{" "}
                <Link to="/signin" className="text-indigo-500">
                  sign in
                </Link>{" "}
                to book tickets.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
