import { Router } from "express";
import {createBookingController, getAllBookings, } from '../controllers/bookingControllers'
import {protect, adminOnlyAddHotel} from '../middleware/autMiddleware'

const router = Router();

router.post("/:user_id/room/:room_id", createBookingController);
router.get('/', protect, adminOnlyAddHotel, getAllBookings)



export default router;