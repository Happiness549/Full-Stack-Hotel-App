import { query } from "../config/database";
import { Payment } from "../models/hotel.types";

export const createPayment = async (booking_id: number, user_id: number, amount: number, currency: string, payment_method: string): Promise<Payment | null> => {
    const result = await query(
        `INSERT INTO payments
        (booking_id, user_id, amount, currency, payment_method)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [booking_id, user_id, amount, currency, payment_method]
    );

    return (result[0] as Payment) || null;
};


