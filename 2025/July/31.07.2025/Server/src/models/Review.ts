import mongoose, { Document } from "mongoose";

interface IReview extends Document {
  _id: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId;
  reviewer: mongoose.Types.ObjectId;
  rating: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      require: true,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    text: String,
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model<IReview>("Review", reviewSchema);
export default Review;