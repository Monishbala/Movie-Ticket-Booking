import { Inngest } from "inngest";
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Inngest Functio to save user data to a database
const syncUserCreation = inngest.createFunction(
    {id:"sync-user-from-clerk"},
    {event:"clerk/user.created"},
    async({event})=>{
        const {id,first_name,last_name,imgae_url,email_addresses}=event.data;
        const userData = {
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name +" "+last_name,
            image:image_url
        }
        await User.create(userData);
    }
)

//Inngest function to delete user
const syncUserDeletion = inngest.createFunction(
    {id:"delete-user-with-clerk"},
    {event:"clerk/user.deleted"},
    async({event})=>{
        const {id}=event.data;
        await User.findByIdAndDelete(id);
    }
)

// Inngest function to update User
const syncUserUpdation = inngest.createFunction(
    {id:"update-user-from-clerk"},
    {event:"clerk/user.updated"},
    async({event})=>{
        const {id,first_name,last_name,image_url,email_addresses}=event.data;
        const userData = {
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name +" "+last_name,
            image:image_url
        }
        await User.findByIdAndUpdate(id,userData);
    }
)

export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation
];