import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {protect ,adminOnly } from "../middleware/authMiddleWare.js";
import { createProduct,getProducts,getSingleProduct,updateProduct,deleteProduct } from "../controllers/productController.js";
const router =express.Router();

router.get("/",getProducts);
router.get("/:id",getSingleProduct);

router.post("/",protect,adminOnly, upload.array("images", 5),createProduct);
router.put("/:id",protect,adminOnly,updateProduct);
router.delete("/:id",protect,adminOnly,deleteProduct);

export default router;