import {Text} from '../components/ui/Text'
// import Trolley from '../assets/Trolley.webp'
import { Link } from 'react-router-dom'
import {HotelList} from '../components/ui/HotelList'


export const Landing = () => {

    return(
        <>
        <section className="bg-[url('https://res.cloudinary.com/g1cepfbn/image/upload/v1791972025/pexels-darrell-fraser-1187740-2259226.jpg')] bg-cover bg-center h-[45vh] w-full">
        <div className='flex gap-5 ml-360'>
            <Text variant={'h3'}className='text-[#1A2E1F] '><Link to='/register'>Register</Link></Text>
            <Text variant={'h3'} className='text-[#1A2E1F] '><Link to='/login'>Login</Link></Text>
        </div>

        <div className=''>
            <Text variant={'h4'} className='text-[#1A2E1F] '>Your dream home awaits</Text>
            <Text variant={'h4'} className='text-[#1A2E1F] text-4xl'>Find your perfect property for your</Text>
            <Text variant={'h4'} className='text-[#1A2E1F] text-4xl italic mt-6'>Next Chapter</Text>
        </div>
            
        </section>

        <HotelList limit={12} />

        
        </>
    )

}