import { Request, Response } from 'express';
import AuthorModel from '../models/Author';

const AuthorController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, bio, birthYear } = req.body

      if (!name || !birthYear) {
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

  async findAuthor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const author = await AuthorModel.findById(id).populate('books')

      if (!author) {
        res.status(404).json({
          success: false,
          message: `Author With id: ${id} Not Found`
        })
        return
      }
      
      author.log()
      
      res.json({
        success: true,
        data: author
      })
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration', error });
    }
  },
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const authors = await AuthorModel.find({})

      if (!authors.length) {
        res.status(404).json({
          success: false,
          message: `No Authors foudn, add some`
        })
        return
      }

      res.json({
        success: true,
        data: authors
      })
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration', error });
    }
  },
  async updateAuthor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const { name, birthYear, bio } = req.body

      if (!name && !birthYear && !bio) {
        res.status(400).json({
          success: false,
          message: `At leat on field is required`
        })
        return
      }

      const upadtedAuthor = await AuthorModel.findByIdAndUpdate(id, {
        name, birthYear, bio
      }, { new: true})

      if (!upadtedAuthor) {
        res.status(404).json({
          success: false,
          message: `Author With id: ${id} Not Found`
        })
        return
      }

      res.json({
        success: true,
        data: upadtedAuthor
      })
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration', error });
    }
  },
  async deleteAuthor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      if (!id) {
        res.status(404).json({
          success: false,
          message: `Author With id: ${id} Not Found`
        })
        return
      }

      await AuthorModel.findByIdAndDelete(id)

      res.json({
        success: true,
        message: `Userd with id: ${id} Delete, R.I.P`
      })
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration', error });
    }
  },
};

export default AuthorController; 