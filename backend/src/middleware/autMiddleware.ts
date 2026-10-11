import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../services/userService";
import { User } from "../models/hotel.types";
import multer from "multer";

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


export const adminOnlyAddHotel = (req: Request, res: Response, next: NextFunction) => {
   if ((req.user as User)?.role !== "Admin") {
        return res.status(403).json({ message: "Not authorised, admins only."});
    }

    next();
};

export const adminOnly = (req: Request,res: Response,next: NextFunction) => {
   if ((req.user as User)?.role !== "Admin") {
        return res.status(403).json({ message: "Access denied. Admins only."});
    }
    next();
};




const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    }
});