import { Router } from "express";
import { protect, adminOnly } from "../middleware/autMiddleware";
import { createNotificationController, markNotificationAsReadController } from "../controllers/notificationController";

const router = Router();

router.post("/:userId", protect, createNotificationController);
router.patch("/:id/read", protect, markNotificationAsReadController);



export default router