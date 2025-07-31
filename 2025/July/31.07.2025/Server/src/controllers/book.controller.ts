import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import BookModel from '../models/Book';
import Author from '../models/Author';
import User from '../models/User';
const BookController = {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { title, author, publishedYear, genres } = req.body

      // Find and Validate Author
      const bookAuthor = await Author.findById(author);

      if (!bookAuthor) {
        res.status(400).json({
          success: false,
          message: "error"
        })
        return
      }

      // Find user who careat it
      const user = await User.findById(req.user?.userId);

      if (!user) {
        res.status(400).json({
          success: false,
          message: "error"
        })
        return
      }

      const newBook = await BookModel.create({
        title,
        author: bookAuthor._id,
        publishedYear,
        genres,
        addedBy: user._id
      })

      // Populate author and user details
      const populatedBook = await BookModel.findById(newBook._id)
        .populate('author')
        .populate('addedBy', 'name')

      res.status(201).json({
        success: true,
        data: populatedBook
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration', error });
    }
  },

  // async findAuthor(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params

  //     const author = await BookModel.findById(id)

  //     if (!author) {
  //       res.status(404).json({
  //         success: false,
  //         message: `Author With id: ${id} Not Found`
  //       })
  //       return
  //     }

  //     res.json({
  //       success: true,
  //       data: author
  //     })
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     res.status(500).json({ message: 'Server error during registration', error });
  //   }
  // },

  // async findAll(req: Request, res: Response): Promise<void> {
  //   try {
  //     const authors = await BookModel.find({})

  //     if (!authors.length) {
  //       res.status(404).json({
  //         success: false,
  //         message: `No Authors foudn, add some`
  //       })
  //       return
  //     }

  //     res.json({
  //       success: true,
  //       data: authors
  //     })
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     res.status(500).json({ message: 'Server error during registration', error });
  //   }
  // },

  // async updateAuthor(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params
  //     const { name, birthYear, bio } = req.body

  //     if (!name && !birthYear && !bio) {
  //       res.status(400).json({
  //         success: false,
  //         message: `At leat on field is required`
  //       })
  //       return
  //     }

  //     const upadtedAuthor = await BookModel.findByIdAndUpdate(id, {
  //       name, birthYear, bio
  //     }, { new: true})

  //     if (!upadtedAuthor) {
  //       res.status(404).json({
  //         success: false,
  //         message: `Author With id: ${id} Not Found`
  //       })
  //       return
  //     }

  //     res.json({
  //       success: true,
  //       data: upadtedAuthor
  //     })
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     res.status(500).json({ message: 'Server error during registration', error });
  //   }
  // },
  async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await BookModel.aggregate([
        {
          $match: {
            publishedYear: {$gte: 2023} 
          }
        }, 
        {
          $project: {
            title: 1,
            nameUpper: { $toUpper: '$title' }
          }
        }
      ]);

      if (!books.length) {
        res.status(404).json({
          success: false,
          message: 'No books found, add some'
        });
        return;
      }

      res.json({
        success: true,
        data: books
      });
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Server error during fetching books', error });
    }
  },

  async deleteBook(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      if (!id) {
        res.status(404).json({
          success: false,
          message: `Book With id: ${id} Not Found`
        })
        return
      }

      await BookModel.findOneAndDelete({ _id: id })

      res.json({
        success: true,
        message: `Book with id: ${id} Delete, R.I.P`
      })
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration', error });
    }
  },
};

export default BookController; 