
import {Text} from '../ui/Text'
import { Link }from 'react-router-dom'
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";



export const Sidebar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // const handleLogout = () => {
    // // dispatch(logout());
     
    // navigate("/login");
    // };

    return(
        
    <div className='bg-[#F9F5F2] min-h-screen w-50 rounderd-xl ml-5 border border-[#7E9E85]'>

        
            <Text variant={'h1'} className='text-white text-md mt-10'>Admin</Text>
        
        <div className='flex flex-col ml-14 gap-10 mt-20 '>
            <Link to='/Home'>
             <Text variant={'p'} className='text-white '>Accomodation</Text>
            </Link>
           
    
           {/* <button onClick={handleLogout}className="text-[#001C44] hover:text-[#2D99AE] transition-colors  ">
           <Text variant={'p'} className='text-white mr-25'>Logout</Text>
           </button> */}
           
            <Link to='/Profile'>
            <Text variant={'p'} className='text-white'>Profile</Text>
           </Link>
           

        </div>
    </div>

    )
}