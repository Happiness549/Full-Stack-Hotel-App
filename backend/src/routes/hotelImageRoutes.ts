import { Router } from "express";
import { protect, adminOnlyAddHotel  } from "../middleware/autMiddleware";
import { addHotelImageByHotelId, setPrimaryHotelImageById, updateHotelImageById, deleteHotelImageById} from "../controllers/hotelImageController";

const router = Router();

router.post("/:id/images", protect, adminOnlyAddHotel, addHotelImageByHotelId);
router.patch("/:id/images/:imageId/primary", protect, adminOnlyAddHotel, setPrimaryHotelImageById);
router.put("/:id/images/:imageId", protect, adminOnlyAddHotel, updateHotelImageById);
router.delete("/:id/images/:imageId", protect, adminOnlyAddHotel,deleteHotelImageById);


export default router;