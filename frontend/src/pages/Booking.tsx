import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchBookings, updateBookingStatus } from "../redux/BookingSlice";
import { Text } from "../components/ui/Text";
import type { BookingStatus } from "../redux/BookingSlice";

export const Bookings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, loading, error } = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleStatusChange = (id: number, status: BookingStatus) => {
    dispatch(updateBookingStatus({ id, status }));
  };

  if (loading) {
    return <Text variant={'p'}>Loading bookings...</Text>;
  }

  if (error) {
    return <Text variant={'p'}>{error}</Text>;
  }

  return (
    <div className="p-6">
      <Text variant={'h1'} className="mb-6 text-2xl font-bold">Bookings</Text>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-green-100">
            <tr>
              <th className="p-3">Booking ID</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Room ID</th>
              <th className="p-3">Guests</th>
              <th className="p-3">Rooms</th>
              <th className="p-3">Total Price</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="p-3">{booking.id}</td>
                <td className="p-3">{booking.user_id}</td>
                <td className="p-3">{booking.room_id}</td>
                <td className="p-3">{booking.guests}</td>
                <td className="p-3">{booking.rooms_booked}</td>
                <td className="p-3">
                  R {Number(booking.total_price).toFixed(2)}
                </td>
                <td className="p-3">
                <select
                  value={booking.status}
                  onChange={(e) =>
                    handleStatusChange(
                      booking.id,
                      e.target.value as BookingStatus
                    )
                  }
                  className="rounded border border-gray-300 p-2"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


