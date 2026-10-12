import { Router } from "express";
import { protect, adminOnly } from "../middleware/autMiddleware";
import { createNotificationController } from "../controllers/notificationController";

const router = Router();

router.post("/:userId", protect, createNotificationController);



export default router