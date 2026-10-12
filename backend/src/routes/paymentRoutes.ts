import { Router } from "express";
import { protect } from "../middleware/autMiddleware";
import { createPaymentController, confirmPaymentController } from "../controllers/paymentController";

const router = Router();

router.post("/:bookingId", protect, createPaymentController);
router.patch("/:id/confirm", protect, confirmPaymentController);
export default router;