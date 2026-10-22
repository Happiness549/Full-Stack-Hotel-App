import {Text} from '../components/ui/Text'

export const Rooms = () => {

    return(
        <>
        <Text variant={'h1'} className='text-md font-bold flex '>Available Rooms</Text>

        <section>
           <div className="mt-6 rounded-xl">
              <table className=" min-w-[900px]">
                <thead>
                  <tr className="bg-[#7E9E85] text-sm text-white">
                    <th className="px-8 py-2 font-medium">Room Type</th>
                    <th className="px-8 py-2 font-medium">Room Price</th>
                    <th className="px-8 py-2 font-medium"></th>  
                  </tr>
                </thead>

                <tbody>
                  <tr className="">
                    <td colSpan={1} className="px-4 py-12 ">Standard Queen Room</td>
                     <td colSpan={1} className="px-4 py-12 ">Standard Queen Room</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        
       
        </>
    )
}

