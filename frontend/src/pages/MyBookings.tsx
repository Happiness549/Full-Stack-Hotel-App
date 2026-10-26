
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchMyBookings } from "../redux/BookingSlice";

const MyBookings = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { bookings, loading, error } = useSelector(
    (state: RootState) => state.bookings
  );

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  if (loading) {
    return <p className="p-6">Loading your bookings...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>You haven't made any bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="rounded-lg border p-4">
              <p>Booking ID: {booking.id}</p>
              <p>Guests: {booking.guests}</p>
              <p>Rooms booked: {booking.rooms_booked}</p>
              <p>Total price: R{booking.total_price}</p>
              <p>Status: {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
