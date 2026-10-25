import { Router } from "express";
import{createFavouriteController, getMyFavouritesController,getFavouriteByHotelIdController, 
    deleteFavouriteController
} from '../controllers/favouriteController'
import { protect } from "../middleware/autMiddleware";

const router = Router();

router.post("/:hotelId/", protect, createFavouriteController);
router.get("/my",protect, getMyFavouritesController);
router.get("/hotel/:hotelId",protect, getFavouriteByHotelIdController);
router.delete("/hotel/:hotelId",protect, deleteFavouriteController);








export default router;