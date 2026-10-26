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
import { addFavourite, removeFavourite } from "../../redux/FavouritesSlice";


interface HotelProps {
  HotelList: Hotel;
}

export const HotelCard: React.FC<HotelProps> = ({HotelList}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  
 const images = useSelector(
    (state: RootState) => state.images.images
  );
  const loadedHotelIds = useSelector(
    (state: RootState) => state.images.loadedHotelIds
  );
  const favourites = useSelector(
  (state: RootState) => state.favourites.favourites
);

const isFavourite = favourites.some(
  (favourite) => favourite.hotel_id === HotelList.id
);

  useEffect(() => {
    if (
      HotelList.id !== undefined &&
      !loadedHotelIds.includes(HotelList.id)
    ) {
      dispatch(fetchHotelImages(HotelList.id));
    }
  }, [dispatch, HotelList.id, loadedHotelIds]);
const handleFavouriteClick = (
  e: React.MouseEvent<HTMLButtonElement>
) => {
  e.stopPropagation();

  if (HotelList.id === undefined) return;

  if (isFavourite) {
    dispatch(removeFavourite(HotelList.id));
  } else {
    dispatch(addFavourite(HotelList.id));
  }
};
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
    <div className="  w-[calc(33.33%-14px)] rounded-xl  has-[:hover]:bg-black-500 flex transition-colors duration-500 flex">
    <div className="rounded-xl  mt-5 w-full h-80 border border-gray-300 hover:bg-gray-100 transition-colors duration-200" onClick={handleCardClick}>
      <div className="">
        
         </div>

    <div className="relative">
          {image && (
            <img
              src={image.image_url}
              alt={HotelList.name}
              className="w-full h-40 object-cover rounded-t-xl"
            />
          )}

          <button
            type="button"
            onClick={handleFavouriteClick}
            className="absolute top-3 right-3 text-2xl bg-white rounded-full w-9 h-9 flex items-center justify-center shadow"
            aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          >
            <span className={isFavourite ? "text-red-500" : "text-gray-500"}>
              {isFavourite ? "♥" : "♡"}
            </span>
          </button>
    </div>
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