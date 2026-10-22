// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../redux/store";
// import { fetchHotelById } from "../redux/HotelSlice";
// import HotelDetails from "../components/HotelDetails";

// const HotelDetailsPage = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch<AppDispatch>();

//   const hotel = useSelector((state: RootState) =>
//     state.hotels.hotels.find((hotel) => hotel.id === Number(id))
//   );

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchHotelById(Number(id)));
//     }
//   }, [id, dispatch]);

//   if (!hotel) {
//     return <p>Loading hotel details...</p>;
//   }

//   return <HotelDetails hotel={hotel} />;
// };

// export default HotelDetailsPage;