import {Hotel} from '../models/hotel.types'
import {query} from '../config/database'


export const createHotel = async (hotelData: Hotel, adminId:number): Promise<Hotel> => {
  const { name, description, address, city, country , star_rating, facilities } = hotelData;
  
  const result = await query(
    `INSERT INTO hotels (added_by,name, description, address, city, country, star_rating, facilities ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [adminId, name, description, address, city, country, star_rating, facilities  ]
  );
  
  return result[0] as Hotel;
};


export const findAllHotels = async (): Promise<Hotel[]> => {
    const result = await query(
        "SELECT * FROM hotels ORDER BY created_at"

    );
    return result as Hotel[];
};

export const updateHotel = async (id: number, hotelData:Hotel): Promise<Hotel | null> =>{
     const { name, description, address,city , country,  facilities } = hotelData;
       const results = await query(
        `UPDATE hotels 
         SET name = $1, description = $2, address = $3, city = $4, country = $5, facilities = $6 
         WHERE id = $7 
         RETURNING id, name, description, address, city, country, facilities`, 
        [ name,description, address, city, country, facilities, id]
    );
    return (results[0] as Hotel)|| null;
};