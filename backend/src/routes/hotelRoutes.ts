import { Router } from "express";
import { addHotel, getAllHotels } from "../controllers/hotelControllers";
import { protect, adminOnlyAddHotel } from "../middleware/autMiddleware";

const router = Router();

router.post('/', protect,adminOnlyAddHotel,addHotel)
router.get('/', getAllHotels)



export default router