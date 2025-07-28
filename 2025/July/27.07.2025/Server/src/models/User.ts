import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string,
  name: string,
  password: string,
  createdAt: Date;
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
})

const User = mongoose.model<IUser>("User", userSchema)
export default User;

// User operations
// const UserModel = {
//   async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    
//     console.log(`User created: ${user.email}, Total users: ${users.length}`);
//     return user;
//   },

//   async findByEmail(email: string): Promise<User | undefined> {
//     console.log(`Looking for user with email: ${email}`);
//     console.log(`Current users in memory: ${users.length}`);
    
//     const user = users.find(user => user.email === email);
//     console.log(`Found user: ${user ? 'Yes' : 'No'}`);
//     return user;
//   },

//   async findById(id: string): Promise<User | undefined> {
//     return users.find(user => user.id === id);
//   },

//   async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
//     console.log(`Validating password...`);
//     console.log(`Plain password length: ${plainPassword.length}`);
//     console.log(`Hashed password: ${hashedPassword}`);
    
//     const isValid = await bcrypt.compare(plainPassword, hashedPassword);
//     console.log(`Password validation result: ${isValid}`);
//     return isValid;
//   },

//   async emailExists(email: string): Promise<boolean> {
//     return users.some(user => user.email === email);
//   },

//   // Helper functions for development/debugging
//   getAllUsers(): User[] {
//     return users;
//   },

//   clearUsers(): void {
//     users = [];
//     console.log('All users cleared');
//   },

//   deleteUser(id: string): boolean {
//     const initialLength = users.length;
//     users = users.filter(user => user.id !== id);
//     const deleted = users.length < initialLength;
    
//     if (deleted) {
//       console.log(`User deleted: ${id}, Total users: ${users.length}`);
//     } else {
//       console.log(`User not found for deletion: ${id}`);
//     }
    
//     return deleted;
//   }
// };

