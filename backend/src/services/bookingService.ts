import {query} from '../config/database'
import {Booking, bookingStatus} from '../models/hotel.types'


export const createBooking = async (room_id: number, user_id: number, checkin: Date, checkout: Date, guests: number,
    room_booked: number, total_price: number, status: bookingStatus): Promise<Booking | null> => {


    const result = await query(
        `INSERT INTO bookings
        (room_id, user_id, check_in, check_out, guests, rooms_booked, total_price, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [room_id, user_id, checkin, checkout, guests, room_booked, total_price, status]
    );

    return (result[0] as Booking) || null;
};

export const checkRoomAvailability = async (room_id: number, check_in: Date, check_out: Date): Promise<boolean> => {
    const result = await query(
        `SELECT id FROM bookings 
         WHERE room_id = $1 
         AND check_in < $3 
         AND check_out > $2`,
        [room_id, check_in, check_out]
    );

    
    return result.length === 0;
};

export const findAllBookings = async (): Promise<Booking[]> => {
    const results = await query(
        "SELECT * FROM bookings ORDER BY id DESC"
    );
    return results as Booking[]
}



