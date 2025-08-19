import { type todo } from '../types'
import { useTodos, useAddPost } from '../hooks/useTodos';

export default function Todos() {

    const { data, isLoading, isError } = useTodos()
    const addPostMutation = useAddPost() // Move this to top level

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h1>An error occured</h1>;
    }

    function handleAddPost() {
        addPostMutation.mutate({ // Use the mutation from the hook
            title: 'Do Laundry',
            userId: 234543623
        })
    }

    return (
        <div>
            <ul>
                {data?.map((todo: todo) => (
                    <li key={todo.id}>{todo.title}: <b>{todo.completed && 'Done'}</b></li>
                ))}
            </ul>
            <button
                onClick={handleAddPost}
            >
                Add Todo
            </button>

        </div>
    )
}