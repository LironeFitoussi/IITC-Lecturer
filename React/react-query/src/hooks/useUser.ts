import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/services/users.service';

const queryClient = useQueryClient();

interface useUserMutationProps {
    setTitle: (t: string) => void;
    setBody: (b: string) => void;
    setUserId: (uid: number) => void;
}

export const useUserMutation = ({ setTitle, setBody, setUserId}: useUserMutationProps) => useMutation({
  mutationFn: createPost,
  onSuccess: (data) => {
    // Optionally invalidate and refetch posts query if you have one
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    console.log('Post created successfully:', data);
    
    // Reset form
    setTitle('');
    setBody('');
    setUserId(1);
  },
  onError: (error) => {
    console.error('Error creating post:', error);
  },
});