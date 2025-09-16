import api from "./api";
import { type JokeDTO } from "../types";

export async function getAllJokes() {
  try {
    const { data } = await api.get("/jokes");
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);

    throw new Error("error fetching data");
  }
}

export async function createJoke(jokeData: JokeDTO) {
  try {
    const { data } = await api.post("/jokes", jokeData)
    return data
  } catch (err) {
    console.log(err);
    throw new Error("error fetching data");
  }
}
