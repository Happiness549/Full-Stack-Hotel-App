import { Button } from '../components/ui/Button'
import {Text} from '../components/ui/Text'
import { Sidebar } from '../components/ui/Sidebar'
import { HotelForm } from '../components/ui/HotelForm'
import { openHotelModal } from '../redux/HotelSlice'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store'

export const Admin = () => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="min-w-0 flex-1">
    
      <header className="flex min-h-20 items-center justify-between gap-4 bg-white border-b border-[#7E9E85]/30 px-6 py-4 md:px-10">
        <div>
            <Text variant={'h1'} className="text-2xl font-semibold text-[#42694D]">Admin Dashboard</Text>
            <Text variant={'p'} className="mt-1 text-sm text-gray-600">Manage your hotel and reservations</Text>
        </div>

        <Button  text={"Logout"} className="rounded-lg bg-[#7E9E85] px-5 py-2.5 font-medium text-white transition hover:bg-[#64866D]"
        />
      </header>

        <div className="space-y-8 bg-white p-6 md:p-10">
          {/* Booked Users */}
          <section className="rounded-2xl border border-[#7E9E85]/40 bg-white p-6 shadow-sm md:p-8">
            <Text variant={'h2'} className="text-xl font-semibold text-[#42694D]"> Booked Users</Text>
            <Text variant={'p'} className="mt-1 text-sm text-[#42694D]">View guests who have booked a stay at your hotel.</Text>

            <div className="mt-6 overflow-x-auto rounded-xl border border-[#7E9E85]/30">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="bg-[#7E9E85] text-sm text-white">
                    <th className="px-4 py-4 font-medium">Guest</th>
                    <th className="px-4 py-4 font-medium">Hotel</th>
                    <th className="px-4 py-4 font-medium">Check-in</th>
                    <th className="px-4 py-4 font-medium">Check-out</th>
                    <th className="px-4 py-4 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="bg-white">
                    <td colSpan={5} className="px-4 py-12 text-center">
                      <p className="font-medium text-[#42694D]">
                        No bookings to display yet
                      </p>
                      <p className="mt-1 text-sm text-[#7E9E85]">
                        Guest reservations will appear here.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          
          <section className="rounded-2xl border border-[#7E9E85]/40 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <Text variant={'h2'} className="text-xl font-semibold text-[#42694D]">Hotel Management</Text>
                <Text variant={'p'} className="mt-1 text-sm text-[#42694D]">Add and manage your accommodation listings.</Text>
              </div>

              <Button
                text="Add New Hotel"
                className="rounded-xl bg-[#7E9E85] px-6 py-3 font-medium text-white transition hover:bg-[#64866D]"
                id="openModalBtn"
                onClick={() => dispatch(openHotelModal())}
              />
            </div>

            <div className="mt-6 border-t border-[#7E9E85]/30 pt-6">
              <HotelForm />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}