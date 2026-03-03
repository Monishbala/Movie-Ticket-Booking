import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

// api to get user bookings
export const getUserBookings = async(req, res) => {
    try {
        const { userId } = req.auth();

        if (!userId) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const bookings = await Booking.find({ user: userId })
            .populate({ 
                path: "show",populate:{path:"movie"}})
            .sort({ createdAt: -1 });

        return res.json({ success: true, bookings });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// api to add/remove from favorite list
export const updateFavorite = async(req, res) => {
    try {
        const { movieId } = req.body;
        const { userId } = req.auth();

        if (!userId) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const user = await clerkClient.users.getUser(userId);

        const favorites = user.privateMetadata.favorites || [];

        const updatedFavorites = favorites.includes(movieId)
            ? favorites.filter((item) => item !== movieId)
            : [...favorites, movieId];

        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: { ...user.privateMetadata, favorites: updatedFavorites }
        });

        return res.json({ success: true, message: "Favorite updated successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// api to get favorites
export const getFavorites = async(req, res) => {
    try {
        const { userId } = req.auth();

        if (!userId) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const user = await clerkClient.users.getUser(userId);
        const favorites = user.privateMetadata.favorites || [];

        const movies = await Movie.find({ _id: { $in: favorites } });

        return res.json({ success: true, movies });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}