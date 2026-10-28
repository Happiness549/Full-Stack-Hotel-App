
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { addRoom, updateRooms, closeRoomModal } from "../../redux/RoomSlice";

export const RoomForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isRoomModalOpen, selectedRoom } = useSelector((state: RootState) => state.rooms);

  const [formData, setFormData] = useState({
    hotel_id: 0,
    room_type: "",
    description: "",
    price_per_night: 0,
    capacity: 1,
    quantity: 1,
    facilities: "",
  });

  useEffect(() => {
    if (selectedRoom) {
      setFormData({
        hotel_id: selectedRoom.hotel_id,
        room_type: selectedRoom.room_type,
        description: selectedRoom.description,
        price_per_night: selectedRoom.price_per_night,
        capacity: selectedRoom.capacity,
        quantity: selectedRoom.quantity,
        facilities: selectedRoom.facilities,
      });
    } else {
      setFormData({
        hotel_id: 0,
        room_type: "",
        description: "",
        price_per_night: 0,
        capacity: 1,
        quantity: 1,
        facilities: "",
      });
    }
  }, [selectedRoom]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: [
        "hotel_id",
        "price_per_night",
        "capacity",
        "quantity",
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (selectedRoom) {
    await dispatch(
      updateRooms({
        ...formData,
        id: selectedRoom.id,
      })
    ).unwrap();

    dispatch(closeRoomModal());
  } else {
    await dispatch(addRoom(formData)).unwrap();
    dispatch(closeRoomModal());
  }
};

    if (!isRoomModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#42694D]">
            {selectedRoom ? "Edit Room" : "Add Room"}
          </h2>

          <button
            type="button"
            onClick={() => dispatch(closeRoomModal())}
            className="text-2xl text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block font-medium text-[#42694D]">
              Hotel ID
            </label>
            <input
              name="hotel_id"
              type="number"
              min="1"
              value={formData.hotel_id || ""}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#7E9E85]"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-[#42694D]">
              Room Type
            </label>
            <input
              name="room_type"
              value={formData.room_type}
              onChange={handleChange}
              placeholder="e.g. Deluxe Double Room"
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#7E9E85]"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-[#42694D]">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#7E9E85]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block font-medium text-[#42694D]">
                Price Per Night
              </label>
              <input
                name="price_per_night"
                type="number"
                min="0"
                step="0.01"
                value={formData.price_per_night}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#7E9E85]"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium text-[#42694D]">
                Guest Capacity
              </label>
              <input
                name="capacity"
                type="number"
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#7E9E85]"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium text-[#42694D]">
                Quantity
              </label>
              <input
                name="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#7E9E85]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-medium text-[#42694D]">
              Facilities
            </label>
            <textarea
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              placeholder="Wi-Fi, TV, air conditioning..."
              rows={2}
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#7E9E85]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => dispatch(closeRoomModal())}
              className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-[#7E9E85] px-5 py-2 font-semibold text-white hover:bg-[#64866D]"
            >
              {selectedRoom ? "Save Changes" : "Add Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomForm;
