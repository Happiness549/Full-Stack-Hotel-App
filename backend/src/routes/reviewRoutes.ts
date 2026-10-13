
import { Router } from "express";
import { protect } from "../middleware/autMiddleware";
import { createReviewController,  updateReviewById, getAllReviews } from "../controllers/reviewController";

const router = Router();

router.post("/:hotelId", protect, createReviewController);
router.put('/:id', protect, updateReviewById)
router.get('/', protect, getAllReviews)

export default router;