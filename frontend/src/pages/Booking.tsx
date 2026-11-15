
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
    return (
      <div className="p-8 text-center text-gray-500">
        <Text>Loading bookings...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-8 rounded-xl bg-red-50 p-5 text-red-600">
        <Text>{error}</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8F5] p-8">

      {/* Page Header */}
      <div className="mb-8">
        <Text variant="h1" className="text-2xl font-bold text-[#42694D]">
          Bookings
        </Text>

        <Text variant="p" className="mt-1 text-sm text-gray-500">
          Manage and monitor all hotel reservations.
        </Text>
      </div>

      {/* Bookings Card */}
      <div className="overflow-hidden rounded-2xl border border-[#E5EBE5] bg-white shadow-sm">

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-[#E5EBE5] px-6 py-5">

          <div>
            <Text variant="h2" className="text-lg font-semibold text-[#42694D]">
              All Reservations
            </Text>

            <Text variant="p" className="mt-1 text-sm text-gray-500">
              View booking details and update reservation status.
            </Text>
          </div>

          <span className="rounded-full bg-[#EAF1EB] px-4 py-2 text-sm font-semibold text-[#42694D]">
            {bookings.length} Bookings
          </span>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-[#42694D] text-white">
              <tr>
                <th className="whitespace-nowrap px-5 py-4 text-sm font-medium">Booking ID</th>
                <th className="whitespace-nowrap px-5 py-4 text-sm font-medium">User ID</th>
                <th className="whitespace-nowrap px-5 py-4 text-sm font-medium">Room ID</th>
                <th className="whitespace-nowrap px-5 py-4 text-sm font-medium">Guests</th>
                <th className="whitespace-nowrap px-5 py-4 text-sm font-medium">Rooms</th>
                <th className="whitespace-nowrap px-5 py-4 text-sm font-medium">Total Price</th>
                <th className="whitespace-nowrap px-5 py-4 text-sm font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EDF1ED]">

              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="transition-colors duration-200 hover:bg-[#F6F9F6]"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-[#42694D]">
                    #{booking.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {booking.user_id}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {booking.room_id}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {booking.guests}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {booking.rooms_booked}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-800">
                    R {Number(booking.total_price).toFixed(2)}
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(
                          booking.id,
                          e.target.value as BookingStatus
                        )
                      }
                      className="cursor-pointer rounded-lg border border-[#DCE6DD] bg-[#F6F9F6] px-3 py-2 text-sm font-medium text-[#42694D] outline-none transition focus:border-[#42694D] focus:ring-2 focus:ring-[#42694D]/20"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Approved">Approved</option>
                    </select>
                  </td>
                </tr>
              ))}

              {bookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};


