
import { Router } from "express";
import { protect, adminOnlyAddHotel  } from "../middleware/autMiddleware";
import { createRoomController } from "../controllers/roomController";

const router = Router();

router.post("/:hotelId/rooms", protect, adminOnlyAddHotel, createRoomController);

export default router;