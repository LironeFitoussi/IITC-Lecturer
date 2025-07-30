import { Request, Response } from 'express';
import AuthorModel from '../models/Author';

const AuthorController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, bio, birthYear } = req.body

      if ( !name || !birthYear) {
        res.status(400).json({
          success: false,
          message: "name or birthYear are missing"
        })
        return
      } 

      const newAuthor = await AuthorModel.create({
        name,
        bio,
        birthYear
      })

      await newAuthor.save()

      res.status(201).json({
        success: true,
        data: newAuthor
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration', error });
    }
  },
};

export default AuthorController; 