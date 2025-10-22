'use client'
import { createTodo } from "../actions/createTodo"

export default function TodoForm() {
    return (
        <form action={createTodo} className="flex gap-2 mb-4">
            <input 
                type="text" 
                name="text" 
                id="text"
                placeholder="New Task..."
                className="flex-1 border rounded px-3 py-2"
            />
            <button
                type="submit"
                // disabled=
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
                Add Task
            </button>
        </form>
    )
}