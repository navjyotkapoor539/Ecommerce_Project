import User from "./models/User.js";
import bcrypt from "bcryptjs";
import connectToDatabase from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME = process.env.ADMIN_NAME;

const seedAdmin=async()=>{
    connectToDatabase();
    try {
        const hashPassword=await bcrypt.hash(ADMIN_PASSWORD,10);
        const newUser=new User({
            name:ADMIN_NAME,
            email:ADMIN_EMAIL,
            password:hashPassword,
            role:"admin",
            refreshTokens: []
        })
        await newUser.save();
    } catch (error) {
        console.log(error);
    }
}

seedAdmin();