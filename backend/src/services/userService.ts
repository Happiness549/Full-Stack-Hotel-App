import { query } from "../config/database";
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs'
import { User } from "../types/hotel.types";


export const findUserByEmail = async (email: string | null): Promise<User> => { 
    const result = await query( "SELECT * FROM users WHERE email = $1", [email] ); 
    return (result[0] as User) || null; };

export const createUser = async (email: string, password: string, role: string, name: string, phone: string, surname: string): Promise<User> => {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const result = await query(
        `INSERT INTO users 
        (email, password_hash, role, name, phone, surname) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING id, email, role, name, phone, surname`,
        [email, password_hash, role, name, phone, surname]
    );

    return result[0] as User;
};  

