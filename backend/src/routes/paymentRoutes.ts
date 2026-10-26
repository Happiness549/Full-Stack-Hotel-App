import { Router } from "express";
import { protect, adminOnly } from "../middleware/autMiddleware";
import { createPaymentController, confirmPaymentController, getPaymentByIdController, getMyPaymentsController, 
    getAllPaymentsController, payfastNotifyController } from "../controllers/paymentController";

const router = Router();

router.post("/notify", payfastNotifyController);
router.post("/:bookingId", protect, createPaymentController);
router.get("/my", protect, getMyPaymentsController);
router.get("/:id", protect,adminOnly, getPaymentByIdController);
router.get("/", protect, adminOnly, getAllPaymentsController);

export default router;