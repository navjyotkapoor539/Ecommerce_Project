import stripe from "../config/stripe.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

export const createPaymentIntent=async(req,res)=>{
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "price"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    let amount=0;
    const orderItems=cart.items.map((item)=>{
        amount+=item.product.price * item.quantity;
        return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    })
     // Stripe expects amount in smallest currency unit
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // INR → paise
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
     const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount:amount,
      paymentIntentId: paymentIntent.id,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id,
    });
  } catch (error) {
    console.error("Stripe payment error:", error);
    res.status(500).json({ message: "Payment initiation failed" });
  }
};