import express from "express";
import { createPaymentIntent } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/create-payment-intent", protect, createPaymentIntent);

export default router;