import { Request, Response } from "express";
import * as bookingService from '../services/bookingService'




export const createBookingController = async (req: Request, res: Response) => {
    try {
        const { checkin, checkout, guests, room_booked, total_price} = req.body;

        const room_id = Number(req.params.room_id);
        const user_id = Number(req.params.user_id);
            
 
        if (!checkin || !checkout || !guests || !room_booked || !total_price ) {
            return res.status(400).json({message: "Please provide all required booking details"});
        }

        const isRoomAvailable = await bookingService.checkRoomAvailability(room_id, new Date(checkin), new Date(checkout));
       if (!isRoomAvailable) {
        return res.status(409).json({ message: "This room is already booked for the selected dates." });
    }

    

        const booking = await bookingService.createBooking(room_id, user_id,new Date(checkin), new Date(checkout), guests, room_booked, total_price );

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

export const getBookingById = async (req: Request, res: Response) => {
    try{
        const id = parseInt(String(req.params.id))
        const booking = await bookingService.findBookingById(id)
        if(!booking){
            return res.status(404).json({message: "Booking not found"})
        }
        return res.status(200).json(booking)
    }catch(error){
        res.status(500).json({message: "Error retrieving booking"})

    }
};


export const updateBookingController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Confirmed", "Cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status",
      });
    }

    const booking = await bookingService.updateBookingStatus(id, status);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);

    return res.status(500).json({
      message: "Error updating booking status",
    });
  }
};


export const deleteBookingController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(String(req.params.id));

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({message: "Invalid booking ID"});
        }

        const booking = await bookingService.deleteBooking(id);

        if (!booking) {
            return res.status(404).json({message: "Booking not found"});
        }

        return res.status(200).json({message: "Booking deleted successfully", booking});
    } catch (error) {
        console.error("Error deleting booking:", error);

        return res.status(500).json({message: "Error deleting booking"});
    }
};
