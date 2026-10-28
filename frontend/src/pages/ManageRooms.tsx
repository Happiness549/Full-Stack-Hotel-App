import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchRooms, deleteRoom, selectRoom } from "../redux/RoomSlice";
import { Text } from "../components/ui/Text";
import { RoomForm } from "../components/ui/RoomForm";
import { Button } from "../components/ui/Button";
import { openRoomModal } from "../redux/RoomSlice";


export const ManageRooms = () => {
    const dispatch = useDispatch<AppDispatch>();

const { rooms, loading, error } = useSelector((state: RootState) => state.rooms);

useEffect(() => {
  dispatch(fetchRooms());
}, [dispatch]);

const handleDelete = (id: number, hotelId: number) => {
  if (window.confirm("Are you sure you want to delete this room?")) {
    dispatch(deleteRoom({ id, hotelId }));
  }
};

if (loading) {
  return <Text variant="p">Loading rooms...</Text>;
}

if (error) {
  return <Text variant="p">{error}</Text>;
}

    return(
        <>
        
  <div className="p-6">
    <Text variant="h1" className="mb-6 text-2xl font-bold">
      Manage Rooms
    </Text>
    <section>
    <button
              
              className="rounded-lg bg-[#7E9E85] px-5 py-2 text-white"
              onClick={() => dispatch(openRoomModal())}
            >
                Add Room
                </button>

        
          </section>

    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left">
        <thead className="bg-green-100">
          <tr>
            <th className="p-3">Room Type</th>
            <th className="p-3">Hotel ID</th>
            <th className="p-3">Price per Night</th>
            <th className="p-3">Capacity</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="border-t">
              <td className="p-3">{room.room_type}</td>
              <td className="p-3">{room.hotel_id}</td>
              <td className="p-3">
                R {Number(room.price_per_night).toFixed(2)}
              </td>
              <td className="p-3">{room.capacity}</td>
              <td className="p-3">{room.quantity}</td>
              <td className="p-3">
                <button
                    onClick={() => dispatch(selectRoom(room))}
                    className="mr-2 rounded bg-[#7E9E85] px-3 py-1 text-white"
                    >
                Edit
                </button>


                <button
                    onClick={() => handleDelete(room.id, room.hotel_id)}
                    className="rounded bg-red-400 px-3 py-1 text-white"
                >
                    Delete
                </button>
                </td>
            </tr>
          ))}

          {rooms.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500">
                No rooms found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <RoomForm />
    </div>
  </div>

        </>
    )
}