import {Text} from '../components/ui/Text'
import { Link } from 'react-router-dom'
import {HotelList} from '../components/ui/HotelList'
import { BookingSearch } from "../components/ui/BookingSearch";


export const Landing = () => {

    return(
        <>
        
        <section className="bg-[url(https://res.cloudinary.com/g1cepfbn/image/upload/v1792417707/pexels-aj-ahamad-767001191-32217882.jpg')] bg-cover bg-center h-[45vh] w-full">
        <div className='flex gap-5 ml-360'>
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