import dotenv from 'dotenv';
dotenv.config();
import express from "express"
import cors from "cors"

import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

import { connectDB } from "./config/db.js";
import showRouter from "./Routes/showRoutes.js";
import bookingRouter from "./Routes/bookingRoutes.js";
import adminRouter from "./Routes/adminRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

const app= express();
const PORT = 3000;

await connectDB()

app.use("/api/stripe",express.raw({type:'application/json'}),stripeWebhooks)

// Middleware
app.use(express.json())
app.use(cors());
app.use(clerkMiddleware())


// API Routes
app.get("/",(req,res)=>{
    res.send("Server is live")
})

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show",showRouter)
app.use("/api/booking",bookingRouter)
app.use("/api/admin",adminRouter)
app.use("/api/user",userRouter)

app.listen(PORT,()=>{
   
    console.log(`Server is listening in PORT ${PORT}`);
    
})