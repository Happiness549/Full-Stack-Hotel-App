
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

export const updateReview = async (id: number, rating: number, comment: string, user_id: number,): Promise<Review | null> => {
    
    const results = await query(
        `UPDATE reviews
         SET rating = COALESCE($3, rating),
             comment = COALESCE($4, comment)
         WHERE id = $1 AND user_id = $2
         RETURNING *`,
        [id, user_id, rating ?? null, comment ?? null]
    );

    return (results[0] as Review) || null;
};

export const findAllReviews = async (): Promise<Review[]> => {
    const results = await query(
        "SELECT id, user_id, hotel_id, rating, comment FROM reviews ORDER BY id DESC"

    );
    return results as Review[]
}

export const findReviewById = async (id: number): Promise<Review | null> => {
    const results = await query("SELECT * FROM reviews WHERE id = $1", [
        id,

    ]);
    return results[0] as Review|| null;
}


export const deleteReview = async (id:number): Promise<Review | null> =>{
    const results = await query(" DELETE FROM reviews WHERE id = $1 RETURNING *", [id]

    );
    return (results[0] as Review || null);
};
