
import { Request, Response } from "express";
import * as paymentService from "../services/paymentService";
import { findBookingById } from "../services/bookingService";
import { User } from "../models/hotel.types";

// Create a Paystack payment
export const createPaymentController = async (req: Request,res: Response) => {
    try {
        const booking_id = Number(req.params.bookingId);
        const user = req.user as User;
        const user_id = user.id;

        if (!Number.isInteger(booking_id) || booking_id <= 0) {
            return res.status(400).json({message: "Invalid booking ID"});
        }

        const secretKey = process.env.PAYSTACK_SECRET_KEY;

        if (!secretKey) {
            return res.status(500).json({message: "Paystack secret key is missing"});
        }

        const booking = await findBookingById(booking_id);

        if (!booking) {
            return res.status(404).json({message: "Booking not found"});
        }

        if (Number(booking.user_id) !== user_id) {
            return res.status(403).json({message: "You cannot pay for another user's booking"});
        }

        if (booking.status === "Cancelled") {
            return res.status(400).json({message: "Cannot pay for a cancelled booking"});
        }

        const amount = Number(booking.total_price);

        if (!Number.isFinite(amount) || amount < 1) {
            return res.status(400).json({message: "The payment amount must be at least R1.00"});
        }

        const payment = await paymentService.createPayment(booking_id, user_id, amount,"ZAR","Paystack");

        if (!payment) {
            return res.status(500).json({message: "Could not create payment"});
        }

        const reference = `hotel_payment_${payment.id}`;

        const response = await fetch(
            "https://api.paystack.co/transaction/initialize",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${secretKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: user.email, amount: Math.round(amount * 100), currency: "ZAR",reference,
                    callback_url: `https://full-stack-hotel-app-4bx6.vercel.app/payment/success?payment_id=${payment.id}`,
                    channels: ["card"],
                    metadata: {
                        payment_id: payment.id,
                        booking_id,
                        user_id
                    }
                })
            }
        );

        const data = await response.json();

        if (!response.ok || !data.status) {
            console.error("Paystack error:", data);

            return res.status(500).json({
                message: "Could not start Paystack payment"
            });
        }

        return res.status(201).json({
            message: "Payment created",
            payment,
            paystackUrl: data.data.authorization_url,
            reference: data.data.reference
        });
    } catch (error) {
        console.error("Error creating payment:", error);

        return res.status(500).json({
            message: "Error creating payment"
        });
    }
};

// Verify a Paystack payment
export const verifyPaystackPaymentController = async (
    req: Request,
    res: Response
) => {
    try {
        const reference = String(req.query.reference || "");
        const paymentId = Number(req.query.payment_id);
        const user = req.user as User;

        if (!reference || !Number.isInteger(paymentId) || paymentId <= 0) {
            return res.status(400).json({
                message: "Invalid payment details"
            });
        }

        const payment = await paymentService.findPaymentById(paymentId);

        if (!payment || Number(payment.user_id) !== user.id) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }

        if (payment.payment_method !== "Paystack") {
            return res.status(400).json({
                message: "Invalid payment method"
            });
        }

        if (reference !== `hotel_payment_${payment.id}`) {
            return res.status(400).json({
                message: "Invalid payment reference"
            });
        }

        if (payment.status === "successful") {
            return res.status(200).json({
                message: "Payment already verified",
                payment
            });
        }

        if (payment.status !== "pending") {
            return res.status(400).json({
                message: "Payment is not pending"
            });
        }

        const secretKey = process.env.PAYSTACK_SECRET_KEY;

        if (!secretKey) {
            return res.status(500).json({
                message: "Paystack secret key is missing"
            });
        }

        const response = await fetch(
            `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
            {
                headers: {
                    Authorization: `Bearer ${secretKey}`
                }
            }
        );

        const data = await response.json();

        if (
            !response.ok ||
            !data.status ||
            data.data.status !== "success" ||
            data.data.reference !== reference ||
            data.data.currency !== "ZAR" ||
            Number(data.data.amount) !== Math.round(Number(payment.amount) * 100)
        ) {
            return res.status(400).json({
                message: "Payment could not be verified"
            });
        }

        const booking = await findBookingById(payment.booking_id);

        if (!booking || booking.status === "Cancelled") {
            return res.status(400).json({
                message: "Booking is unavailable"
            });
        }

        const confirmedPayment = await paymentService.confirmPayment(paymentId);

        if (!confirmedPayment) {
            return res.status(400).json({
                message: "Could not confirm payment"
            });
        }

        return res.status(200).json({
            message: "Payment verified successfully",
            payment: confirmedPayment
        });
    } catch (error) {
        console.error("Payment verification error:", error);

        return res.status(500).json({
            message: "Error verifying payment"
        });
    }
};

// Confirm a payment manually
export const confirmPaymentController = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid payment ID"
            });
        }

        const payment = await paymentService.confirmPayment(id);

        if (!payment) {
            return res.status(404).json({
                message: "Pending payment not found"
            });
        }

        return res.status(200).json({
            message: "Payment and booking confirmed successfully",
            payment
        });
    } catch (error) {
        console.error("Error confirming payment:", error);

        return res.status(500).json({
            message: "Error confirming payment"
        });
    }
};

// Get one payment
export const getPaymentByIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid payment ID"
            });
        }

        const payment = await paymentService.findPaymentById(id);

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }

        return res.status(200).json({ payment });
    } catch (error) {
        console.error("Error fetching payment:", error);

        return res.status(500).json({
            message: "Error fetching payment"
        });
    }
};

// Get the logged-in user's payments
export const getMyPaymentsController = async (
    req: Request,
    res: Response
) => {
    try {
        const user_id = (req.user as User).id;

        const payments = await paymentService.findPaymentsByUserId(user_id);

        return res.status(200).json({ payments });
    } catch (error) {
        console.error("Error fetching user payments:", error);

        return res.status(500).json({
            message: "Error fetching your payments"
        });
    }
};

// Get all payments
export const getAllPaymentsController = async (
    req: Request,
    res: Response
) => {
    try {
        const payments = await paymentService.findAllPayments();

        return res.status(200).json({ payments });
    } catch (error) {
        console.error("Error fetching all payments:", error);

        return res.status(500).json({
            message: "Error fetching payments"
        });
    }
};
