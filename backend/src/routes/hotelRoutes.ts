import { Router } from "express";
import { addHotel, getAllHotels, updateHotelById } from "../controllers/hotelControllers";
import { protect, adminOnlyAddHotel } from "../middleware/autMiddleware";

const router = Router();

router.post('/', protect,adminOnlyAddHotel,addHotel)
router.get('/', getAllHotels)
router.put('/:id',  protect,adminOnlyAddHotel, updateHotelById)



export default router