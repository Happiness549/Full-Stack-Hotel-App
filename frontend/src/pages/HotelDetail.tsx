import { useLocation } from "react-router-dom";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {  fetchHotelImages} from '../redux/ImageSlice';
import type{ RootState , AppDispatch} from "../store";
import {Text} from '../components/ui/Text'
import {BookingSearch} from '../components/ui/BookingSearch'
import { Room } from "../components/ui/Room";
import { Reviews } from "../components/ui/Reviews";



const HotelDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const images = useSelector((state: RootState) => state.images.images);
  const location = useLocation();
  const hotel = location.state;

  useEffect(() => {
  if (hotel?.id) {  
    dispatch( fetchHotelImages(hotel.id));
  }

 

}, [dispatch, hotel?.id]);



  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50'>
      <div className='bg-[#7E9E85] h-30 w-screen border border-[#7E9E85]'>
            <Text variant={'h3'} className="text-xl text-white mt-5 ml-5">StayClear</Text>
        </div >
        <BookingSearch/>
        


    <div className="min-h-screen px-6 py-8 md:px-20 ">
       <div className="mt-2 flex items-center gap-1">
        {Array.from({ length: hotel.star_rating }, (_, index) => (
            <Text variant={'span'} key={index} className="text-yellow-500">★</Text>
        ))}
    <Text variant={'span'} className="ml-2 text-sm text-gray-600">{hotel.star_rating}-Star Hotel</Text>
    </div>
      
      <Text variant={'h1'} className="text-3xl font-bold text-gray-900 mt-2">{hotel.name}</Text>
      <Text variant={'p'} className="mt-2 text-gray-600">{hotel.address}, {hotel.city}, {hotel.country}</Text>
     
<div className="mt-6 max-w-4xl  grid grid-cols-1 md:grid-cols-4 gap-3">
  {images?.map((image, index) => (
    <img
      key={image.id}
      src={image.image_url}
      alt={hotel.name}
      className={`w-full rounded-xl object-cover ${
        index === 0
          ? "md:col-span-2 md:row-span-2 h-52 md:h-full"
          : index === 1 || index === 2
          ? "md:col-span-2 h-48"
          : "col-span-1 h-32"
      }`}
    />
  ))}
</div>

<section className="mt-8">
  <Text variant={'p'} className='mt-4'>{hotel.description}</Text>
 

  

  <iframe
    src={`https://maps.google.com/maps?q=${encodeURIComponent(
      `${hotel.address}, ${hotel.city}, ${hotel.country}`
    )}&output=embed`}
    className="ml-115 -mt-48 h-32 w-110 rounded-xl border-0 absolute"
    loading="lazy"
    title="Hotel location"
  />
</section>


 <section className="mt-8">
  <Text variant={'h2'} className="text-xl font-bold">Most popular facilities</Text>

  <div className="mt-4 grid grid-cols-2 gap-4 ">
    {hotel.facilities.split(",").map((facility: string) => (
      <Text variant={'p'} key={facility} className="text-gray-700"> ✓ {facility.trim()}</Text>
    ))}
  </div>
</section>
  </div>
  <Room hotelId={hotel.id} hotel={hotel}/>
  <Reviews hotelId={hotel.id} />
 
</div>
  );
};

export default HotelDetails;