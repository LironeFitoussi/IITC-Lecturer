import mongoose, { Document, Schema } from 'mongoose';
import { Author } from '../types';

// Define the Author document interface
export interface AuthorDocument extends Document, Omit<Author, 'id'> {
  _id: mongoose.Types.ObjectId;
}

// Create the Author schema
const authorSchema = new Schema<AuthorDocument>({
  name: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  }
}, {
  timestamps: true
});

// Create and export the Author model
const AuthorModel = mongoose.model<AuthorDocument>('Author', authorSchema);

// Author operations wrapper
const AuthorOperations = {
  async create(authorData: Omit<Author, 'id' | 'createdAt' | 'updatedAt'>): Promise<Author> {
    const author = new AuthorModel(authorData);
    const savedAuthor = await author.save();
    
    return {
      id: savedAuthor._id.toString(),
      name: savedAuthor.name,
      email: savedAuthor.email,
      bio: savedAuthor.bio,
      createdAt: savedAuthor.createdAt,
      updatedAt: savedAuthor.updatedAt
    };
  },

  async findById(id: string): Promise<Author | undefined> {
    try {
      const author = await AuthorModel.findById(id);
      
      if (!author) return undefined;
      
      return {
        id: author._id.toString(),
        name: author.name,
        email: author.email,
        bio: author.bio,
        createdAt: author.createdAt,
        updatedAt: author.updatedAt
      };
    } catch (error) {
      console.error('Error finding author by ID:', error);
      return undefined;
    }
  },

  async findByEmail(email: string): Promise<Author | undefined> {
    const author = await AuthorModel.findOne({ email: email.toLowerCase() });
    
    if (!author) return undefined;
    
    return {
      id: author._id.toString(),
      name: author.name,
      email: author.email,
      bio: author.bio,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt
    };
  },

  async getAllAuthors(): Promise<Author[]> {
    const authors = await AuthorModel.find({}).sort({ createdAt: -1 });
    
    return authors.map(author => ({
      id: author._id.toString(),
      name: author.name,
      email: author.email,
      bio: author.bio,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt
    }));
  },

  async updateAuthor(id: string, updateData: Partial<Omit<Author, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Author | undefined> {
    try {
      const author = await AuthorModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!author) return undefined;
      
      return {
        id: author._id.toString(),
        name: author.name,
        email: author.email,
        bio: author.bio,
        createdAt: author.createdAt,
        updatedAt: author.updatedAt
      };
    } catch (error) {
      console.error('Error updating author:', error);
      return undefined;
    }
  },

  async deleteAuthor(id: string): Promise<boolean> {
    try {
      const result = await AuthorModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting author:', error);
      return false;
    }
  },

  async emailExists(email: string): Promise<boolean> {
    const count = await AuthorModel.countDocuments({ email: email.toLowerCase() });
    return count > 0;
  }
};

export default AuthorOperations; 