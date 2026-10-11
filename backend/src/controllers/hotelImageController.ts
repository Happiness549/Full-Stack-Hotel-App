import { Request, Response } from "express";
import { addHotelImage, setPrimaryHotelImage,getHotelImages, updateHotelImage } from "../services/hotelImageService";


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






export const getHotelImagesByHotelId = async (req: Request, res: Response) => {
    try {
        const hotel_id = parseInt(String(req.params.id));

        const hotelImages = await getHotelImages(hotel_id);

        res.status(200).json(hotelImages);
    } catch (error) {
        console.log("Error getting hotel images:", error);
        res.status(500).json({ message: "Error getting hotel images" });
    }
};
        



export const setPrimaryHotelImageById = async (req: Request, res: Response) => {
    try {
        const hotel_id = parseInt(String(req.params.id));
        const image_id = parseInt(String(req.params.imageId));

        const primaryImage = await setPrimaryHotelImage(hotel_id, image_id);

        if (!primaryImage) {
            return res.status(404).json({
                message: "Hotel image not found"
            });
        }

        return res.status(200).json({
            message: "Primary hotel image updated successfully",
            primaryImage
        });
    } catch (error) {
        console.log("Error setting primary hotel image:", error);
        return res.status(500).json({
            message: "Error setting primary hotel image"
        });
    }
};


export const updateHotelImageById = async (req: Request, res: Response) => {
    try {
        const hotel_id = parseInt(String(req.params.id));
        const image_id = parseInt(String(req.params.imageId));
        const { image_url } = req.body;

        if (!image_url) {
            return res.status(400).json({
                message: "Image URL is required"
            });
        }

        const updatedImage = await updateHotelImage(hotel_id, image_id, image_url);

        if (!updatedImage) {
            return res.status(404).json({
                message: "Hotel image not found"
            });
        }

        return res.status(200).json({
            message: "Hotel image updated successfully",
            updatedImage
        });
    } catch (error) {
        console.log("Error updating hotel image:", error);
        return res.status(500).json({
            message: "Error updating hotel image"
        });
    }
};