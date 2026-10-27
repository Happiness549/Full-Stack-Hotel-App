import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchHotels, deleteHotel,openHotelModal, startEditHotel } from "../redux/HotelSlice";
import { HotelForm } from "../components/ui/HotelForm";

const AdminHotels = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { hotels, loading, error } = useSelector((state: RootState) => state.hotels);

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Hotels Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your hotel listings
          </p>
        </div>

       <button
        onClick={() => dispatch(openHotelModal())}
        className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
        + Add Hotel
      </button>
      </div>

      {loading && <p>Loading hotels...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-left">
            <thead className="bg-green-50 text-sm text-gray-700">
              <tr>
                <th className="p-4">Hotel</th>
                <th className="p-4">Location</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="border-t border-gray-100">
                  <td className="p-4 font-medium text-gray-800">
                    {hotel.name}
                  </td>
                  <td className="p-4 text-gray-600">
                    {hotel.city}, {hotel.country}
                  </td>
                  <td className="p-4">
                    {hotel.star_rating} stars
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                     <button
                            onClick={() => dispatch(startEditHotel(hotel))}
                            className="font-medium text-green-700 hover:text-green-900"
                            >
                            Edit
                            </button>
                            <button
                            onClick={() => {
                                if (window.confirm(`Delete ${hotel.name}?`)) {
                                dispatch(deleteHotel(hotel.id!));
                                }
                            }}
                            className="font-medium text-red-600 hover:text-red-800">
                        Delete
                        </button>
                                            </div>
                  </td>
                </tr>
              ))}

              {hotels.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">
                    No hotels found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <HotelForm />
    </div>
  );
};

export default AdminHotels;