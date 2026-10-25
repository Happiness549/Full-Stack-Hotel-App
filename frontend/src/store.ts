import {configureStore} from '@reduxjs/toolkit'
import {type TypedUseSelectorHook, useSelector } from 'react-redux'
import RegisterReducer from './redux/RegisterSlice'
import LoginReducer from './redux/LoginSlice'
import HotelSlice from './redux/HotelSlice'
import SearchSlice from './redux/SearchSlice'
import ImageSlice from './redux/ImageSlice'
import RoomSlice from "./redux/RoomSlice";
import favouriteSlice from './redux/FavouritesSlice'


const store = configureStore({
    reducer: {
        user: RegisterReducer,
        login: LoginReducer,
        hotels: HotelSlice,
        search: SearchSlice,
        images: ImageSlice,
        rooms: RoomSlice,
        favourites: favouriteSlice,
     
    },
     
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store