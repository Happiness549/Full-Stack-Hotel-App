
import { Button } from '../components/ui/Button'
import { Text } from '../components/ui/Text'
import { Sidebar } from '../components/ui/Sidebar'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchBookings } from '../redux/BookingSlice'
import type { RootState } from '../store'
import type { AppDispatch } from '../store'
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/LoginSlice';

export const Admin = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const { bookings, loading, error } = useSelector((state: RootState) => state.bookings)

  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

useEffect(() => {
  dispatch(fetchBookings())
}, [dispatch])

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b px-8 py-5">
          <div>
            <Text variant="h1" className="text-2xl font-semibold text-[#42694D]">
              Admin Dashboard
            </Text>
            <Text variant="p" className="mt-1 text-sm text-gray-500">
              Manage booked users, hotels and rooms.
            </Text>
          </div>

        <Button
          text="Logout"
          className="rounded-lg bg-[#7E9E85] px-5 py-2 text-white"
          onClick={handleLogout}
        />
        </header>

        <div className="space-y-10 p-8">
          <section>
            <Text variant="h2" className="mb-4 text-xl font-semibold text-[#42694D]">
              Booked Users
            </Text>

            <table className="w-full text-left">
              <thead className="border-b bg-[#7E9E85] text-white">
                <tr>
                  <th className="p-3 font-medium">Guest</th>
                  <th className="p-3 font-medium">Hotel</th>
                  <th className="p-3 font-medium">Check-in</th>
                  <th className="p-3 font-medium">Check-out</th>
                  <th className="p-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Loading booked users...
                  </td>
                </tr>
              )}

              {error && !loading && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && bookings.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="p-3">
                    {booking.guest_name} {booking.guest_surname}
                  </td>
                  <td className="p-3">{booking.hotel_name}</td>
                  <td className="p-3">
                    {new Date(booking.check_in).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {new Date(booking.check_out).toLocaleDateString()}
                  </td>
                  <td className="p-3 capitalize">{booking.status}</td>
                </tr>
              ))}

              {!loading && !error && bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-sm text-gray-500">
                    No booked users to display yet.
                  </td>
                </tr>
              )}
            </tbody>
            </table>
          </section>

          
        </div>
      </main>
    </div>
  )
}
