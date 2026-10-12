
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



export const updateRoom = async (id: number, hotel_id: number, room_type: string,description: string, price_per_night: number,
    capacity: number, quantity: number, facilities: string): Promise<Room | null> => {
    const result = await query(
        `UPDATE rooms
        SET room_type = $1,
            description = $2,
            price_per_night = $3,
            capacity = $4,
            quantity = $5,
            facilities = $6,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $7 AND hotel_id = $8
        RETURNING *`,
        [room_type, description, price_per_night, capacity, quantity, facilities, id,hotel_id]
    );

    return (result[0] as Room) || null;
};


export const findAllRooms = async (): Promise<Room[]> => {
    const results = await query(
        "SELECT id, room_type, description, price_per_night, capacity, quantity, facilities FROM rooms ORDER BY id DESC"

    );
    return results as Room[]
}