import type {Hotel} from '../../redux/HotelSlice'
import type {RootState} from '../../store'
import {useSelector} from 'react-redux'
import {  useParams } from "react-router-dom";

interface HotelDetailsProps {
    hotel: Hotel;
}

export const HotelDetails = ({ hotel }: HotelDetailsProps) => {
    



  return (
    <div>
      <h1>{hotel.name}</h1>

      <p>{hotel.star_rating} Star Hotel</p>

      <p>{hotel.address}</p>

      <p>
        {hotel.city}, {hotel.country}
      </p>

      <p>{hotel.description}</p>

      <h2>Facilities</h2>
      <p>{hotel.facilities}</p>

      {/* Map component */}

      {/* Hotel image gallery component */}

      {/* Room listings component */}

      {/* Reviews component */}

      {/* Booking component */}
    </div>
  );
};

