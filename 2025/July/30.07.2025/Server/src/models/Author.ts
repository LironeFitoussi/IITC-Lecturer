import mongoose, { Document, Schema } from 'mongoose'

interface IAuthor extends Document {
  _id: mongoose.Types.ObjectId;
  name: string,
  bio: string,
  birthYear: number,
  createdAt: Date;
  updatedAt: Date;
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

const Author = mongoose.model<IAuthor>("Author", authorSchema)
export default Author;