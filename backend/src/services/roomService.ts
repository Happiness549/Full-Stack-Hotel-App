
import { query } from "../config/database";
import { Room } from "../models/hotel.types";

export const createRoom = async (hotel_id: number, room_type: string, description: string, price_per_night: number, 
    capacity: number, quantity: number,
    facilities: string): Promise<Room | null> => {

    const result = await query(
        `INSERT INTO rooms
        (hotel_id, room_type, description, price_per_night, capacity, quantity, facilities)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [hotel_id, room_type, description, price_per_night, capacity, quantity, facilities]
    );

    return (result[0] as Room) || null;
};