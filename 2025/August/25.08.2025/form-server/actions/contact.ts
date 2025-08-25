'use server'
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongo";
import Message from "@/models/Message";

const contactFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    content: z.string().min(10, "Message content is required")
});

type ContactFromState = {
    success?: boolean;
    message?: string;
    errors?: {
        name?: string;
        email?: string;
        content?: string;
        // formErrors?: string[];
    }
} | null


export async function submitContactForm(prevState: ContactFromState | null,formData: FormData): Promise<ContactFromState> {
    try {
        const data = Object.fromEntries(formData);
        const result = contactFormSchema.safeParse(data);

        if (!result.success) return {
            success: false,
            errors: z.flattenError(result.error)
        }

        await connectToDatabase();

        await new Message(data).save();
        return { success: true };
    } catch (error) {
        return { 
            success: false, 
            errors: { 
                formErrors: ["An unexpected error occurred. Please try again later."] 
            }
        };
    }
}