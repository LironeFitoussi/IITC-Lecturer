"use server"

import { prisma } from "../lib/prisma"
import { revalidatePath } from "next/cache"

export async function toggleTodo(id: string) {
    const todo = await prisma.todo.findUnique({
        where: { id }
    })

    if (!todo) {
        throw new Error("Todo not found!")
    }

    console.log('working');
    
    await prisma.todo.update({
        where: { id },
        data: {
            completed: !todo.completed
        }
    })

    revalidatePath("/")
}
