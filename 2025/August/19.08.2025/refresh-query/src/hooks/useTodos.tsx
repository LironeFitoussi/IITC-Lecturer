import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import { getTodos, postTodo } from '../services/todo.service'

function useTodos() {
    const query = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos
    })
    return query
}

function useAddPost() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: postTodo,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ 
                queryKey: ['todos'] 
            })
        },
    })

    return mutation
}


export {
    useTodos,
    useAddPost
}