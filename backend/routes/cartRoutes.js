import express from "express";
import { addToCart, removeFromCart, getCart, updateCartItem } from "../controllers/cartController.js";
import {protect} from "../middleware/authMiddleWare.js"; 

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.delete("/:productId", protect, removeFromCart);
router.put("/update", protect, updateCartItem);

export default router;