
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

export const updateReview = async (id: number, rating: number, comment: string): Promise<Review | null> => {
    
    const results = await query(
        `UPDATE reviews
         SET rating = COALESCE($2, rating),
             comment = COALESCE($3, comment)
         WHERE id = $1
         RETURNING *`,
        [id, rating ?? null, comment ?? null]
    );

    return (results[0] as Review) || null;
};


// export const updateUser = async (id: number, userData: Partial<User>): Promise<User | null> => {
//     const { email, name, surname, profile_image, password_hash } = userData;

//     const results = await query(
//         `UPDATE users
//          SET email = COALESCE($2, email),
//              name = COALESCE($3, name),
//              surname = COALESCE($4, surname),
//              profile_image = COALESCE($5, profile_image),
//              password_hash = COALESCE($6, password_hash)
//          WHERE id = $1
//          RETURNING id, email, name, surname, profile_image, password_hash`,
//         [id, email ?? null, name ?? null, surname ?? null, profile_image ?? null, password_hash ?? null]
//     );

//     return (results[0] as User) || null;
// };
     