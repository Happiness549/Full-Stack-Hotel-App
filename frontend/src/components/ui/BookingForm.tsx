
import type { Room } from "../../redux/RoomSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { addBooking } from "../../redux/BookingSlice";
import { createPayment } from "../../redux/PaymentSlice";

interface BookingFormProps {
  room: Room;
}

export const BookingForm = ({ room }: BookingFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
    const userData = useSelector((state: RootState) => state.login.userData);
    const token = useSelector((state: RootState) => state.login.token);

    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [guests, setGuests] = useState(1);
    const [room_booked, setRoomBooked] = useState(1);

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    const nights = Math.ceil(
    (checkoutDate.getTime() - checkinDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const total_price = nights * room.price_per_night * room_booked;

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       console.log("HandleSubmit is running");
  e.preventDefault();

  if (!userData?.id || !token) {
    alert("Please log in before booking");
    return;
  }

  if (nights <= 0) {
    alert("Please select valid check-in and check-out dates");
    return;
  }

    try {
     const result = await dispatch(
      addBooking({
        userId: userData.id,
        roomId: room.id,
        bookingData: {
          checkin,
          checkout,
          guests,
          room_booked,
          total_price,
        },
        token,
      })
    ).unwrap();

    const bookingId = result.booking.id;
    
    const paymentResult = await dispatch(
      createPayment({ bookingId, token })
    ).unwrap();
    

    window.location.href = paymentResult.paystackUrl;
    } catch (error) {
      alert(typeof error === "string" ? error : "Booking failed");
    }
};

  
return (
  <form onSubmit={handleSubmit} className="space-y-5">
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Check-in Date
      </label>
      <input
        type="date"
        value={checkin}
        onChange={(e) => setCheckin(e.target.value)}
        required
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Check-out Date
      </label>
      <input
        type="date"
        value={checkout}
        onChange={(e) => setCheckout(e.target.value)}
        min={checkin || undefined}
        required
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Number of Guests
      </label>
      <input
        type="number"
        min={1}
        max={room.capacity}
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        required
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Number of Rooms
      </label>
      <input
        type="number"
        min={1}
        max={room.quantity}
        value={room_booked}
        onChange={(e) => setRoomBooked(Number(e.target.value))}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
      />
    </div>

    <div className="rounded-lg bg-green-50 p-4">
      <p className="text-sm text-gray-600">Total Price</p>
      <p className="mt-1 text-2xl font-bold text-green-700">
        R{nights > 0 && checkin && checkout ? total_price : 0}
      </p>
    </div>

    <button
      type="submit"
      className="w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
    >
      Confirm Booking
    </button>
  </form>
);
}