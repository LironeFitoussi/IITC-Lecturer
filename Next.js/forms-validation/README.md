# טופס צור קשר - Next.js עם Server Actions

פרויקט למידה פשוט הממחיש איך לבנות טופס מתקדם ב-Next.js 15 עם:
- **Server Actions** - טיפול בטפסים בצד השרת
- **Zod** - ולידציה מתקדמת
- **MongoDB** - שמירת נתונים
- **useFormState & useFormStatus** - ניהול מצב טופס ב-React 19

## התקנה והרצה

1. **התקנת חבילות:**
```bash
npm install
```

2. **הגדרת MongoDB:**
צור קובץ `.env.local` עם:
```
MONGO_URI=mongodb://localhost:27017/forms-validation
```

3. **הרצת הפרויקט:**
```bash
npm run dev
```

4. **פתח בדפדפן:**
[http://localhost:3000](http://localhost:3000)

## מבנה הפרויקט

```
├── actions/contact.ts          # Server Actions
├── components/
│   ├── ContactForm.tsx         # הטופס הראשי
│   └── ui/                     # רכיבי UI בסיסיים
├── lib/
│   ├── mongo.ts               # חיבור MongoDB
│   └── utils.ts               # פונקציות עזר
└── models/Message.ts          # מודל MongoDB
```

## תכונות הטופס

✅ **ולידציה מתקדמת** - בצד השרת והלקוח  
✅ **הודעות שגיאה ברורות** - לכל שדה בנפרד  
✅ **UX מתקדם** - אינדיקציה של שליחה  
✅ **הגנה מספאם** - מגבלת 5 הודעות ביום  
✅ **איפוס אוטומטי** - לאחר שליחה מוצלחת  

## טכנולוגיות

- Next.js 15 (App Router)
- React 19
- TypeScript
- MongoDB + Mongoose
- Zod
- Tailwind CSS
