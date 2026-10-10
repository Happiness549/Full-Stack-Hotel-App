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

export const getHotelById = async (req: Request, res: Response) => {
    try{
        const id = parseInt(String(req.params.id))
        const hotel = await hotelService.findHotelById(id)
        if(!hotel){
            return res.status(404).json({message: "Hotel not found"})
        }
        return res.status(200).json(hotel)
    }catch(error){
        res.status(500).json({message: "Error retrieving hotel"})

    }
};



