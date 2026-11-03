
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchMyBookings } from "../redux/BookingSlice";

export const MyBookings = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { bookings, loading, error } = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9F7] p-8">
        <p className="text-center text-gray-500">
          Loading your bookings...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F9F7] p-8">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9F7] px-5 py-12 sm:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Page heading */}
        <div className="mb-10 border-b border-[#E5EBE5] pb-8">
          <p className="mb-3 text-sm font-medium tracking-widest text-[#63816A]">
            YOUR STAYS
          </p>

          <h1 className="text-3xl font-semibold text-[#24392A] sm:text-5xl">
            My Bookings
          </h1>

          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            Keep track of your reservations and upcoming stays.
          </p>

          <div className="mt-6 inline-block rounded-2xl border border-[#E1E9E1] bg-white px-5 py-4 shadow-sm">
            <p className="text-2xl font-semibold text-[#42694D]">
              {bookings.length}
            </p>
            <p className="text-sm text-gray-500">
              Total reservations
            </p>
          </div>
        </div>

        {/* Empty bookings message */}
        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-[#E5EBE5] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EDF3ED] text-3xl">
              🏨
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-[#24392A]">
              Your next getaway starts here
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              You haven't made any bookings yet. Your reservations
              will appear here once you book a stay.
            </p>
          </div>
        ) : (

          /* Booking cards */
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="overflow-hidden rounded-3xl border border-[#E5EBE5] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Booking heading */}
                <div className="flex items-start justify-between gap-4 border-b border-[#EDF1ED] bg-[#F0F5F0] px-6 py-5">
                  <div>
                    <p className="text-xs font-medium tracking-widest text-[#6B896F]">
                      RESERVATION
                    </p>

                    <h2 className="mt-2 text-xl font-semibold text-[#24392A]">
                      Booking #{booking.id}
                    </h2>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      booking.status?.toLowerCase() === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status?.toLowerCase() === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : booking.status?.toLowerCase() === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="p-6">

                  {/* Guests and rooms */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-[#F7F9F7] p-4">
                      <p className="text-sm text-gray-500">
                        Guests
                      </p>
                      <p className="mt-2 text-xl font-semibold text-[#24392A]">
                        {booking.guests}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F7F9F7] p-4">
                      <p className="text-sm text-gray-500">
                        Rooms booked
                      </p>
                      <p className="mt-2 text-xl font-semibold text-[#24392A]">
                        {booking.rooms_booked}
                      </p>
                    </div>
                  </div>

                  {/* Total price */}
                  <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#E1E9E1] p-5">
                    <div>
                      <p className="text-sm text-gray-500">
                        Total price
                      </p>

                      <p className="mt-2 text-2xl font-semibold text-[#42694D]">
                        R{Number(booking.total_price).toFixed(2)}
                      </p>
                    </div>

                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF3ED] text-xl text-[#42694D]">
                      R
                    </span>
                  </div>

                  {/* Booking note */}
                  <p className="mt-5 border-t border-dashed border-[#E5EBE5] pt-5 text-xs text-gray-500">
                    Keep your booking ID for reference.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-10 text-center text-xs text-gray-400">
          Your stays, thoughtfully organised.
        </p>

      </div>
    </div>
  );
};


