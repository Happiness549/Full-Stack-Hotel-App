import { Router } from "express";
import { protect } from "../middleware/autMiddleware";
import { createPaymentController } from "../controllers/paymentController";

const router = Router();

router.post("/:bookingId", protect, createPaymentController);

export default router;