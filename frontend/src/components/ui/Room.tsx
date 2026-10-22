import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { openRoomModal, closeRoomModal } from "../../redux/RoomSlice";
import { useEffect } from "react";
import { fetchRooms } from "../../redux/RoomSlice";


interface RoomsProps {
  hotelId: number;
}
export const Room = ({ hotelId }: RoomsProps) => {
const dispatch = useDispatch<AppDispatch>();
const { rooms, loading, error } = useSelector((state: RootState) => state.rooms);
const hotelRooms = rooms.filter((room) => room.hotel_id === hotelId);

useEffect(() => {
  dispatch(fetchRooms());
}, [dispatch]);
  return (





    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-[#42694D]">
        Available Rooms
      </h2>

      <p className="mt-2 text-gray-600">
        Choose a room for your stay.
      </p>

          {loading && <p>Loading rooms...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && hotelRooms.length === 0 && (
        <p className="mt-4 text-gray-600">
            No rooms are available for this hotel yet.
        </p>
        )}

      <div className="mt-5 overflow-x-auto  ">
        <table className=" min-w-[900px] text-left">
          <thead className="bg-[#7E9E85] text-white">
            <tr>
              <th className="px-5 py-4">Room type</th>
              <th className="px-5 py-4">Price per night</th>
              <th className="px-5 py-4">Reserve</th>
            </tr>
          </thead>

          <tbody>
                        {hotelRooms.map((room) => (
            <tr key={room.id} className="border-t">
                <td className="px-5 py-4">
                <button
                    onClick={() => dispatch(openRoomModal())}
                    className="font-medium text-[#42694D] underline"
                >
                    {room.room_type}
                </button>
                </td>

                <td className="px-5 py-4 text-gray-700">
                R{room.price_per_night} per night
                </td>

                <td className="px-5 py-4">
                <button className="rounded-lg bg-[#7E9E85] px-4 py-2 text-white hover:bg-[#64866D]">
                    Reserve
                </button>
                </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
