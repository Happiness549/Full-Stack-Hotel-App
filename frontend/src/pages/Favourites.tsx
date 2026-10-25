
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchFavourites } from "../redux/FavouritesSlice";
import { HotelCard } from "../components/ui/HotelCard";
import { fetchHotels } from "../redux/HotelSlice";

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
    <div className="min-h-screen bg-white px-6 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-2">
        My Favourites
      </h1>

      <p className="text-gray-600 mb-6">
        Hotels you have saved.
      </p>

      {favouriteHotels.length === 0 ? (
        <p className="text-gray-500">
          You haven't saved any hotels yet.
        </p>
      ) : (
        <div className="flex flex-wrap gap-5">
          {favouriteHotels.map((hotel) => (
            <HotelCard key={hotel.id} HotelList={hotel} />
          ))}
        </div>
      )}
    </div>
  );
};
