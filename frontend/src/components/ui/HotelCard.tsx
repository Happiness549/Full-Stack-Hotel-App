import React,{useEffect} from "react";
import { Text } from "../ui/Text";
import type{ Hotel } from "../../redux/HotelSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type{ RootState } from "../../store";
// import { HotelImage } from "../../redux/ImageSlice";
import { fetchHotelImages } from "../../redux/ImageSlice";


interface HotelProps {
  HotelList: Hotel;
}

export const HotelCard: React.FC<HotelProps> = ({HotelList}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const hotel = useSelector((state: RootState) => state.hotels.hotels);
const images = useSelector(
    (state: RootState) => state.images.images
  );

  const loadedHotelIds = useSelector(
    (state: RootState) => state.images.loadedHotelIds
  );

  useEffect(() => {
    if (
      HotelList.id !== undefined &&
      !loadedHotelIds.includes(HotelList.id)
    ) {
      dispatch(fetchHotelImages(HotelList.id));
    }
  }, [dispatch, HotelList.id, loadedHotelIds]);

  const image =
    images.find(
      (img) => img.hotel_id === HotelList.id && img.is_primary
    ) ??
    images.find((img) => img.hotel_id === HotelList.id);


  const handleCardClick = () => {
  if (HotelList.id === undefined) return;
       navigate(`/hotel/${HotelList.id}`, {
       state: HotelList,
  });
};
  

  return (
    <div className=" h-screen w-80 rounded-xl  has-[:hover]:bg-gray-100 flex transition-colors duration-500 flex">
    <div className="rounded-xl  mt-5 w-140 h-80 border border-gray-300 hover:bg-gray-100 transition-colors duration-200" onClick={handleCardClick}>
      <div className="">
        
         </div>

        {image && (
        <img
          src={image.image_url}
          alt={HotelList.name}
          className="w-full h-40 object-cover rounded-t-xl"
        />
      )}
      <div className="ml-3">
          <Text variant={"h2"} className="text-sm ">{HotelList.star_rating} stars</Text>
        <Text variant={"h2"} className="font-bold text-md mt-1">{HotelList.name}</Text>
        <Text variant={"h2"} className="text-sm mt-1">{HotelList.address}</Text>
        <Text variant={"h2"} className="text-sm mt-1">{HotelList.city}</Text>
        <Text variant={"h2"} className="text-sm mt-1">{HotelList.country}</Text>

      </div>
      
        
      </div>
      </div>
    
    
  );
};