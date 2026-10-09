import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../services/userService";
import { User } from "../types/hotel.types";

interface JwtPayload {
    email: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {

        try {
            console.log(req.headers);
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

            const user: User | null = await findUserByEmail(decoded.email);
            req.user = user || undefined;

            if (!req.user) {
                return res.status(401).json({message: "Not authorized, user not found"});
            }

            return next();

        } catch (error) {
            return res.status(401).json({message: "Not authorized, token failed"});
        }
    }

    return res.status(401).json({ message: "Not authorized, no token"});
};


export const adminOnly = (req: Request,res: Response,next: NextFunction) => {
   if ((req.user as (User & { role?: string }) | undefined)?.role !== "Admin") {
        return res.status(403).json({ message: "Access denied. Admins only."});
    }
    next();
};