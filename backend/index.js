import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import { stripeWebhook } from "./controllers/stripeWebhook.js";
const app = express();
dotenv.config();

connectToDatabase();
app.use(express.json());

app.use(
  cors({
    origin: "https://ecommerce-project-5j11.vercel.app/",
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/payment",paymentRoutes);
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
