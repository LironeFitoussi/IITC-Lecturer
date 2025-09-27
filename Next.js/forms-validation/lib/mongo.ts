import mongoose from 'mongoose';

/**
 * חיבור ל-MongoDB באמצעות Mongoose
 * מבטיח שלא ייפתחו מספר חיבורים בפיתוח
 */
export async function connectMongo() {
  try {
    // בדיקה אם כבר מחובר
    if (mongoose.connections[0].readyState) {
      console.log('🔌 כבר מחובר ל-MongoDB');
      return;
    }

    // חיבור חדש
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('🔌 מחובר ל-MongoDB בהצלחה');
  } catch (error) {
    console.error('❌ שגיאה בחיבור ל-MongoDB:', error);
    throw error;
  }
}

/**
 * ניתוק מ-MongoDB (לשימוש בסיום האפליקציה)
 */
export async function disconnectMongo() {
  try {
    await mongoose.disconnect();
    console.log('🔌 ניתוק מ-MongoDB בהצלחה');
  } catch (error) {
    console.error('❌ שגיאה בניתוק מ-MongoDB:', error);
    throw error;
  }
}
