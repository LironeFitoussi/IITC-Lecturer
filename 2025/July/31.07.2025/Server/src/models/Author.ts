import mongoose, { Document, Schema } from 'mongoose'
import Book from './Book'

interface IAuthor extends Document {
_id: mongoose.Types.ObjectId;
name: string,
  bio: string,
  birthYear: number,
  createdAt: Date;
  updatedAt: Date;

  // Custom Methods
  log: () => void
}

const authorSchema = new Schema<IAuthor>({
  name: {
    type: String,
    require: true, 
    unique: true
  },
  bio: String,
  birthYear: {
    type: Number,
    require: true, 
  },
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

authorSchema.virtual('books', {
  ref: "Book",
  localField: "_id",
  foreignField: "author"
});


authorSchema.pre(/delete/i, async function (this: any, next) {
  const docId = this.getQuery()._id;
  await Book.deleteMany({ author: docId });
  next()
});

authorSchema.methods.log = function () {
  console.log(`[INSTANCE LOG] ${this._id}`);
}

const Author = mongoose.model<IAuthor>("Author", authorSchema)
export default Author;