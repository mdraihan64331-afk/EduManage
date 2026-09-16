import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connect successfuly ✅")
    } catch (error) {
        console.log("Database not connect ❌")
    }
    
}