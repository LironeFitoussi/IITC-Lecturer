// Import the 'express' module
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";

//routes
import jokeRoutes from "./routes/jokes.routes.js";

// Create an Express application
const app = express();
connectDB();

//middleware
//prints logs of reqs
app.use(morgan("tiny"));

//Parses the body of the req
app.use(express.json());

//use of cors
app.use(
  cors({
    origin: "*",
  })
);

// Set the port number for the server
const PORT = 3000;

// Define a route for the root path ('/')
app.get("/", (req, res) => {
  // Send a response to the client
  res.send("Hello, TypeScript + Node.js + Express!");
});
app.use("/api/jokes", jokeRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${PORT}`);
});
