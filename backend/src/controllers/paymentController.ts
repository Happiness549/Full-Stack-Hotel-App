import { Request, Response } from "express";
import * as paymentService from '../services/paymentService'
import { query } from "../config/database";
import { findBookingById } from "../services/bookingService";
import { User } from "../models/hotel.types";
import crypto from "crypto";


const encodePayFastValue = (value: string) =>
    encodeURIComponent(value)
        .replace(/[!'()*]/g, (char) =>
            `%${char.charCodeAt(0).toString(16).toUpperCase()}`
        )
        .replace(/%20/g, "+");



export const createPaymentController = async (req: Request, res: Response) => {
    try {
        const booking_id = parseInt(String(req.params.bookingId));
        const user = req.user as User;
        const user_id = user.id;

        if (!Number.isInteger(booking_id) || booking_id <= 0) {
            return res.status(400).json({ message: "Invalid booking ID" });
        }

        const merchantId = process.env.PAYFAST_MERCHANT_ID;
        const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
        const passphrase = process.env.PAYFAST_PASSPHRASE;

        if (!merchantId || !merchantKey || !passphrase) {
            return res.status(500).json({
                message: "PayFast environment variables are missing"
            });
        }

        const booking = await findBookingById(booking_id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (Number(booking.user_id) !== user_id) {
            return res.status(403).json({
                message: "You cannot pay for another user's booking"
            });
        }

        if (booking.status === "Cancelled") {
            return res.status(400).json({
                message: "Cannot pay for a cancelled booking"
            });
        }

        const amount = Number(booking.total_price);

        if (!Number.isFinite(amount) || amount < 5) {
            return res.status(400).json({
                message: "The payment amount must be at least R5.00"
            });
        }

        const payment = await paymentService.createPayment(booking_id,user_id,amount,"ZAR","PayFast"
        );

        if (!payment) {
            return res.status(500).json({
                message: "Could not create payment"
            });
        }

        const fields: Record<string, string> = {
            merchant_id: merchantId,
            merchant_key: merchantKey,
            return_url: `https://full-stack-hotel-app-4bx6.vercel.app/payment/success?payment_id=${payment.id}`,
            cancel_url: `https://full-stack-hotel-app-4bx6.vercel.app/payment/cancel?payment_id=${payment.id}`,
            notify_url: "https://full-stack-hotel-app.onrender.com/api/payments/notify",
            name_first: user.name,
            name_last: user.surname,
            email_address: user.email,
            m_payment_id: String(payment.id),
            amount: amount.toFixed(2),
            item_name: `Hotel Booking ${booking_id}`
        };

        const signatureString = Object.entries(fields)
            .filter(([, value]) => value.trim() !== "")
            .map(([key, value]) =>
                `${key}=${encodePayFastValue(value)}`
            )
            .join("&");

        const signature = crypto
            .createHash("md5")
            .update(
                `${signatureString}&passphrase=${encodePayFastValue(passphrase)}`
            )
            .digest("hex");

        return res.status(201).json({
            message: "Payment created",
            payment,
            payfastUrl: "https://sandbox.payfast.co.za/eng/process",
            payfastFields: {
                ...fields,
                signature
            }
        });
    } catch (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({
            message: "Error creating payment"
        });
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
            message: "Payment and booking confirmed successfully",payment});
    } catch (error) {
        console.error("Error confirming payment:", error);
        return res.status(500).json({message: "Error confirming payment"});
    }
};

export const getPaymentByIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(String(req.params.id));

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "Invalid payment ID" });
        }

        const payment = await paymentService.findPaymentById(id);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        return res.status(200).json({ payment });
    } catch (error) {
        console.error("Error fetching payment:", error);
        return res.status(500).json({ message: "Error fetching payment" });
    }
};

export const getMyPaymentsController = async (req: Request, res: Response) => {
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

export const getAllPaymentsController = async (req: Request, res: Response) => {
    try {
        const payments = await paymentService.findAllPayments();

        return res.status(200).json({ payments });
    } catch (error) {
        console.error("Error fetching all payments:", error);
        return res.status(500).json({message: "Error fetching payments"});
    }
};


export const payfastNotifyController = async (req: Request, res: Response) => {
    try {
        const data = req.body as Record<string, string>;

        const merchantId = process.env.PAYFAST_MERCHANT_ID;
        const passphrase = process.env.PAYFAST_PASSPHRASE;

        if (!merchantId || !passphrase) {
            return res.status(500).send("Payment configuration missing");
        }

        if (
            !data.signature ||
            data.merchant_id !== merchantId ||
            data.payment_status !== "COMPLETE" ||
            !data.m_payment_id ||
            !data.amount_gross
        ) {
            return res.status(400).send("Invalid notification");
        }

        const paramString = Object.entries(data)
            .filter(([key, value]) => key !== "signature" && value.trim() !== "")
            .map(([key, value]) =>
                `${key}=${encodePayFastValue(value.trim())}`
            )
            .join("&");

        const expectedSignature = crypto
            .createHash("md5")
            .update(
                `${paramString}&passphrase=${encodePayFastValue(passphrase.trim())}`
            )
            .digest("hex");

        if (data.signature !== expectedSignature) {
            return res.status(400).send("Invalid signature");
        }

        const paymentId = Number(data.m_payment_id);

        if (!Number.isInteger(paymentId) || paymentId <= 0) {
            return res.status(400).send("Invalid payment ID");
        }

        const payment = await paymentService.findPaymentById(paymentId);

            if (!payment) {
                return res.status(404).send("Payment not found");
            }

            if (payment.payment_method !== "PayFast") {
                return res.status(400).send("Invalid payment method");
            }

            if (payment.status === "successful") {
                return res.status(200).send("Payment already confirmed");
            }

            if (payment.status !== "pending") {
                return res.status(400).send("Payment is not pending");
            }

            const booking = await findBookingById(payment.booking_id);

            if (!booking || booking.status === "Cancelled") {
                return res.status(400).send("Booking is unavailable");
            }

        if (Math.abs(Number(payment.amount) - Number(data.amount_gross)) > 0.01) {
            return res.status(400).send("Payment amount mismatch");
        }

        const validationResponse = await fetch(
            "https://sandbox.payfast.co.za/eng/query/validate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: paramString
            }
        );

        const validationResult = (await validationResponse.text()).trim();

        if (!validationResponse.ok || validationResult !== "VALID") {
            return res.status(400).send("PayFast validation failed");
        }
        if (payment.status !== "pending") {
            return res.status(400).send("Payment is not pending");
        }

        const confirmedPayment = await paymentService.confirmPayment(paymentId);

        if (!confirmedPayment) {
            return res.status(409).send("Could not confirm payment");
        }

        return res.status(200).send("Payment confirmed");
    } catch (error) {
        console.error("PayFast notification error:", error);
        return res.status(500).send("Notification processing failed");
    }
};
