import { Router } from "express";
import { addHotel, getAllHotels, updateHotelById, deleteHotelById} from "../controllers/hotelControllers";
import { protect, adminOnlyAddHotel } from "../middleware/autMiddleware";

const router = Router();

router.post('/', protect,adminOnlyAddHotel,addHotel)
router.get('/', getAllHotels)
router.put('/:id',  protect,adminOnlyAddHotel, updateHotelById)
router.delete('/:id', protect,adminOnlyAddHotel, deleteHotelById)



export default router