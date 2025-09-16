import { useMutation } from "@tanstack/react-query";
import { createJoke } from "../services/jokes.service";

const useAddJoke = () => {
    const mutation = useMutation({ mutationFn: createJoke})
    return mutation
}

export default useAddJoke