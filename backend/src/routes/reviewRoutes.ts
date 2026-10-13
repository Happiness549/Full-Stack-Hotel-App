
import { Router } from "express";
import { protect } from "../middleware/autMiddleware";
import { createReviewController,  updateReviewById } from "../controllers/reviewController";

const router = Router();

router.post("/:hotelId", protect, createReviewController);
router.put('/:id', protect, updateReviewById)

export default router;