import { Router } from "express";
import { addHotel } from "../controllers/hotelControllers";
import { protect, adminOnlyAddHotel } from "../middleware/autMiddleware";

const router = Router();

router.post('/', protect,adminOnlyAddHotel,addHotel)



export default router