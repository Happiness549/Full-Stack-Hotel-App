import {query} from '../config/database'
import {User} from '../types/hotel.types'
import bcrypt from 'bcryptjs'



export const findUserByEmail = async (email: string | null): Promise<User> => {
    const result = await query("SELECT * FROM users WHERE EMAIL = $1",
         [email]);
    return result[0] || null;

}

export const createUser = async (email: string,  password:string, role: string, name: string, phone: number ): Promise<User> => {
    const salt = await bcrypt.genSalt(10)
    const password_hash = await bcrypt.hash(password, salt);

    const result = await query('INSERT INTO users (name, email, password_hash, role,phone ) VALUES($1,$2,$3,$4,$5) RETURNING id, email, role, name,phone',
         [email, password_hash, role, name,phone]

    )
    return result[0];

};
