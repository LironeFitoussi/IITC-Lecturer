import { ContactForm } from '@/components/ContactForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            טופס צור קשר - Next.js עם Server Actions
          </h1>
          <p className="text-gray-600">
            דוגמה לטופס מתקדם עם ולידציה, Server Actions ושמירה ב-MongoDB
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
