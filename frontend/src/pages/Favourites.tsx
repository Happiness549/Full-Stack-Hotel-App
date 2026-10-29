
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchFavourites } from "../redux/FavouritesSlice";
import { HotelCard } from "../components/ui/HotelCard";
import { fetchHotels } from "../redux/HotelSlice";
import {Text} from '../components/ui/Text'
import { Link } from "react-router-dom";

export const Favourites = () => {
  const dispatch = useDispatch<AppDispatch>();

  const favourites = useSelector((state: RootState) => state.favourites.favourites);
  const hotels = useSelector((state: RootState) => state.hotels.hotels);

  useEffect(() => {
  dispatch(fetchHotels());
  dispatch(fetchFavourites());
}, [dispatch]);
  const favouriteHotels = hotels.filter((hotel) =>favourites.some((favourite) => favourite.hotel_id === hotel.id));
  console.log("Saved favourites:", favourites);
console.log("Loaded hotels:", hotels);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between bg-white px-8 py-5 shadow-sm">
        <Text variant={'h1'} className="text-2xl font-bold text-green-800">StayClear</Text>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-green-700"> Home</Link>
          <Link to="/my-bookings" className="text-gray-700 hover:text-green-700">My Bookings</Link>
          <Link to="/favourites" className="text-gray-700 hover:text-green-700">Favourites</Link>
          <Link to="/profile" className="text-gray-700 hover:text-green-700">Profile</Link>
        </div>
      </nav>
    <div >
      <h1 className="text-2xl font-bold text-green-800 mt-10 ml-110">
        My Favourites
      </h1>

      <p className="text-gray-600 mt-4 ml-110">
        Hotels you have saved.
      </p>

      {favouriteHotels.length === 0 ? (
        <p className="text-gray-500">
          You haven't saved any hotels yet.
        </p>
      ) : (
        <div className="flex flex-wrap gap-5 w-250 m-auto mt-6">
          {favouriteHotels.map((hotel) => (
            <HotelCard key={hotel.id} HotelList={hotel} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
};
