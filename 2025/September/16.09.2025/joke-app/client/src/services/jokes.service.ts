import api from "./api";

export async function getAllJokes() {
  try {
    const { data } = await api.get("/jokes");
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);

    throw new Error("error fetching data");
  }
}

export async function createJoke() {}
