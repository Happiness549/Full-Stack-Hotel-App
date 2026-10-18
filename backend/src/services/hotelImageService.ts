import { query } from "../config/database";
import { HotelImage } from "../models/hotel.types";


export const addHotelImage = async (hotel_id: number,image_url: string): Promise<HotelImage> => {
    const existingImages = await query(
        `SELECT id FROM hotel_images WHERE hotel_id = $1`,
        [hotel_id]
    );

    const is_primary = existingImages.length === 0;

    const result = await query(
        `INSERT INTO hotel_images (hotel_id, image_url, is_primary)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [hotel_id, image_url, is_primary]
    );

    return result[0] as HotelImage;
};




export const getHotelImages = async (
    hotel_id: number
): Promise<HotelImage[]> => {
    const result = await query(
        `SELECT * FROM hotel_images
         WHERE hotel_id = $1
         ORDER BY is_primary DESC, created_at DESC`,
        [hotel_id]
    );

    return result as HotelImage[];
};

export const setPrimaryHotelImage = async (image_id: number, hotel_id: number): Promise<HotelImage | null> => {
    await query(
        `UPDATE hotel_images
         SET is_primary = FALSE
         WHERE hotel_id = $1`,
        [hotel_id]
    );

    const result = await query(
        `UPDATE hotel_images
         SET is_primary = TRUE
         WHERE id = $1 AND hotel_id = $2
         RETURNING *`,
        [image_id, hotel_id]
    );

    return (result[0] as HotelImage) || null;
};


export const updateHotelImage = async (hotel_id: number, image_id: number, image_url: string): Promise<HotelImage | null> => {
    const result = await query(
        `UPDATE hotel_images
         SET image_url = $3
         WHERE hotel_id = $1 AND id = $2
         RETURNING *`,
        [hotel_id, image_id, image_url]
    );

    return (result[0] as HotelImage) || null;
};


export const deleteHotelImage = async (hotel_id: number, image_id: number): Promise<HotelImage | null> => {
    const result = await query(
        `DELETE FROM hotel_images
         WHERE hotel_id = $1 AND id = $2
         RETURNING *`,
        [hotel_id, image_id]
    );

    return (result[0] as HotelImage) || null;
};