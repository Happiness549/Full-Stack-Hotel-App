import { Router } from "express";
import{createFavouriteController, getMyFavouritesController,getFavouriteByHotelIdController, 
    deleteFavouriteController
} from '../controllers/favouriteController'
import { protect } from "../middleware/autMiddleware";

const router = Router();

router.post("/:hotelId/", createFavouriteController);
router.get("/my", getMyFavouritesController);
router.get("/hotel/:hotelId", getFavouriteByHotelIdController);
router.delete("/hotel/:hotelId", deleteFavouriteController);








export default router;