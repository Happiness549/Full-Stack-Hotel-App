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

export const getMyFavouritesController = async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const favourites = await favouriteService.getMyFavourites(user.id);

        return res.status(200).json({count: favourites.length, favourites});
    } catch (error) {
        console.error("Get favourites error:", error);

        return res.status(500).json({message: "Failed to retrieve favourites"});
    }
};


export const getFavouriteByHotelIdController = async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const hotel_id = Number(req.params.hotelId);

        if (!Number.isInteger(hotel_id) || hotel_id <= 0) {
            return res.status(400).json({message: "Valid hotel ID is required"});
        }

        const favourite = await  favouriteService.getFavouriteByHotelId(user.id, hotel_id);

        if (!favourite) {
            return res.status(404).json({message: "Hotel is not in your favourites"});
        }

        return res.status(200).json({ favourite });
    } catch (error) {
        console.error("Get favourite error:", error);

        return res.status(500).json({message: "Failed to retrieve favourite"});
    }
};

export const deleteFavouriteController = async (req: Request,res: Response) => {
    try {
        const user = req.user as User;
        const hotel_id = Number(req.params.hotelId);

        if (!Number.isInteger(hotel_id) || hotel_id <= 0) {
            return res.status(400).json({message: "Valid hotel ID is required"});
        }

        const favourite = await favouriteService.deleteFavourite(user.id, hotel_id);

        if (!favourite) {
            return res.status(404).json({message: "Favourite not found"});
        }

        return res.status(200).json({message: "Favourite removed successfully", favourite});
    } catch (error) {
        console.error("Delete favourite error:", error);

        return res.status(500).json({message: "Failed to remove favourite"});
    }
};



