import { useParams } from "react-router-dom";
import TicketBookingForm from "../components/forms/TicketBookingForm";

const BookingPage = () => {
  const { eventId } = useParams();

  return (
    <section className="max-w-6xl mx-auto p-5 lg:px-0">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Book Tickets
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <TicketBookingForm eventId={eventId} />
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
