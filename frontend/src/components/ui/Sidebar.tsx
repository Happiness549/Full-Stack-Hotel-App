
import {Text} from '../ui/Text'
import { Link }from 'react-router-dom'
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";



export const Sidebar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
    // dispatch(logout());
     
    navigate("/login");
    };

    return(
        
    <div className=' min-h-screen w-40 rounderd-xl bg-[#7E9E85]'>

            
        <div className='flex flex-col ml-7 gap-10 mt-20 '>
            <Link to='/adminHotels'>
             <Text variant={'p'} className='text-white '>Accomodation</Text>
            </Link>

            <Link to='/bookings'>
             <Text variant={'p'} className='text-white '>Bookings</Text>
            </Link>
            <Link to='/rooms'>
             <Text variant={'p'} className='text-white '>Rooms</Text>
            </Link>
           
            <Link to='/Profile'>
            <Text variant={'p'} className='text-white'>Profile</Text>
           </Link>

           <button onClick={handleLogout}className="text-[#001C44] hover:text-[#2D99AE] transition-colors  ">
           <Text variant={'p'} className='text-white mr-25'>Logout</Text>
           </button> 
           

        </div>
    </div>

    )
}