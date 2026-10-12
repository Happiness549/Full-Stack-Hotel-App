import { Request, Response } from "express";
import * as bookingService from '../services/bookingService'




export const createBookingController = async (req: Request, res: Response) => {
    try {
        const { checkin, checkout, guests, room_booked, total_price,status } = req.body;

        const room_id = Number(req.params.room_id);
        const user_id = Number(req.params.user_id);
            
 
        if (!checkin || !checkout || !guests || !room_booked || !total_price ) {
            return res.status(400).json({message: "Please provide all required booking details"});
        }

        const isRoomAvailable = await bookingService.checkRoomAvailability(room_id, new Date(checkin), new Date(checkout));
       if (!isRoomAvailable) {
        return res.status(409).json({ message: "This room is already booked for the selected dates." });
    }

    

        const booking = await bookingService.createBooking(room_id, user_id,new Date(checkin), new Date(checkout), guests, room_booked, total_price, status );

        return res.status(201).json({message: "Booking created successfully",booking});
    } catch (error) {
        console.error("Error creating booking:", error);

        return res.status(500).json({message: "Error creating booking"});
    }
};


export const getAllBookings = async (req: Request, res: Response) => {
    try{
        const bookings = await bookingService.findAllBookings();
        return res.status(200).json(bookings);
    }catch(error){
        console.error("Booking Error:", error);
        return res.status(500).json({message: "Error retrieving bookings"});
    }
};