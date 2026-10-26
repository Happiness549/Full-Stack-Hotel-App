
import { useLocation } from "react-router-dom";
import {BookingForm} from "../components/ui/BookingForm";
import type{ RootState } from "../store";
import { useSelector } from "react-redux";

export const BookingPage = () => {
const location = useLocation();
const room = location.state?.room;
const hotel = location.state?.hotel;
const images = useSelector((state: RootState) => state.images.images);

const primaryImage = images.find(
  (image) => image.hotel_id === hotel.id && image.is_primary
);

const hotelImage =
  primaryImage?.image_url ||
  images.find((image) => image.hotel_id === hotel.id)?.image_url;

  if (!room || !hotel) {
  return <p>Hotel or room not found. Please select a room again.</p>;
}

  
return (
  <div className="min-h-screen bg-gray-50">

    <nav className="flex items-center justify-between bg-white px-8 py-5 shadow-sm">
      <h1 className="text-2xl font-bold text-green-700">
        Hotel Booking
      </h1>

      <div className="flex gap-6 text-gray-700">
        <a href="/Home" className="hover:text-green-700">
          Home
        </a>
        <a href="/profile" className="hover:text-green-700">
          My Profile
        </a>
      </div>
    </nav>

    {/* Booking content */}
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-2">

 
{/* Left side: Hotel details */}
<div>
  <div className="mb-6 h-80 overflow-hidden rounded-2xl bg-green-100">
    <p className="flex h-full items-center justify-center text-gray-500">
      {hotelImage ? (
  <img
    src={hotelImage}
    alt={hotel.name}
    className="h-full w-full object-cover"
  />
) : (
  <p className="flex h-full items-center justify-center text-gray-500">
    Hotel picture
  </p>
)}
    </p>
  </div>

  <h2 className="text-3xl font-bold text-gray-800">
    {hotel.name}
  </h2>

  <div className="mt-3 flex items-center gap-2">
    <span className="text-yellow-500">
      {"★".repeat(hotel.star_rating)}
    </span>
    <span className="text-gray-600">
      {hotel.star_rating} Star Hotel
    </span>
  </div>

  <p className="mt-3 text-gray-600">
    {hotel.address}, {hotel.city}, {hotel.country}
  </p>
</div>


      {/* Right side: Booking form */}
      <div className="h-150 rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Complete Your Booking
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          Choose your dates and booking details below.
        </p>

        <BookingForm room={room} />
      </div>

    </div>
  </div>
);
}
