'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { connectMongo } from '@/lib/mongo';
import { Message, MessageHelpers } from '@/models/Message';

// הגדרת סכמת הולידציה עם Zod
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'שם חייב להכיל לפחות 2 תווים')
    .max(100, 'שם לא יכול להכיל יותר מ-100 תווים')
    .trim(),
  email: z
    .string()
    .email('כתובת אימייל לא תקינה')
    .max(255, 'כתובת אימייל ארוכה מדי')
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(5, 'הודעה חייבת להכיל לפחות 5 תווים')
    .max(1000, 'הודעה לא יכולה להכיל יותר מ-1000 תווים')
    .trim()
});

// טיפוסי התגובה
export type ContactFormState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    general?: string[];
  };
};

/**
 * Server Action ליצירת הודעת יצירת קשר
 */
export async function createMessage(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // המרת FormData לאובייקט
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string
    };

    // ולידציה עם Zod
    const result = contactSchema.safeParse(data);
    
    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors,
        message: 'אנא תקן את השגיאות בטופס'
      };
    }

    // חיבור למסד הנתונים
    await connectMongo();

    // בדיקת ספאם (מקסימום 5 הודעות ביום מאותו אימייל)
    const messageCount = await MessageHelpers.countMessagesByEmail(result.data.email);
    if (messageCount >= 5) {
      return {
        success: false,
        errors: {
          general: ['נשלחו יותר מדי הודעות מכתובת זו היום. אנא נסה מחר.']
        },
        message: 'חריגה ממגבלת ההודעות היומית'
      };
    }

    // שמירת ההודעה במסד הנתונים
    const newMessage = new Message({
      name: result.data.name,
      email: result.data.email,
      content: result.data.message
    });

    await newMessage.save();

    // רענון הקאש של הדף
    revalidatePath('/contact');
    revalidatePath('/admin/messages');

    return {
      success: true,
      message: 'ההודעה נשלחה בהצלחה! נחזור אליך בקרוב.'
    };

  } catch (error) {
    console.error('שגיאה ביצירת הודעה:', error);
    
    return {
      success: false,
      errors: {
        general: ['אירעה שגיאה בשליחת ההודעה. אנא נסה שוב.']
      },
      message: 'שגיאה בשרת'
    };
  }
}

/**
 * Server Action לקבלת כל ההודעות (לעמוד ניהול)
 */
export async function getAllMessages() {
  try {
    await connectMongo();
    const messages = await MessageHelpers.getAllMessages(100);
    
    return {
      success: true,
      data: messages
    };
  } catch (error) {
    console.error('שגיאה בקבלת הודעות:', error);
    return {
      success: false,
      message: 'שגיאה בקבלת ההודעות'
    };
  }
}

/**
 * Server Action למחיקת הודעה (לעמוד ניהול)
 */
export async function deleteMessage(messageId: string) {
  try {
    await connectMongo();
    await Message.findByIdAndDelete(messageId);
    
    revalidatePath('/admin/messages');
    
    return {
      success: true,
      message: 'ההודעה נמחקה בהצלחה'
    };
  } catch (error) {
    console.error('שגיאה במחיקת הודעה:', error);
    return {
      success: false,
      message: 'שגיאה במחיקת ההודעה'
    };
  }
}
