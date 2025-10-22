import type { Request, Response } from "express";
import Cat from "../models/Cat.js";

export const getAllCats = async (req: Request, res: Response) => {
  try {
    const allCats = await Cat.findAll();
    return res.status(200).json({ data: allCats });
  } catch (error) {
    return res.status(500).json({ message: "Something is not working" });
  }
};

export const saveNewCat = async (req: Request, res: Response) => {
  try {
    const { name, age, breed } = req.body;

    // Coerce & basic validation
    const parsedAge = Number(age);
    if (!name || !breed || Number.isNaN(parsedAge)) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    // Create an instance and call the instance method
    const cat = new Cat({ name, age: parsedAge, breed });
    console.log(cat);
    
    const created = await cat.save();

    return res.status(201).json({ data: created });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Something is not working" });
  }
};
