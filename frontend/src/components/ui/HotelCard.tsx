import React from "react";
import { Text } from "../ui/Text";
import type{ Hotel } from "../../redux/HotelSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type{ RootState } from "../../store";


interface HotelProps {
  HotelList: Hotel;
}

export const HotelCard: React.FC<HotelProps> = ({HotelList}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const hotel = useSelector((state: RootState) => state.hotels.hotels);


  const handleCardClick = () => {
  if (HotelList.id === undefined) return;
       navigate(`/lists/${HotelList.id}`, {
       state: HotelList,
  });
};
  

  return (
    <div className=" h-80 w-80 rounded-3xl  has-[:hover]:bg-gray-100 flex transition-colors duration-500 flex">
    <div className="rounded-xl p-8 mt-5 w-70 h-70 border border-gray-300 xl hover:bg-gray-100 transition-colors duration-200" onClick={handleCardClick}>
      <div className="">
  
        <Text variant={"h2"} className="font-bold text-md text-[#001C44]">{HotelList.name}</Text>
        <Text variant={"h2"} className="text-sm text-[#001C44]">{HotelList.star_rating}</Text>
        <Text variant={"h2"} className="text-sm text-[#001C44]">{HotelList.address}</Text>
        <Text variant={"h2"} className="text-sm text-[#001C44]">{HotelList.city}</Text>
        <Text variant={"h2"} className="text-sm text-[#001C44]">{HotelList.country}</Text>
        
      </div>
      </div>
    </div>
    
  );
};