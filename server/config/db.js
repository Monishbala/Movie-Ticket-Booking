import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log("MongoDB is connected");
            
        })
        await mongoose.connect(process.env.MONGODB_URI,{
  family: 4})
    } catch (error) {
        console.log(error.message);
    }
}