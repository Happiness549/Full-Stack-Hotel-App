import { Request, Response } from "express";
import * as hotelService from '../services/hotelService'
import { query } from "../config/database";
import { User } from "../models/hotel.types";


export const addHotel = async (req: Request, res: Response) => {
    try{
        const hotel = await hotelService.createHotel(req.body,(req.user as User).id)
        res.status(201).json(hotel)
    }catch(error){

        console.error("Controller Error:", error);
        res.status(500).json({message: "Error in creating a hotel"});

    }
};

export const getAllHotels = async (req: Request, res: Response) => {
    try{
        const hotels = await hotelService.findAllHotels();
        res.status(200).json(hotels);
    }catch(error){
        console.error("Error Error:", error);
        res.status(500).json({message: "Error retrieving hotels"});
    }
};

export const updateHotelById = async(req: Request, res:Response) => {
    try{
        const id = parseInt(String(req.params.id));
        const updatedHotel = await hotelService.updateHotel(id, req.body);
        
        if(!updatedHotel){
            return res.status(404).json({message: "Hotel not found"});
        }

        res.status(200).json(updatedHotel);
        
    }catch(error){
        res.status(500).json({message: "Error updating Hotel"});

    }
};



export const deleteHotelById = async (req: Request, res: Response) => {
    try{
        const id = parseInt(String(req.params.id));
        const deletedHotel = await hotelService.deleteHotel(id)
        if(!deletedHotel){
            return res.status(404).json({message: "Hotel not found"});
        }

        return res.status(200).json({message: "Hotel deleted successfully"})
         
    }catch(error){
        return res.status(500).json({message: "Error deleting hotel."})

    }
};

