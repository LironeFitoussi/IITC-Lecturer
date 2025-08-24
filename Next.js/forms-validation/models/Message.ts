import mongoose from 'mongoose';

// הגדרת ממשק TypeScript להודעה
export interface IMessage {
  name: string;
  email: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// הגדרת סכמה של Mongoose
const messageSchema = new mongoose.Schema<IMessage>(
  {
    name: {
      type: String,
      required: [true, 'שם הוא שדה חובה'],
      trim: true,
      minlength: [2, 'שם חייב להכיל לפחות 2 תווים'],
      maxlength: [100, 'שם לא יכול להכיל יותר מ-100 תווים']
    },
    email: {
      type: String,
      required: [true, 'אימייל הוא שדה חובה'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'כתובת אימייל לא תקינה']
    },
    content: {
      type: String,
      required: [true, 'תוכן ההודעה הוא שדה חובה'],
      trim: true,
      minlength: [5, 'הודעה חייבת להכיל לפחות 5 תווים'],
      maxlength: [1000, 'הודעה לא יכולה להכיל יותר מ-1000 תווים']
    }
  },
  {
    timestamps: true, // מוסיף אוטומטית createdAt ו-updatedAt
    collection: 'messages'
  }
);

// אינדקסים לביצועים טובים יותר
messageSchema.index({ createdAt: -1 });
messageSchema.index({ email: 1 });

// יצירת המודל (או שימוש במודל קיים)
export const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);

// פונקציות עזר למודל
export const MessageHelpers = {
  /**
   * קבלת כל ההודעות (מהחדש לישן)
   */
  async getAllMessages(limit = 50) {
    return await Message.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  },

  /**
   * קבלת הודעות לפי אימייל
   */
  async getMessagesByEmail(email: string) {
    return await Message.find({ email })
      .sort({ createdAt: -1 })
      .lean();
  },

  /**
   * ספירת הודעות לפי אימייל (למניעת ספאם)
   */
  async countMessagesByEmail(email: string, timeframe = 24 * 60 * 60 * 1000) {
    const since = new Date(Date.now() - timeframe);
    return await Message.countDocuments({
      email,
      createdAt: { $gte: since }
    });
  }
};
