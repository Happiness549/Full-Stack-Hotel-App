
import { Router } from "express";
import { protect, adminOnlyAddHotel  } from "../middleware/autMiddleware";
import { createRoomController, updateRoomController } from "../controllers/roomController";

const router = Router();

router.post("/:hotelId/rooms", protect, adminOnlyAddHotel, createRoomController);
router.put("/:hotelId/rooms/:id", protect, adminOnlyAddHotel, updateRoomController);

export default router;