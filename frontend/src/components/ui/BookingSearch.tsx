
import { useState } from "react";

export const BookingSearch = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      destination,
      checkIn,
      checkOut,
      guests,
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto grid max-w-6xl grid-cols-1 gap-4 rounded-2xl bg-white p-5 shadow-xl md:grid-cols-2 lg:grid-cols-5 -mt-12"
    >
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Destination
        </label>
        <input
          type="text"
          placeholder="Where are you going?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Check-in
        </label>
        <input
          type="date"
          value={checkIn}
          min={new Date().toLocaleDateString("en-CA")}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Check-out
        </label>
        <input
          type="date"
          value={checkOut}
          min={checkIn || new Date().toLocaleDateString("en-CA")}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Guests
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
        >
          <option value={1}>1 guest</option>
          <option value={2}>2 guests</option>
          <option value={3}>3 guests</option>
          <option value={4}>4 guests</option>
          <option value={5}>5 guests</option>
          <option value={6}>6 guests</option>
        </select>
      </div>

      <div className="flex items-end">
        <button
          type="submit"
          className="w-full rounded-lg bg-[#7E9E85] p-3 font-semibold text-white transition hover:bg-green-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};
