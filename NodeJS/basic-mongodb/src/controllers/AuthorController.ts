import { Request, Response } from 'express';
import { CreateAuthorRequest, UpdateAuthorRequest } from '../types';
import AuthorModel from '../models/Author';

const AuthorController = {
  async createAuthor(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, bio }: CreateAuthorRequest = req.body;

      // Check if author already exists
      const existingAuthor = await AuthorModel.findByEmail(email);
      if (existingAuthor) {
        res.status(400).json({ message: 'Author with this email already exists' });
        return;
      }

      // Create new author
      const author = await AuthorModel.create({ name, email, bio });

      res.status(201).json({
        message: 'Author created successfully',
        author
      });
    } catch (error) {
      console.error('Create author error:', error);
      res.status(500).json({ message: 'Server error during author creation' });
    }
  },

  async getAllAuthors(req: Request, res: Response): Promise<void> {
    try {
      const authors = await AuthorModel.getAllAuthors();

      res.json({
        message: `Found ${authors.length} authors`,
        authors,
        total: authors.length
      });
    } catch (error) {
      console.error('Get all authors error:', error);
      res.status(500).json({ message: 'Server error while fetching authors' });
    }
  },

  async getAuthorById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const author = await AuthorModel.findById(id);
      if (!author) {
        res.status(404).json({ message: 'Author not found' });
        return;
      }

      res.json({
        author
      });
    } catch (error) {
      console.error('Get author by ID error:', error);
      res.status(500).json({ message: 'Server error while fetching author' });
    }
  },

  async updateAuthor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateAuthorRequest = req.body;

      const author = await AuthorModel.updateAuthor(id, updateData);
      if (!author) {
        res.status(404).json({ message: 'Author not found' });
        return;
      }

      res.json({
        message: 'Author updated successfully',
        author
      });
    } catch (error) {
      console.error('Update author error:', error);
      res.status(500).json({ message: 'Server error while updating author' });
    }
  },

  async deleteAuthor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await AuthorModel.deleteAuthor(id);
      if (!deleted) {
        res.status(404).json({ message: 'Author not found' });
        return;
      }

      res.json({
        message: 'Author deleted successfully'
      });
    } catch (error) {
      console.error('Delete author error:', error);
      res.status(500).json({ message: 'Server error while deleting author' });
    }
  }
};

export default AuthorController; 