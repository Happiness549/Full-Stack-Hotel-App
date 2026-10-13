
import { Request, Response } from "express";
import * as reviewService from "../services/reviewService";
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

        const review = await reviewService.createReview(user_id, hotel_id, rating,comment
        );

        return res.status(201).json({message: "Review created successfully",review});
    } catch (error) {
        console.error("Create review error:", error);
        return res.status(500).json({message: "Failed to create review"});
    }
};

export const updateReviewById = async(req: Request, res:Response) => {
    try{
        const id = parseInt(String(req.params.id));
        const {rating, comment} = req.body;
        const updatedReview = await reviewService.updateReview(id, rating, comment);
        
        if(!updatedReview){
            return res.status(404).json({message: "Review not found"});
        }

        res.status(200).json(updatedReview);
        
    }catch(error){
        res.status(500).json({message: "Error updating review"});

    }
};

export const getAllReviews = async (req: Request, res: Response) => {
    try{
        const reviews = await reviewService.findAllReviews();
        return res.status(200).json(reviews);
    }catch(error){
        console.error("Login Error:", error);
        return res.status(500).json({message: "Error retrieving reviews"});
    }
};

export const getReviewById = async (req: Request, res: Response) => {
    try{
        const id = parseInt(String(req.params.id))
        const review = await reviewService.findReviewById(id)
        if(!review){
            return res.status(404).json({message: "Review not found"})
        }
        return res.status(200).json(review)
    }catch(error){
        res.status(500).json({message: "Error retrieving review"})

    }
};
