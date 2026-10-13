
import { Router } from "express";
import { protect } from "../middleware/autMiddleware";
import { createReviewController } from "../controllers/reviewController";

const router = Router();

router.post("/:hotelId", protect, createReviewController);

export default router;