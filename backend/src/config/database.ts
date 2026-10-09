import { Request, Response } from "express";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import * as userService from '../services/userService'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

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


export const login = async (req: Request, res: Response) => {
    const {email, password}  = req.body
    if(!email || !password){
        return res.status(400).json({message: "Email and password are required"});
    }

    try{
        const user = await userService.findUserByEmail(email);
        if(!user){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch){
            return res.status(401).json({message: "Invalid email or password"});
        }
        const payload = { email: user.email}
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });

         console.log(`User ${email} logged in successfully`);
        return res.status(200).json({message: "Login Successful", token})

    }catch(error){
        console.error("Login Error:", error);
        return res.status(500).json({message: 'Error logging in'});

    }
};


