import {
    useQuery,
    // useMutation,
    // useQueryClient,
} from '@tanstack/react-query'
import { 
    getTodos,
    //  postTodo 
  } from '../services/todo.service'

import { type todo } from '../types'

export default function Todos() {
    // Access the client
    // const queryClient = useQueryClient()
  
    // Queries
    const { isLoading, data, isError, error } = useQuery({ 
        queryKey: ['todos'], 
        queryFn: getTodos 
    })
  
    if (isLoading) {
        return <h1>Loading...</h1>;
    } 
    
    if (isError) {
        return <h1>An error occured</h1>;
    }
    // Mutations
    // const mutation = useMutation({
    //   mutationFn: postTodo,
    //   onSuccess: () => {
    //     // Invalidate and refetch
    //     queryClient.invalidateQueries({ queryKey: ['todos'] })
    //   },
    // })
  
    return (
      <div>
        <ul>
          {data?.map((todo: todo) => (
            <li key={todo.id}>{todo.title}: <b>{todo.completed && 'Done'}</b></li>
          ))}
        </ul>
          {/* <button
          onClick={() => {
            mutation.mutate({
              id: Date.now(),
              title: 'Do Laundry',
            })
          }}
        > 
          Add Todo
        </button>
        */}
      </div>
    )
  }