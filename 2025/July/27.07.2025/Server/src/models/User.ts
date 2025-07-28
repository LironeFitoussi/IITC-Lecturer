import mongoose, { Document, Schema } from 'mongoose'

interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string,
  name: string,
  password: string,
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    require: true, 
    unique: true
  },
  password: {
    type: String,
    require: true, 
  },
  name: {
    type: String,
    require: true, 
  }
},{
  timestamps: true
})

const User = mongoose.model<IUser>("User", userSchema)
export default User;