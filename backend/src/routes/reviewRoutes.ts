
import { Router } from "express";
import { protect } from "../middleware/autMiddleware";
import { createReviewController,  updateReviewById, getAllReviews,getReviewById,deleteUserById } from "../controllers/reviewController";

const router = Router();

router.post("/:hotelId", protect, createReviewController);
router.put('/:id', protect, updateReviewById)
router.get('/', protect, getAllReviews)
router.get('/:id', protect, getReviewById)
router.delete('/:id', protect, deleteUserById)

export default router;