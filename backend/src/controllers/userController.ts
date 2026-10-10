import { Request, Response } from "express";
import * as UserService from '../services/userService'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from "../models/hotel.types";



export const register = async (req: Request, res: Response) => {
    const { email, password, role, name, phone, surname } = req.body;

    if (!email || !password || !role || !name || !phone ||!surname) {
        return res.status(400).json({message: "fill all required fields"});
    }
    if (phone.trim().length !== 10 || isNaN(Number(phone))) {
            return res.status(400).json({message: "Phone number must be exactly 10 digits"});
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

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message: "Email and password are required"});
    }

    try{
        const user = await UserService.findUserByEmail(email);
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

export const getUserById = async (req: Request, res: Response) => {
    try{
        const id = parseInt(String(req.params.id))
        const user = await UserService.findUserById(id)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        return res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: "Error retrieving user"})

    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try{
        const users = await UserService.findAllUsers();
        return res.status(200).json(users);
    }catch(error){
        console.error("Login Error:", error);
        return res.status(500).json({message: "Error retrieving users"});
    }
};


//Google controllers

export const googleAuthCallback = (req: Request, res: Response) => {
    const user = req.user as User;

    const token = jwt.sign({id: user.id, email: user.email, role: user.role,},process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );

    return res.status(200).json({message: "Google login successful", token, user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
    });
};

export const googleAuthFailure = (_req: Request, res: Response) => {
    return res.status(401).json({
        message: "Google authentication failed",
    });
};
