import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error("Hey Dev, Yo ididnt provided thr mongodb uri string in the .env file")
}

const connectDB = async () => {
    try {
      await mongoose.connect(MONGODB_URI)
      console.log("Succefully Connected to DB")
    } catch (error) {
      throw new Error("we've got an issue while connecting to the DB")
    }
  }

  export default connectDB