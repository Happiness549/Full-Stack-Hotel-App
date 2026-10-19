import {Text} from '../components/ui/Text'
import {Card} from '../components/ui/Card'
import {Button} from '../components/ui/Button'
import { Sidebar } from '../components/ui/Sidebar'
import {HotelForm} from '../components/ui/HotelForm'
import { openHotelModal } from '../redux/HotelSlice'
import { useDispatch } from 'react-redux'
import type{ AppDispatch } from '../store'



export const Admin = () =>{
    const dispatch = useDispatch<AppDispatch>();


    return(
        <div className='flex min-h-screen'>
        <Sidebar/>
        <main className='flex-1'>
            
        <div className=' h-20 w-screen border border-[#7E9E85]'>
            <button className='bg-[#7E9E85] w-20 h-10 rounded-xl mt-5 ml-300'>Logout </button>
        </div >

        <div className='flex gap-20 mt-10'>
             <Card className='w-40 h-40 rounded-xl'>
            <Text variant={'h1'}>Checkin today</Text>
        </Card>
         <Card className='w-40 h-40 rounded-xl'>
            <Text variant={'h1'}>Waiting for approval</Text>
        </Card>
         <Card className='w-40 h-40 rounded-xl'>
            <Text variant={'h1'}></Text>
        </Card>
         <Card className='w-40 h-40 rounded-xl'>
            <Text variant={'h1'}>Hotels</Text>
        </Card>
        </div>
        <h1>Hi</h1>
           <div>
            
            <Button  text={'Add hotel'} className='w-300 bg-[#BCFEFE]' id="openModalBtn" onClick={() => dispatch(openHotelModal())}/>
            <HotelForm/>

        </div>
        </main>
        
        
     
               </div>
    )
}