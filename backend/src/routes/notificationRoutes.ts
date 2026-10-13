import { Router } from "express";
import { protect, adminOnly } from "../middleware/autMiddleware";
import { createNotificationController, markNotificationAsReadController, deleteNotificationController } from "../controllers/notificationController";

const router = Router();


router.post("/", protect, createNotificationController);
router.patch("/:id/read", protect, markNotificationAsReadController);
router.delete("/:id", protect, deleteNotificationController);


export default router