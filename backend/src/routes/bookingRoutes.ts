import { Router } from "express";
import {createBookingController} from '../controllers/bookingControllers'

const router = Router();

router.post("/:user_id/room/:room_id", createBookingController);







export default router;