import {Text} from '../components/ui/Text'
// import Trolley from '../assets/Trolley.webp'
import { Link } from 'react-router-dom'
import {HotelList} from '../components/ui/HotelList'
import { BookingSearch } from "../components/ui/BookingSearch";


export const Landing = () => {

    return(
        <>
        <section className="bg-[url('https://res.cloudinary.com/g1cepfbn/image/upload/v1792436708/download_5.jpg')] bg-cover bg-bottom bg-center bg-no-repeat h-[45vh] w-full  ">
        <div className='flex gap-5 ml-320 '>
            <Text variant={'h3'}className='text-[#1A2E1F] '><Link to='/register'>Register</Link></Text>
            <Text variant={'h3'} className='text-[#1A2E1F] '><Link to='/login'>Login</Link></Text>
        </div>

         <div className='flex ml-10 absolute -mt-4'>
             <Text variant={'h1'} className='text-[#7E9E85] font-bold text-3xl'>Stay</Text>
             <Text variant={'h1'} className='text-white font-bold text-3xl'>Clear</Text>      
         </div>
        

        {/* <div className=''>
            <Text variant={'h4'} className='text-[#1A2E1F] '>Your dream home awaits</Text>
            <Text variant={'h4'} className='text-[#1A2E1F] text-4xl'>Find your perfect property for your</Text>
            <Text variant={'h4'} className='text-[#1A2E1F] text-4xl italic mt-6'>Next Chapter</Text>
        </div> */}
            
        </section>
        <BookingSearch />

        <HotelList limit={12} />

        
        </>
    )

}