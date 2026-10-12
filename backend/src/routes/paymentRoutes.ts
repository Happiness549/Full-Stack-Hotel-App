import { Router } from "express";
import { protect, adminOnly } from "../middleware/autMiddleware";
import { createPaymentController, confirmPaymentController, getPaymentByIdController, getMyPaymentsController } from "../controllers/paymentController";

const router = Router();

router.post("/:bookingId", protect, createPaymentController);
router.patch("/:id/confirm", protect, confirmPaymentController);
router.get("/my", protect, getMyPaymentsController);
router.get("/:id", protect,adminOnly, getPaymentByIdController);

export default router;