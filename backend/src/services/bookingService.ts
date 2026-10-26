import {query} from '../config/database'
import {Booking, bookingStatus} from '../models/hotel.types'


export const createBooking = async (room_id: number, user_id: number, checkin: Date, checkout: Date, guests: number,
    room_booked: number, total_price: number): Promise<Booking | null> => {


    const result = await query(
        `INSERT INTO bookings
        (room_id, user_id, check_in, check_out, guests, rooms_booked, total_price, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [room_id, user_id, checkin, checkout, guests, room_booked, total_price]
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

export const findBookingById = async (id: number): Promise<Booking | null> => {
    const results = await query(
        "SELECT * FROM bookings WHERE id = $1",
        [id]
    );

    return (results[0] as Booking) || null;
};



export const updateBookingStatus = async (id: number, status: string) => {
  const result = await query(
    `UPDATE bookings
     SET status = $1, updated_at = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );

  return result[0] || null;
};



export const deleteBooking = async (id: number): Promise<Booking | null> => {
    const result = await query(
        `DELETE FROM bookings
        WHERE id = $1
        RETURNING *`,
        [id]
    );

    return (result[0] as Booking) || null;
};


