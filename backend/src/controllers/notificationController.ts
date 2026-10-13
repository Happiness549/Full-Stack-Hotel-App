import { Request, Response } from "express";
import * as notificationService from "../services/notificationService";
import { User } from "../models/hotel.types";

export const createNotificationController = async (req: Request, res: Response) => {
    try {
        const user_id = parseInt(String(req.params.userId));
        const { title, message, type } = req.body;

        if (!user_id || !title || !message || !type) {
            return res.status(400).json({message: "All fields are required"});
        }

        const notification = await notificationService.createNotification(Number(user_id),title, message,type);

        return res.status(201).json({message: "Notification created successfully", notification});
    } catch (error) {
        console.error("Error creating notification:", error);
        return res.status(500).json({message: "Error creating notification"});
    }
};


export const markNotificationAsReadController = async (req: Request, res: Response
) => {
    try {
        const id = Number(req.params.id);
        const user = req.user as User;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({message: "Valid notification ID is required"});
        }

        const notification = await notificationService.markNotificationAsRead(id, user.id);

        if (!notification) {
            return res.status(404).json({message: "Notification not found"});
        }

        return res.status(200).json({message: "Notification marked as read", notification});
    } catch (error) {
        console.error("Mark notification as read error:", error);

        return res.status(500).json({message: "Failed to mark notification as read"});
    }
};


export const deleteNotificationController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = req.user as User;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({message: "Valid notification ID is required"});
        }

        const notification = await notificationService.deleteNotification(id, user.id);

        if (!notification) {
            return res.status(404).json({message: "Notification not found"});
        }

        return res.status(200).json({message: "Notification deleted successfully",notification});
    } catch (error) {
        console.error("Delete notification error:", error);

        return res.status(500).json({message: "Failed to delete notification" });
    }
};