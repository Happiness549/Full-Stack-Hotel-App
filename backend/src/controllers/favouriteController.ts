import { Request, Response } from "express";
import * as favouriteService from '../services/favouriteService'
import { User } from "../models/hotel.types";

export const createFavouriteController = async (req: Request, res: Response) => {
    try {

        const user = req.user as User
        const hotel_id = Number(req.params.hotelId);
       


        if (!Number.isInteger(hotel_id) || hotel_id <= 0) {
            return res.status(400).json({message: "Invalid hotel ID"});
        }

        if (!Number.isInteger(user.id) || user.id <= 0) {
      return res.status(401).json({ message: "Invalid user ID" });
    }



        const favourites = await favouriteService.createFavourite( hotel_id, user.id);

        return res.status(201).json({message: "favourites created successfully",favourites});
    } catch (error) {
        console.error("Error creating Favourites:", error);
        return res.status(500).json({message: "Error creating favourites"});
    }
};