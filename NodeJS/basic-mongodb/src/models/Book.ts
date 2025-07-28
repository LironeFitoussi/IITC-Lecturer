import mongoose, { Document, Schema } from 'mongoose';
import { Book } from '../types';

// Define the Book document interface
export interface BookDocument extends Document, Omit<Book, 'id'> {
  _id: mongoose.Types.ObjectId;
}

// Create the Book schema
const bookSchema = new Schema<BookDocument>({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Book description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  publishedYear: {
    type: Number,
    required: [true, 'Published year is required'],
    min: [1000, 'Published year must be at least 1000'],
    max: [new Date().getFullYear() + 1, 'Published year cannot be in the future']
  },
  authorId: {
    type: String,
    required: [true, 'Author ID is required']
  }
}, {
  timestamps: true
});

// Create index for better query performance
bookSchema.index({ authorId: 1 });
bookSchema.index({ title: 1 });

// Create and export the Book model
const BookModel = mongoose.model<BookDocument>('Book', bookSchema);

// Book operations wrapper
const BookOperations = {
  async create(bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>): Promise<Book> {
    const book = new BookModel(bookData);
    const savedBook = await book.save();
    
    return {
      id: savedBook._id.toString(),
      title: savedBook.title,
      description: savedBook.description,
      publishedYear: savedBook.publishedYear,
      authorId: savedBook.authorId.toString(),
      createdAt: savedBook.createdAt,
      updatedAt: savedBook.updatedAt
    };
  },

  async findById(id: string): Promise<Book | undefined> {
    try {
      const book = await BookModel.findById(id);
      
      if (!book) return undefined;
      
      return {
        id: book._id.toString(),
        title: book.title,
        description: book.description,
        publishedYear: book.publishedYear,
        authorId: book.authorId.toString(),
        createdAt: book.createdAt,
        updatedAt: book.updatedAt
      };
    } catch (error) {
      console.error('Error finding book by ID:', error);
      return undefined;
    }
  },

  async findByAuthorId(authorId: string): Promise<Book[]> {
    const books = await BookModel.find({ authorId }).sort({ createdAt: -1 });
    
    return books.map(book => ({
      id: book._id.toString(),
      title: book.title,
      description: book.description,
      publishedYear: book.publishedYear,
      authorId: book.authorId.toString(),
      createdAt: book.createdAt,
      updatedAt: book.updatedAt
    }));
  },

  async getAllBooks(): Promise<Book[]> {
    const books = await BookModel.find({}).sort({ createdAt: -1 });
    
    return books.map(book => ({
      id: book._id.toString(),
      title: book.title,
      description: book.description,
      publishedYear: book.publishedYear,
      authorId: book.authorId.toString(),
      createdAt: book.createdAt,
      updatedAt: book.updatedAt
    }));
  },

  async updateBook(id: string, updateData: Partial<Omit<Book, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Book | undefined> {
    try {
      const book = await BookModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!book) return undefined;
      
      return {
        id: book._id.toString(),
        title: book.title,
        description: book.description,
        publishedYear: book.publishedYear,
        authorId: book.authorId.toString(),
        createdAt: book.createdAt,
        updatedAt: book.updatedAt
      };
    } catch (error) {
      console.error('Error updating book:', error);
      return undefined;
    }
  },

  async deleteBook(id: string): Promise<boolean> {
    try {
      const result = await BookModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting book:', error);
      return false;
    }
  },

  async searchBooks(query: string): Promise<Book[]> {
    const books = await BookModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    
    return books.map(book => ({
      id: book._id.toString(),
      title: book.title,
      description: book.description,
      publishedYear: book.publishedYear,
      authorId: book.authorId.toString(),
      createdAt: book.createdAt,
      updatedAt: book.updatedAt
    }));
  }
};

export default BookOperations; 