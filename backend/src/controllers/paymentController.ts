import { Request, Response } from "express";
import * as paymentService from '../services/paymentService'
import { query } from "../config/database";
import { findBookingById } from "../services/bookingService";
import { User } from "../models/hotel.types";


export const createPaymentController = async (req: Request, res: Response) => {
    try {
       const booking_id = parseInt(String(req.params.bookingId));
        const user_id = (req.user as User).id;
        const { currency, payment_method } = req.body;

        if (!Number.isInteger(booking_id) || booking_id <= 0 || !currency || !payment_method) {
            return res.status(400).json({ message: "Invalid payment details"});
        }

        const booking = await findBookingById(booking_id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (Number(booking.user_id) !== user_id) {
            return res.status(403).json({message: "You cannot pay for another user's booking"});
        }

        if (booking.status === "Cancelled") {
            return res.status(400).json({message: "Cannot pay for a cancelled booking"});
        }

        const payment = await paymentService.createPayment(booking_id, user_id, Number(booking.total_price), currency, payment_method);

        return res.status(201).json({message: "Payment created", payment});
    } catch (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({message: "Error creating payment"});
    }
};


export const confirmPaymentController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(String(req.params.id));

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "Invalid payment ID" });
        }

        const payment = await paymentService.confirmPayment(id);

        if (!payment) {
            return res.status(404).json({message: "Pending payment not found"});
        }

        return res.status(200).json({
            message: "Payment and booking confirmed successfully",payment
        });
    } catch (error) {
        console.error("Error confirming payment:", error);
        return res.status(500).json({message: "Error confirming payment"});
    }
};