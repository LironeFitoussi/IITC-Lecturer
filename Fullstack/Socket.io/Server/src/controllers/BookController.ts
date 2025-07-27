import { Request, Response } from 'express';
import { CreateBookRequest, UpdateBookRequest } from '../types';
import BookModel from '../models/Book';
import AuthorModel from '../models/Author';

const BookController = {
  async createBook(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, publishedYear, authorId }: CreateBookRequest & { authorId: string } = req.body;

      // Check if author exists
      const author = await AuthorModel.findById(authorId);
      if (!author) {
        res.status(400).json({ message: 'Author not found' });
        return;
      }

      // Create new book
      const book = await BookModel.create({ title, description, publishedYear, authorId });

      res.status(201).json({
        message: 'Book created successfully',
        book
      });
    } catch (error) {
      console.error('Create book error:', error);
      res.status(500).json({ message: 'Server error during book creation' });
    }
  },

  async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await BookModel.getAllBooks();

      res.json({
        message: `Found ${books.length} books`,
        books,
        total: books.length
      });
    } catch (error) {
      console.error('Get all books error:', error);
      res.status(500).json({ message: 'Server error while fetching books' });
    }
  },

  async getBookById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const book = await BookModel.findById(id);
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }

      res.json({
        book
      });
    } catch (error) {
      console.error('Get book by ID error:', error);
      res.status(500).json({ message: 'Server error while fetching book' });
    }
  },

  async getBooksByAuthor(req: Request, res: Response): Promise<void> {
    try {
      const { authorId } = req.params;

      // Check if author exists
      const author = await AuthorModel.findById(authorId);
      if (!author) {
        res.status(404).json({ message: 'Author not found' });
        return;
      }

      const books = await BookModel.findByAuthorId(authorId);

      res.json({
        message: `Found ${books.length} books by ${author.name}`,
        author,
        books,
        total: books.length
      });
    } catch (error) {
      console.error('Get books by author error:', error);
      res.status(500).json({ message: 'Server error while fetching books by author' });
    }
  },

  async searchBooks(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        res.status(400).json({ message: 'Search query is required' });
        return;
      }

      const books = await BookModel.searchBooks(q);

      res.json({
        message: `Found ${books.length} books matching "${q}"`,
        query: q,
        books,
        total: books.length
      });
    } catch (error) {
      console.error('Search books error:', error);
      res.status(500).json({ message: 'Server error while searching books' });
    }
  },

  async updateBook(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateBookRequest = req.body;

      const book = await BookModel.updateBook(id, updateData);
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }

      res.json({
        message: 'Book updated successfully',
        book
      });
    } catch (error) {
      console.error('Update book error:', error);
      res.status(500).json({ message: 'Server error while updating book' });
    }
  },

  async deleteBook(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await BookModel.deleteBook(id);
      if (!deleted) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }

      res.json({
        message: 'Book deleted successfully'
      });
    } catch (error) {
      console.error('Delete book error:', error);
      res.status(500).json({ message: 'Server error while deleting book' });
    }
  }
};

export default BookController; 