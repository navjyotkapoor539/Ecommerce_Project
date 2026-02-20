import stripe from "../config/stripe.js";
import Order from "../models/Order.js";

export const stripeWebhook=async(req,res)=>{
    const sig=req.headers["stripe-signature"];
    let event;
    try {
        event=stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if(event.type === "payment_intent.succeeded"){
      const paymentIntent = event.data.object;

      await Order.findOneAndUpdate(
       { paymentIntentId: paymentIntent.id },
       { paymentStatus: "paid" }
    );
  }
  res.json({received:true});
}