import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    items:[{product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},quantity:Number,price:Number}],
    totalAmount:{type:Number,required:true},
    paymentMethod:{type:String,enum:["COD","STRIPE"],required:true},
    paymentStatus:{type: String,enum: ["PENDING", "PAID", "FAILED"],default: "PENDING",},
    paymentIntentId:{type: String,},
    orderStatus:{type: String,enum: ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],default: "PLACED",},
},
{timestamps:true})

export default mongoose.model("Order",orderSchema);