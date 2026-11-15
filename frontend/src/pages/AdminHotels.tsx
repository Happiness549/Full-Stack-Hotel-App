
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import {fetchHotels, deleteHotel, openHotelModal,startEditHotel,} from "../redux/HotelSlice";
import { HotelForm } from "../components/ui/HotelForm";

const AdminHotels = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { hotels, loading, error } = useSelector(
    (state: RootState) => state.hotels
  );

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#F6F8F5] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#42694D]">
              Hotels Management
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage your hotel listings and information.
            </p>
          </div>

          <button
            onClick={() => dispatch(openHotelModal())}
            className="rounded-lg bg-[#7E9E85] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#42694D]"
          >
            + Add Hotel
          </button>
        </div>

        {/* Summary Card */}
        <div className="mb-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Hotels</p>
          <p className="mt-2 text-3xl font-bold text-[#42694D]">
            {hotels.length}
          </p>
        </div>

        
        {loading && (
          <div className="rounded-xl bg-white p-6 text-[#42694D] shadow-sm">
            Loading hotels...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        
        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <h2 className="font-semibold text-gray-800">
                Hotel Listings
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View and manage your registered hotels.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead className="bg-[#42694D] text-white">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Hotel
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Location
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {hotels.map((hotel) => (
                    <tr
                      key={hotel.id}
                      className="border-b border-gray-100 transition hover:bg-[#F6F8F5] last:border-0"
                    >
                      <td className="px-6 py-5">
                        <p className="font-semibold text-gray-800">
                          {hotel.name}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {hotel.city}, {hotel.country}
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-[#EAF1EB] px-3 py-1 text-sm font-medium text-[#42694D]">
                          ★ {hotel.star_rating} stars
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => dispatch(startEditHotel(hotel))}
                            className="font-semibold text-[#42694D] transition hover:text-[#7E9E85]"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${hotel.name}?`)) {
                                dispatch(deleteHotel(hotel.id!));
                              }
                            }}
                            className="font-semibold text-red-500 transition hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {hotels.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-10 text-center text-gray-500"
                      >
                        <p className="font-medium">No hotels found.</p>
                        <p className="mt-1 text-sm">
                          Click Add Hotel to create your first listing.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <HotelForm />
      </div>
    </div>
  );
};

export default AdminHotels;
