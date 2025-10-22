"use server"

import { prisma } from "../lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteTodo(id: string): Promise<void> {
    await prisma.todo.delete({
        where: {
            id
        }
    })

    revalidatePath("/")
}
