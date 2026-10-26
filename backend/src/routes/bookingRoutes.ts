import { Router } from "express";
import {createBookingController, getAllBookings,getBookingById, deleteBookingController, updateBookingController } from '../controllers/bookingControllers'
import {protect, adminOnlyAddHotel} from '../middleware/autMiddleware'

const router = Router();

router.post("/:user_id/room/:room_id",protect, createBookingController);
router.get('/', protect, adminOnlyAddHotel, getAllBookings);
router.get('/:id',protect,adminOnlyAddHotel, getBookingById)
router.delete("/:id", protect, deleteBookingController);
router.patch("/:id", protect, adminOnlyAddHotel, updateBookingController);



export default router;