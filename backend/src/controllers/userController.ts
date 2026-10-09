import { Request, Response } from "express";
import * as UserService from '../services/userService'
import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'


export const register = async (req: Request, res: Response) => {
    const { email, password, role, name, phone, surname } = req.body;

    if (!email || !password || !role || !name || !phone ||!surname) {
        return res.status(400).json({message: "Email, password, surname, role, name, and phone are required"});
    }

    try {
        const existingUser = await UserService.findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({message: "Email is already in use"});
        }

         await UserService.createUser(email, password, role, name, phone, surname);

        return res.status(201).json({message: "User registered successfully"});

    } catch (error) {
        console.error("Register Error Details:", error);

        return res.status(500).json({message: "Error registering the user"});
    }
};