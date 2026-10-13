import { Router } from "express";
import{createFavouriteController, getMyFavouritesController,getFavouriteByHotelIdController} from '../controllers/favouriteController'
import { protect } from "../middleware/autMiddleware";

const router = Router();

router.post("/:hotelId/", protect, createFavouriteController);
router.get("/my", protect, getMyFavouritesController);
router.get("/hotel/:hotelId", protect, getFavouriteByHotelIdController);






export default router;