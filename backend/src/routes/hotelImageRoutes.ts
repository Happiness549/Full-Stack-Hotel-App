import { Router } from "express";
import { protect, adminOnlyAddHotel  } from "../middleware/autMiddleware";
import { addHotelImageByHotelId, getHotelImagesByHotelId } from "../controllers/hotelImageController";

const router = Router();

router.post("/:id/images", protect, adminOnlyAddHotel, addHotelImageByHotelId);
router.get("/:id/images", getHotelImagesByHotelId);

export default router;