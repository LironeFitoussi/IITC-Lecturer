"use client"

import { toggleTodo } from '@/app/actions/toggleTodo';
import { deleteTodo } from '../actions/deleteTodo';
import { Todo } from '@/types/todo';

interface TodoItemProps {
    todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
    return (
        <li key={todo.id}>
            {todo.text}
            <form action={() => toggleTodo(todo.id)}>
                <button type='submit'>
                    <span className={`${todo.completed ? "text-green-500" : "text-red-500"}`}> {todo.completed ? "done" : "undone"}</span>
                </button>
            </form>
            <form action={() => deleteTodo(todo.id)}>
                <button type='submit' className='bg-red-600'>DELETE?</button>
            </form>
        </li>
    );
}
