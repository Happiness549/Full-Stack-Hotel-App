
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import * as userService from '../services/userService'
import jwt from 'jsonwebtoken'

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);

export const query = (text: string, param?: any[]) => {
    return sql.query(text, param);
};

export const testDBConnection = async () => {
    try {
         await sql`SELECT version()`;
        console.log("Database connected successfully");
        
    } catch (error) {
        console.error("Unable to connect to the database", error);
        throw error;
    }
};






