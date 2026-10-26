
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../store";
// import { fetchHotels } from "../redux/HotelSlice";

// export const AdminHotels = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const hotels = useSelector((state: RootState) => state.hotels.hotels);
//   const loading = useSelector((state: RootState) => state.hotels.loading);

//   useEffect(() => {
//     dispatch(fetchHotels());
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-white p-6 md:p-8">
//       <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-green-800">
//             Manage Hotels
//           </h1>
//           <p className="mt-2 text-gray-500">
//             View and manage all hotels in your system.
//           </p>
//         </div>

//         <div className="rounded-xl bg-green-50 px-5 py-3">
//           <p className="text-sm text-gray-500">Total hotels</p>
//           <p className="text-2xl font-bold text-green-800">
//             {hotels.length}
//           </p>
//         </div>
//       </div>

//       <div className="overflow-hidden rounded-xl border border-gray-200">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[900px] text-left">
//             <thead className="bg-green-50 text-sm text-green-900">
//               <tr>
//                 <th className="px-5 py-4">Hotel</th>
//                 <th className="px-5 py-4">Location</th>
//                 <th className="px-5 py-4">Rating</th>
//                 <th className="px-5 py-4">Facilities</th>
//                 <th className="px-5 py-4">Status</th>
//                 <th className="px-5 py-4">Actions</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-100">
//               {loading ? (
//                 <tr>
//                   <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
//                     Loading hotels...
//                   </td>
//                 </tr>
//               ) : hotels.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
//                     No hotels found.
//                   </td>
//                 </tr>
//               ) : (
//                 hotels.map((hotel) => (
//                   <tr
//                     key={hotel.id}
//                     className="align-top transition hover:bg-gray-50"
//                   >
//                     <td className="px-5 py-5">
//                       <p className="font-semibold text-gray-900">
//                         {hotel.name}
//                       </p>
//                       <p className="mt-1 max-w-xs text-sm text-gray-500">
//                         {hotel.description}
//                       </p>
//                       <p className="mt-2 text-xs text-gray-400">
//                         Hotel ID: {hotel.id}
//                       </p>
//                     </td>

//                     <td className="px-5 py-5 text-sm text-gray-600">
//                       <p>{hotel.address}</p>
//                       <p className="mt-1">
//                         {hotel.city}, {hotel.country}
//                       </p>
//                     </td>

//                     <td className="px-5 py-5">
//                       <span className="rounded-lg bg-amber-50 px-3 py-1 font-medium text-amber-700">
//                         ★ {hotel.star_rating ?? "N/A"}
//                       </span>
//                     </td>

//                     <td className="px-5 py-5">
//                       <div className="flex max-w-xs flex-wrap gap-2">
//                         {hotel.facilities?.length ? (
//                           hotel.facilities.map((facility, index) => (
//                             <span
//                               key={`${hotel.id}-${index}`}
//                               className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
//                             >
//                               {facility}
//                             </span>
//                           ))
//                         ) : (
//                           <span className="text-sm text-gray-400">
//                             None listed
//                           </span>
//                         )}
//                       </div>
//                     </td>

//                     <td className="px-5 py-5">
//                       <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
//                         {hotel.status || "Not set"}
//                       </span>
//                     </td>

//                     <td className="px-5 py-5">
//                       <div className="flex flex-col items-start gap-2">
//                         <button
//                           type="button"
//                           disabled
//                           className="rounded-lg border border-green-700 px-4 py-2 text-sm font-medium text-green-800 opacity-50"
//                         >
//                           Edit
//                         </button>

//                         <button
//                           type="button"
//                           disabled
//                           className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 opacity-50"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };
