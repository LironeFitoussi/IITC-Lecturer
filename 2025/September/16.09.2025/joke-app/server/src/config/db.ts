import mongoose from "mongoose";
//mongodb+srv://omerlen1000:sTuA69WY7x9fPMLP@cluster0.q8nn2p1.mongodb.net/app?retryWrites=true&w=majority&appName=Cluster0

export default async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://omerlen1000:sTuA69WY7x9fPMLP@cluster0.q8nn2p1.mongodb.net/jokes?retryWrites=true&w=majority&appName=Cluster0",
      {}
    );
    console.log("connected to MongoDB successfully");
  } catch (err) {
    console.error(err);
  }
}
