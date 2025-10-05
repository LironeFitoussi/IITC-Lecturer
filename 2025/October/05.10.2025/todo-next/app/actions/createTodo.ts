"use server"

import { prisma } from "../lib/prisma"
import { revalidatePath } from "next/cache"

export async function createTodo(formData: FormData){
    const text = formData.get("text")?.toString().trim()
    if (!text) throw new Error("Text is required!")

    await prisma.todo.create({
        data: {
            text,
        }
    })

    revalidatePath("/")
}