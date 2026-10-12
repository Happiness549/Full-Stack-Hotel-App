
import { Request, Response } from "express";
import * as roomService from '../services/roomService'




export const createRoomController = async (req: Request, res: Response) => {
    try {
        const {room_type, description, price_per_night, capacity, quantity,facilities} = req.body;

        const hotel_id = Number(req.params.hotelId);

        if (!Number.isInteger(hotel_id) || hotel_id <= 0) {
            return res.status(400).json({message: "Invalid hotel ID"});
        }

        if (!room_type || price_per_night == null || price_per_night <= 0 || !capacity || capacity <= 0 || !quantity || quantity <= 0) {
            return res.status(400).json({message: "Please provide all required room details"});
        }

        const room = await roomService.createRoom(hotel_id, room_type, description, price_per_night, capacity, quantity, facilities);

        return res.status(201).json({message: "Room created successfully",room});
    } catch (error) {
        console.error("Error creating room:", error);

        return res.status(500).json({message: "Error creating room"});
    }
};


export const updateRoomController = async ( req: Request, res: Response) => {
    try {
        
        const id = Number(req.params.id);
        const hotel_id = Number(req.params.hotelId);

        const {room_type, description, price_per_night, capacity, quantity,facilities} = req.body;

        if (
            !Number.isInteger(id) || id <= 0 ||
            !Number.isInteger(hotel_id) || hotel_id <= 0
        ) {
            return res.status(400).json({message: "Invalid room ID or hotel ID"});
        }

        if (!room_type || price_per_night == null || price_per_night <= 0 || !capacity || capacity <= 0 || !quantity || quantity <= 0) {
            return res.status(400).json({message: "Please provide all required room details"});
        }

        const room = await roomService.updateRoom(id,hotel_id, room_type, description, price_per_night, capacity, quantity, facilities);

        if (!room) {
            return res.status(404).json({message: "Room not found for this hotel"});
        }

        return res.status(200).json({message: "Room updated successfully", room});
    } catch (error) {
        console.error("Error updating room:", error);

        return res.status(500).json({message: "Error updating room"});
    }
};

export const getAllRooms = async (req: Request, res: Response) => {
    try{
        const rooms = await roomService.findAllRooms();
        return res.status(200).json(rooms);
    }catch(error){
        console.error("Login Error:", error);
        return res.status(500).json({message: "Error retrieving rooms"});
    }
};


export const deleteRoomById = async (req: Request, res: Response) => {
    try{
        const id = parseInt(String(req.params.id));
          const hotel_id = parseInt(String(req.params.hotel_id));

        const deletedRoom= await roomService.deleteRoom(id, hotel_id)
        if(!deletedRoom){
            return res.status(404).json({message: "Room not found"});
        }

        return res.status(200).json({message: "Room deleted successfully"})
         
    }catch(error){
        console.log("error deleting the Room:", error);
        return res.status(500).json({message: "Error deleting the Room"})

    }
};