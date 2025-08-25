import mongoose from "mongoose";

export async function connectToDatabase() {
    if (mongoose.connections[0].readyState === 0) return
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB");
}