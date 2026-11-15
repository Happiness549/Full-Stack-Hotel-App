
import { Text } from '../components/ui/Text'
import { Sidebar } from '../components/ui/Sidebar'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchBookings } from '../redux/BookingSlice'
import type { RootState } from '../store'
import type { AppDispatch } from '../store'
import { AdminForm } from '../components/ui/AdminForm';
import { openAdminModal } from '../redux/AdminSLice';

export const Admin = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { bookings, loading, error } = useSelector((state: RootState) => state.bookings)

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch])

  return (
    <div className="flex min-h-screen bg-[#F6F8F5]">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-[#E5EBE5] bg-white px-8 py-5 shadow-sm">
          <div>
            <Text variant="h1" className="text-2xl font-semibold text-[#42694D]">
              Admin Dashboard
            </Text>
            <Text variant="p" className="mt-1 text-sm text-gray-500">
              Manage booked users, hotels and rooms.
            </Text>
          </div>

          <button
            className="rounded-xl bg-[#42694D] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-[#34553D] hover:shadow-md"
            onClick={() => dispatch(openAdminModal())}
          >
            <Text>Add Admin</Text>
          </button>
        </header>

        <div className="space-y-10 p-8">

          {/* Booked Users Card */}
          <section className="overflow-hidden rounded-2xl border border-[#E5EBE5] bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-[#E5EBE5] px-6 py-5">
              <div>
                <Text variant="h2" className="text-xl font-semibold text-[#42694D]">
                  Booked Users
                </Text>
                <Text variant="p" className="mt-1 text-sm text-gray-500">
                  Overview of all hotel reservations.
                </Text>
              </div>

              <span className="rounded-full bg-[#EAF1EB] px-4 py-1.5 text-sm font-medium text-[#42694D]">
                {bookings.length} Bookings
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#42694D] text-white">
                  <tr>
                    <th className="whitespace-nowrap px-6 py-4 text-sm font-medium">Guest</th>
                    <th className="whitespace-nowrap px-6 py-4 text-sm font-medium">Hotel</th>
                    <th className="whitespace-nowrap px-6 py-4 text-sm font-medium">Check-in</th>
                    <th className="whitespace-nowrap px-6 py-4 text-sm font-medium">Check-out</th>
                    <th className="whitespace-nowrap px-6 py-4 text-sm font-medium">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EDF1ED]">

                  {loading && (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                        Loading booked users...
                      </td>
                    </tr>
                  )}

                  {error && !loading && (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-red-500">
                        {error}
                      </td>
                    </tr>
                  )}

                  {!loading && !error && bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="transition duration-200 hover:bg-[#F6F9F6]"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                        {booking.guest_name} {booking.guest_surname}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {booking.hotel_name}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {new Date(booking.check_in).toLocaleDateString()}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {new Date(booking.check_out).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-[#EAF1EB] px-3 py-1 text-xs font-semibold capitalize text-[#42694D]">
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {!loading && !error && bookings.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                        No booked users to display yet.
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>

          </section>

          <AdminForm />

        </div>
      </main>
    </div>
  )
}
