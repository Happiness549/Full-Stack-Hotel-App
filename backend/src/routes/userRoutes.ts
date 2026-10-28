import { Router } from "express";
import { register,login,getAllUsers, getUserById, updateUserById, deleteUserById, getMyProfile, createAdmin } from "../controllers/userController";
import { protect, adminOnly } from "../middleware/autMiddleware";



const router = Router()


router.post('/register', register)
router.post('/login', login)
router.get("/profile", protect, getMyProfile);
router.get('/:id',protect,adminOnly, getUserById)
router.get('/', protect,adminOnly, getAllUsers)
router.put('/:id', updateUserById)
router.delete('/:id', deleteUserById)
router.post('/admin', protect, adminOnly, createAdmin);

export default router