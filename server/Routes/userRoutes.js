import express from "express";
import { getFavorites, getUserBookings, updateFavorite } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.get("/favorites", getFavorites);
userRouter.get("/bookings", getUserBookings);
userRouter.post("/update-favorite",updateFavorite);

export default userRouter;