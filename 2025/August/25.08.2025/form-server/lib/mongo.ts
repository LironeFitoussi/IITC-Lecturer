import mongoose from "mongoose";

export async function connectToDatabase() {
    try {
        if (mongoose.connections[0].readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/forms');
            console.log("Connected to MongoDB");
        } 
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export async function disconnectFromDatabase() {
    try {
        if (mongoose.connections[0].readyState !== 0) {
            await mongoose.disconnect();
            console.log("Disconnected from MongoDB");
        }
    } catch (error) {
        console.error("Error disconnecting from MongoDB:", error);
        throw error;
    }
}