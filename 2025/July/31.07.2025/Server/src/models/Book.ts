import mongoose, { Document, Schema } from 'mongoose'

interface IBook extends Document {
  _id: mongoose.Types.ObjectId;
  title: string,
  author: mongoose.Types.ObjectId;
  publishedYear: number,
  genres: string[],
  addedBy: mongoose.Types.ObjectId,
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    require: true, 
  },
  //? This is a reference to the Author model, so we can get the author of the book
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    require: true,
  },
  publishedYear: Number,
  //? This is an array of strings, so we can add multiple genres to a book
  genres: [String],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
},{
  timestamps: true
})

bookSchema.pre('save', function (this: IBook, next) {
  console.log(`[PRE-SAVE] Document about to be saved: ${this._id}`);
  next();
})


const Book = mongoose.model<IBook>("Book", bookSchema)
export default Book;