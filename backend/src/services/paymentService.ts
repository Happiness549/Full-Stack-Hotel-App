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


export const confirmPayment = async (id: number): Promise<Payment | null> => {
    const result = await query(
        `UPDATE payments
         SET status = 'successful',
             paid_at = CURRENT_TIMESTAMP,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $1 AND status = 'pending'
         RETURNING *`,
        [id]
    );

    const payment = (result[0] as Payment) || null;

    if (!payment) return null;

    await query(
        `UPDATE bookings
         SET status = 'Confirmed',
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $1`,
        [payment.booking_id]
    );

    return payment;
};

export const findPaymentById = async (id: number): Promise<Payment | null> => {
    const result = await query(
        `SELECT * FROM payments WHERE id = $1`,
        [id]
    );

    return (result[0] as Payment) || null;
};


export const findPaymentsByUserId = async (user_id: number): Promise<Payment[]> => {
    const result = await query(
        `SELECT * FROM payments
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [user_id]
    );

    return result as Payment[];
};

export const findAllPayments = async (): Promise<Payment[]> => {
    const result = await query(
        `SELECT * FROM payments
         ORDER BY created_at DESC`
    );

    return result as Payment[];
};

