import { Outlet } from 'react-router-dom'
import {Sidebar} from '../ui/Sidebar'

export const MainLayout = () => {
  return (
    <div className='flex  -h-screen'>
        <Sidebar />
        <main className='flex-1'>
            <Outlet />
        </main>
        

    </div>
  )
}
