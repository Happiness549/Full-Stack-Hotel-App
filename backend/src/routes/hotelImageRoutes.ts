import { Router } from "express";
import { protect, adminOnlyAddHotel  } from "../middleware/autMiddleware";
import { addHotelImageByHotelId, setPrimaryHotelImageById, 
    updateHotelImageById, deleteHotelImageById, uploadHotelImage, getHotelImagesByHotelId} from "../controllers/hotelImageController";
import { upload } from "../middleware/autMiddleware";

const router = Router();

router.post("/:id/images", protect, adminOnlyAddHotel, addHotelImageByHotelId);
router.patch("/:id/images/:imageId/primary", protect, adminOnlyAddHotel, setPrimaryHotelImageById);
router.put("/:id/images/:imageId", protect, adminOnlyAddHotel, updateHotelImageById);
router.get("/:id/images", getHotelImagesByHotelId);
router.delete("/:id/images/:imageId", protect, adminOnlyAddHotel,deleteHotelImageById);
router.post("/:id/images/upload", protect, adminOnlyAddHotel, upload.single("image"),uploadHotelImage);


export default router;