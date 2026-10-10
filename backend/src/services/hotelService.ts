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