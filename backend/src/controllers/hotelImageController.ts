import { Request, Response } from "express";
import { addHotelImage } from "../services/hotelImageService";

export const addHotelImageByHotelId = async (req: Request, res: Response) => {
    try {
         const hotel_id = parseInt(String(req.params.id))
        const { image_url } = req.body;

        if (!image_url) {
            return res.status(400).json({ message: "Image URL is required" });
        }

        const hotelImage = await addHotelImage(hotel_id, image_url);

        res.status(201).json({
            message: "Hotel image added successfully",
            hotelImage
        });
    } catch (error) {
        console.log("Error adding hotel image:", error);
        res.status(500).json({ message: "Error adding hotel image" });
    }
};