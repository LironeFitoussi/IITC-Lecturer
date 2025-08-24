'use client';

import { useFormState } from 'react-dom';
import { createMessage, type ContactFormState } from '@/actions/contact';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { SubmitButton } from './ui/SubmitButton';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';

const initialState: ContactFormState = {
  success: false,
  message: '',
  errors: {}
};

export function ContactForm() {
  const [state, formAction] = useFormState(createMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // איפוס הטופס לאחר שליחה מוצלחת
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">צור קשר</h2>
      
      <form ref={formRef} action={formAction} className="space-y-4">
        {/* הצגת הודעות הצלחה או שגיאה כלליות */}
        {state?.message && (
          <div
            className={`flex items-center gap-2 p-3 rounded-md ${
              state.success
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {state.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">{state.message}</span>
          </div>
        )}

        {/* שגיאות כלליות */}
        {state?.errors?.general && (
          <div className="flex items-center gap-2 p-3 rounded-md bg-red-50 text-red-700 border border-red-200">
            <AlertCircle className="h-4 w-4" />
            <div>
              {state.errors.general.map((error, index) => (
                <p key={index} className="text-sm font-medium">{error}</p>
              ))}
            </div>
          </div>
        )}

        {/* שדה שם */}
        <Input
          name="name"
          type="text"
          label="שם מלא"
          placeholder="הכנס את שמך המלא"
          required
          error={state?.errors?.name?.[0]}
        />

        {/* שדה אימייל */}
        <Input
          name="email"
          type="email"
          label="כתובת אימייל"
          placeholder="your@email.com"
          required
          error={state?.errors?.email?.[0]}
          dir="ltr"
        />

        {/* שדה הודעה */}
        <Textarea
          name="message"
          label="הודעה"
          placeholder="כתב כאן את הודעתך..."
          required
          error={state?.errors?.message?.[0]}
          rows={4}
        />

        {/* כפתור שליחה */}
        <SubmitButton 
          className="w-full"
          loadingText="שולח..."
        >
          שלח הודעה
        </SubmitButton>
      </form>
    </div>
  );
}
