import TodoForm from '@/app/components/TodoForm'
import TodoItem from '@/app/components/TodoItem'
import { prisma } from './lib/prisma';

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc'}
  })

  return (
   <main className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4"> 📝To-Do List</h1>
      <TodoForm />
      <div className='space-y-2'>
        {
          todos.length === 0 ? (
            <p className='text-gray-500'>No Tasks yet. Add One!</p>
          ) : (
            <ol>
              {
                todos.map(todo => 
                  <TodoItem key={todo.id} todo={todo} />
                )
              }
            </ol>
          )
        }
      </div>
   </main>
  );
}
