import { Router } from "express";
import {
  createJoke,
  getAllJokes,
  GetJokeById,
  getRandomJoke,
  updateJoke,
  deleteJoke,
} from "../controllers/joke.controller.ts";
const router = Router();

//CRUD
// create- POST http://localhost:3000/api/jokes/
router.post("/", createJoke);

//read- GET http://localhost:3000/api/jokes/
router.get("/", getAllJokes);

//get by random
router.get("/random", getRandomJoke);

//get by id- GET http://localhost:3000/api/jokes/:id
router.get("/:id", GetJokeById);

//update- PATCH http://localhost:3000/api/jokes/
router.patch("/:id", updateJoke);

//delete- DELETE http://localhost:3000/api/jokes/
router.delete("/:id", deleteJoke);

export default router;
