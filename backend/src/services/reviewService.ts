
import { query } from "../config/database";
import { Review } from "../models/hotel.types";

export const createReview = async (user_id: number, hotel_id: number, rating: number, comment: string): Promise<Review | null> => {
    const result = await query(
        `INSERT INTO reviews
        (user_id, hotel_id, rating, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [user_id, hotel_id, rating, comment]
    );

    return (result[0] as Review) || null;
};