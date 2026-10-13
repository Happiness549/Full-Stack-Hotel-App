
import { Request, Response } from "express";
import { createReview } from "../services/reviewService";
import { User } from "../models/hotel.types";

export const createReviewController = async (req: Request, res: Response) => {
    try {
        const user_id = (req.user as User).id;
        const hotel_id = Number(req.params.hotelId);
        const { rating, comment } = req.body;

        if (!hotel_id || !rating || !comment) {
            return res.status(400).json({message: "Hotel ID, rating and comment are required"});
        }

        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be an integer between 1 and 5"});
        }

        const review = await createReview(user_id, hotel_id, rating,comment
        );

        return res.status(201).json({message: "Review created successfully",review});
    } catch (error) {
        console.error("Create review error:", error);
        return res.status(500).json({message: "Failed to create review"});
    }
};