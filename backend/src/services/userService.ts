import { query } from "../config/database";
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs'
import { User } from "../models/hotel.types";


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


export const findAllUsers = async (): Promise<User[]> => {
    const results = await query(
        "SELECT id, email, role, name, phone FROM users ORDER BY id DESC"

    );
    return results as User[]
}

export const findUserById = async (id: number): Promise<User | null> => {
    const results = await query("SELECT * FROM users WHERE id = $1", [
        id,

    ]);
    return results[0] as User|| null;
}


// The following is google crud 

export const createGoogleUser = async (google_id: string,email: string,name: string,surname: string | null,profile_image: string | null): Promise<User> => {
    const result = await query(
        `INSERT INTO users
        (google_id, email, name, surname, profile_image, role)
        VALUES ($1, $2, $3, $4, $5, 'User')
        RETURNING id, google_id, email, name, surname, profile_image, role`,
        [google_id, email, name, surname, profile_image]
    );

    return result[0] as User;
};

export const findUserByGoogleId = async (google_id: string): Promise<User | null> => {
    const result = await query(
        "SELECT * FROM users WHERE google_id = $1",
        [google_id]
    );

    return (result[0] as User) || null;
};
