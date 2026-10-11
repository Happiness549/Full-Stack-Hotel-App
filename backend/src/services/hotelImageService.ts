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