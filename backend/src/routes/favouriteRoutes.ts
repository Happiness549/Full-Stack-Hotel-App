import { Router } from "express";
import{createFavouriteController} from '../controllers/favouriteController'
import { protect } from "../middleware/autMiddleware";

const router = Router();

router.post("/:hotelId/", protect, createFavouriteController);


export default router;