import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { openRoomModal, closeRoomModal } from "../../redux/RoomSlice";
import { useEffect } from "react";
import { fetchRooms } from "../../redux/RoomSlice";
import { selectRoom } from "../../redux/RoomSlice";
import {Text} from './Text'


interface RoomsProps {
  hotelId: number;
}
export const Room = ({ hotelId }: RoomsProps) => {
const dispatch = useDispatch<AppDispatch>();
const { rooms, loading, error, selectedRoom, isRoomModalOpen } =useSelector((state: RootState) => state.rooms);
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
                   onClick={() => dispatch(selectRoom(room))}
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

      {isRoomModalOpen && selectedRoom && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ">
    <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl max-w-3xl  h-[90vh]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#42694D]">
          {selectedRoom.room_type}
        </h2>

        <button
          onClick={() => dispatch(closeRoomModal())}
          className="text-2xl text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
      </div>

      <p className="mt-4 text-gray-700">
        {selectedRoom.description}
      </p>

      <p className="mt-3 font-semibold text-[#42694D]">
        R{selectedRoom.price_per_night} per night
      </p>

      <p className="mt-2 text-gray-600">
        Capacity: {selectedRoom.capacity} guests
      </p>

      <p className="mt-2 text-gray-600">
        Available rooms: {selectedRoom.quantity}
      </p>


      <section className="mt-8">
        <Text variant={'h2'} className="text-xl font-bold text-[#42694D]">Most popular facilities</Text>
      
        <div className="mt-4 grid grid-cols-2 gap-4 ">
          {selectedRoom.facilities.split(",").map((facility: string) => (
            <Text variant={'p'} key={facility} className="text-gray-700"> ✓ {facility.trim()}</Text>
          ))}
        </div>
      </section>

    </div>
  </div>
)}
    </section>
  )
}
