import { Router } from "express";
import{createFavouriteController, getMyFavouritesController} from '../controllers/favouriteController'
import { protect } from "../middleware/autMiddleware";

const router = Router();

router.post("/:hotelId/", protect, createFavouriteController);
router.get("/my", protect, getMyFavouritesController);




export default router;