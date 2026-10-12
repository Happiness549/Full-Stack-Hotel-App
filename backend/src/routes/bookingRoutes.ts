import { Router } from "express";
import {createBookingController, getAllBookings,getBookingById } from '../controllers/bookingControllers'
import {protect, adminOnlyAddHotel} from '../middleware/autMiddleware'

const router = Router();

router.post("/:user_id/room/:room_id", createBookingController);
router.get('/', protect, adminOnlyAddHotel, getAllBookings);
router.get('/:id',protect,adminOnlyAddHotel, getBookingById)



export default router;