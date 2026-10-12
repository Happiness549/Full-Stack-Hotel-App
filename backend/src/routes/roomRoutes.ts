
import { Router } from "express";
import { protect, adminOnlyAddHotel  } from "../middleware/autMiddleware";
import { createRoomController, updateRoomController, getAllRooms } from "../controllers/roomController";

const router = Router();

router.post("/:hotelId/rooms", protect, adminOnlyAddHotel, createRoomController);
router.put("/:hotelId/rooms/:id", protect, adminOnlyAddHotel, updateRoomController);
router.get('/rooms', protect, adminOnlyAddHotel, getAllRooms)

export default router;