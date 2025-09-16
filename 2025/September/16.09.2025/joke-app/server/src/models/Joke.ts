import mongoose, { Document, Schema, Types } from "mongoose";

export interface IJokeDoc extends Document {
  _id: Types.ObjectId;
  content: string;
  punchline: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

const jokeSchema = new Schema<IJokeDoc>(
  {
    content: { type: String, required: true },
    punchline: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

const Joke = mongoose.model<IJokeDoc>("Joke", jokeSchema);

export default Joke;
