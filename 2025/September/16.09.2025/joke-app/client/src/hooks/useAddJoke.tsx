import { useMutation } from "@tanstack/react-query";
import { createJoke } from "../services/jokes.service";
import { useQueryClient } from "@tanstack/react-query";


const useAddJoke = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({ 
        mutationFn: createJoke,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jokes']})
        }
    })
    return mutation
}

export default useAddJoke