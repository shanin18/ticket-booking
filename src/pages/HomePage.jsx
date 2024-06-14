import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../utils/axiosInstance";
import LoadingSpinner from "../components/others/LoadingSpinner";
import toast from "react-hot-toast";

const HomePage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/events");
        setEvents(response.data);
      } catch (error) {
        toast.error(error?.message);
      }
    };

    fetchEvents();
  }, []);

  if (!events) {
    return <LoadingSpinner />;
  }

  return (
    <section className="max-w-6xl mx-auto">
      <h2 className="text-4xl text-center my-12 font-medium">Events</h2>

      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        bis_skin_checked="1"
      >
        {events?.map((event) => (
          <div key={event?._id} className="border" bis_skin_checked="1">
            <div className="h-56 overflow-hidden" bis_skin_checked="1">
              <img
                className="object-cover object-center h-full w-full"
                src={event?.image}
                alt="event image"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                {event?.title}
              </h2>
              <p className="text-base leading-relaxed mt-2 mb-4">
                {event?.description}
              </p>
              {user && (
                <Link
                  to={`/event/${event?._id}`}
                  className="font-medium text-indigo-500"
                >
                  View Details
                </Link>
              )}
              {!user && (
                <p>
                  Please{" "}
                  <Link to="/signin" className="text-indigo-500">
                    sign in
                  </Link>{" "}
                  to view details!
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomePage;
