
import { Text } from '../ui/Text'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../store'
import { logout } from '../../redux/LoginSlice'

export const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <aside className="min-h-screen w-56 bg-[#42694D] px-4 py-10 shadow-lg">

      <div className="mb-12 px-3">
        <Text variant="h2" className="text-xl font-bold text-white">
          Hotel Admin
        </Text>
        <Text variant="p" className="mt-1 text-xs text-green-100">
          Management Dashboard
        </Text>
      </div>

      <div className="flex flex-col gap-4">

        <Link to="/adminHotels" className="flex items-center gap-3 rounded-lg px-3 py-3 text-white hover:bg-[#7E9E85]">
          🏨 <Text className="text-white">Accommodation</Text>
        </Link>

        <Link to="/bookings" className="flex items-center gap-3 rounded-lg px-3 py-3 text-white hover:bg-[#7E9E85]">
          📅 <Text className="text-white">Bookings</Text>
        </Link>

        <Link to="/rooms" className="flex items-center gap-3 rounded-lg px-3 py-3 text-white hover:bg-[#7E9E85]">
          🛏️ <Text className="text-white">Rooms</Text>
        </Link>

        <Link to="/my-bookings" className="flex items-center gap-3 rounded-lg px-3 py-3 text-white hover:bg-[#7E9E85]">
          📋 <Text className="text-white">My Bookings</Text>
        </Link>

        <Link to="/Profile" className="flex items-center gap-3 rounded-lg px-3 py-3 text-white hover:bg-[#7E9E85]">
          👤 <Text className="text-white">Profile</Text>
        </Link>

      </div>

      <div className="mt-16 border-t border-green-200/30 pt-5">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-white hover:bg-red-500"
        >
          🚪 <Text className="text-white">Logout</Text>
        </button>
      </div>

    </aside>
  )
}
