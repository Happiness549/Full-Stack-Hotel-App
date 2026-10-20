
import cloudinary from "../config/cloudinary";
import { UploadApiResponse } from "cloudinary";

export const uploadImage = async (file: Express.Multer.File): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "hotel-app"
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                if (!result) {
                    return reject(new Error("Image upload failed"));
                }

                resolve(result);
            }
        );

        uploadStream.end(file.buffer);
    });
};