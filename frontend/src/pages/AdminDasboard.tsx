import {Text} from '../components/ui/Text'
import {Card} from '../components/ui/Card'
import {Button} from '../components/ui/Button'
import { Sidebar } from '../components/ui/Sidebar'


export const Admin = () =>{


    return(
        <div className='flex min-h-screen'>
        <Sidebar/>
        <main className='flex-1'>
            
        <div className='bg-[#F9F5F2] h-20 w-screen border border-[#7E9E85]'>
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
        </main>
          
               </div>
    )
}