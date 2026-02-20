import express from "express";
import { placeOrder,getMyOrders,updateOrderStatus,cancelOrder, getAllOrders } from "../controllers/orderController.js";
import {protect, adminOnly } from "../middleware/authMiddleWare.js"; 

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.delete("/:id", protect, cancelOrder);
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
export default router;