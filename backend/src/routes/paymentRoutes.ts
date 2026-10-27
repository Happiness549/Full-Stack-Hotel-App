import { Router } from "express";
import { protect, adminOnly } from "../middleware/autMiddleware";
import {createPaymentController, getPaymentByIdController, getMyPaymentsController, getAllPaymentsController, verifyPaystackPaymentController,} from "../controllers/paymentController";

const router = Router();

router.post("/:bookingId", protect, createPaymentController);
router.get("/verify", protect, verifyPaystackPaymentController);
router.get("/my", protect, getMyPaymentsController);
router.get("/:id", protect, adminOnly, getPaymentByIdController);
router.get("/", protect, adminOnly, getAllPaymentsController);

export default router;