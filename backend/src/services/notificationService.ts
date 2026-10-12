import { query } from "../config/database";
import { Notification } from "../models/hotel.types";

export const createNotification = async (user_id: number, title: string, message: string, type: string): Promise<Notification | null> => {
    const result = await query(
        `INSERT INTO notifications
        (user_id, title, message, type)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [user_id, title, message, type]
    );

    return (result[0] as Notification) || null;
};