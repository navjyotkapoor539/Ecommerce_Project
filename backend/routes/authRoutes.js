import express from 'express';
import { register,login,logout,refreshAccessToken, getMe, getAllUsers } from '../controllers/authController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logout);
router.get('/me',protect, getMe);
router.get('/users',protect,adminOnly,getAllUsers);
export default router;  