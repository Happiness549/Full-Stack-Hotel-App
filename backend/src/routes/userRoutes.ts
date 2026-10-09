import { Router } from "express";
import { register,login,getAllUsers, getUserById } from "../controllers/userController";
import { protect, adminOnly } from "../middleware/autMiddleware";


const router = Router()


router.post('/register', register)
router.post('/login', login)
router.get('/:id',protect,adminOnly, getUserById)
router.get('/', protect,adminOnly, getAllUsers)

export default router