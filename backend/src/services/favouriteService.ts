import { query } from "../config/database";
import {Favourite} from '../models/hotel.types'


export const createFavourite = async (hotel_id: number, user_id: number): Promise<Favourite | null> => {

    const result = await query(
        `INSERT INTO favourites
        (hotel_id, user_id)
        VALUES ($1, $2)
        RETURNING *`,
        [hotel_id, user_id]
    );

    return (result[0] as Favourite) || null;
};


export const getMyFavourites = async (user_id: number): Promise<Favourite[]> => {
    const result = await query(
        `SELECT * FROM favourites
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [user_id]
    );

    return result as Favourite[];
};



export const getFavouriteByHotelId = async (user_id: number, hotel_id: number): Promise<Favourite | null> => {
    const result = await query(
        `SELECT * FROM favourites
         WHERE user_id = $1 AND hotel_id = $2`,
        [user_id, hotel_id]
    );

    return (result[0] as Favourite) || null;
};



export const deleteFavourite = async (user_id: number, hotel_id: number): Promise<Favourite | null> => {
    const result = await query(
        `DELETE FROM favourites
         WHERE user_id = $1 AND hotel_id = $2
         RETURNING *`,
        [user_id, hotel_id]
    );

    return (result[0] as Favourite) || null;
};



