import type { Request, Response } from "express";
import Joke from "../models/Joke.ts";

export const createJoke = async (req: Request, res: Response) => {
  try {
    const { content, punchline, author } = req.body;
    if (!content || !punchline || !author) {
      res
        .status(400)
        .json({ success: false, message: "all fields are required" });
      return;
    }

    const newJoke = await Joke.create({ content, punchline, author });
    await newJoke.save();
    res.json({ success: true, data: newJoke });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const getAllJokes = async (req: Request, res: Response) => {
  try {
    const allJokes = await Joke.find();
    res.json({ success: true, data: allJokes });
  } catch (err) {
    res.status(500).json({ succes: false, error: err });
  }
};

export const getRandomJoke = async (req: Request, res: Response) => {
  try {
    const randomJoke = await Joke.aggregate().sample(1);

    res.json({ success: true, data: randomJoke[0] });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const GetJokeById = async (req: Request, res: Response) => {
  try {
    const jokeById = await Joke.findById(req.params.id);
    if (!jokeById) {
      res
        .status(404)
        .json({ success: false, message: "didnt find your specified joke id" });
      return;
    }
    res.json({ success: true, data: jokeById });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const updateJoke = async (req: Request, res: Response) => {
  try {
    const { content, punchline, author } = req.body;
    const { id } = req.params;
    if (!content && !punchline && !author) {
      res
        .status(400)
        .json({ succsess: false, message: "at least one field is required" });
    }
    const updatedJoke = await Joke.findByIdAndUpdate(
      id,
      { content, punchline, author },
      { new: true }
    );
    if (!updatedJoke) {
      res
        .status(404)
        .json({ succsess: false, message: "this id doesnt exist" });
      return;
    }
    res.json({ success: true, data: updatedJoke });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const deleteJoke = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedJoke = await Joke.findByIdAndDelete(id);
    if (!deletedJoke) {
      res
        .status(404)
        .json({ succsess: false, message: "This id doesnt exist" });
      return;
    }

    res.json({ success: true, message: "deleted the specified joke" });
  } catch (err) {
    res.status(500).json({ err });
  }
};
