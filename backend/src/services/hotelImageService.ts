import { query } from "../config/database";
import { HotelImage } from "../models/hotel.types";

export const addHotelImage = async (hotel_id: number, image_url: string): Promise<HotelImage> => {
    const result = await query(
        `INSERT INTO hotel_images (hotel_id, image_url)
         VALUES ($1, $2)
         RETURNING *`,
        [hotel_id, image_url]
    );

    return result[0] as HotelImage;
};

export const getHotelImages = async (hotel_id: number): Promise<HotelImage[]> => {
    const result = await query(
        `SELECT * FROM hotel_images
         WHERE hotel_id = $1
         ORDER BY is_primary DESC, created_at DESC`,
        [hotel_id]
    );

    return result as HotelImage[];
};