
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import {
  fetchRooms,
  deleteRoom,
  selectRoom,
  openRoomModal,
} from "../redux/RoomSlice";
import { Text } from "../components/ui/Text";
import { RoomForm } from "../components/ui/RoomForm";

export const ManageRooms = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { rooms, loading, error } = useSelector(
    (state: RootState) => state.rooms
  );

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleDelete = (id: number, hotelId: number) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      dispatch(deleteRoom({ id, hotelId }));
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="rounded-xl bg-white p-6 text-[#42694D] shadow-sm">
          Loading rooms...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="rounded-xl bg-red-50 p-5 text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8F5] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Text
              variant="h1"
              className="text-2xl font-bold text-[#42694D]"
            >
              Manage Rooms
            </Text>

            <p className="mt-2 text-sm text-gray-500">
              Manage your hotel's room types, prices and availability.
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(openRoomModal())}
            className="rounded-lg bg-[#7E9E85] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#42694D]"
          >
            + Add Room
          </button>
        </div>

        {/* Room Summary */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Room Types</p>
            <p className="mt-2 text-3xl font-bold text-[#42694D]">
              {rooms.length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Room Availability</p>
            <p className="mt-2 text-3xl font-bold text-[#42694D]">
              {rooms.reduce(
                (total, room) => total + Number(room.quantity),
                0
              )}
            </p>
          </div>
        </div>

        {/* Rooms Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5">
            <h2 className="font-semibold text-gray-800">
              Room Inventory
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              View and manage all registered rooms.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[#42694D] text-white">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold">
                    Room Type
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold">
                    Hotel ID
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold">
                    Price per Night
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold">
                    Capacity
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold">
                    Quantity
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {rooms.map((room) => (
                  <tr
                    key={room.id}
                    className="border-b border-gray-100 transition hover:bg-[#F6F8F5] last:border-0"
                  >
                    <td className="px-5 py-4 font-medium text-gray-800">
                      {room.room_type}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      #{room.hotel_id}
                    </td>

                    <td className="px-5 py-4 font-medium text-[#42694D]">
                      R {Number(room.price_per_night).toFixed(2)}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {room.capacity} guests
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-[#EAF1EB] px-3 py-1 text-sm font-medium text-[#42694D]">
                        {room.quantity}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => dispatch(selectRoom(room))}
                          className="rounded-lg bg-[#7E9E85] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#42694D]"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(room.id, room.hotel_id)
                          }
                          className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {rooms.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-10 text-center text-gray-500"
                    >
                      <p className="font-medium">No rooms found.</p>
                      <p className="mt-1 text-sm">
                        Click Add Room to create your first room.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        
        <RoomForm />

      </div>
    </div>
  );
};
