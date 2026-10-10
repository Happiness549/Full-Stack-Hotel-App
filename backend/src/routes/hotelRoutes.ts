import { Router } from "express";
import { addHotel, getAllHotels, getHotelById } from "../controllers/hotelControllers";
import { protect, adminOnlyAddHotel } from "../middleware/autMiddleware";

const router = Router();

router.post('/', protect,adminOnlyAddHotel,addHotel)
router.get('/', getAllHotels)
router.get('/:id', getHotelById)


export default router