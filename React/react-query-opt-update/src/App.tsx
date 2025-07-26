
// Import styles and React Query hooks
import './App.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// Import the Axios instance for API calls
// @ts-ignore
import { api } from './api';


// Define the Post type for TypeScript
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};


// Fetch posts from the JSONPlaceholder API (limit to 5 for demo)
function fetchPosts(): Promise<Post[]> {
  return api.get('/posts?_limit=5').then((res: { data: Post[] }) => res.data);
}


// Add a new post to the API (the response will include a fake id)
function addPost(newPost: Omit<Post, 'id'>): Promise<Post> {
  return api.post('/posts', newPost).then((res: { data: Post }) => res.data);
}

export default function App() {
  // Get the query client instance for cache manipulation
  const queryClient = useQueryClient();

  // Fetch posts using React Query
  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ['posts'], // Unique key for this query
    queryFn: fetchPosts, // Function to fetch data
  });

  // Set up mutation for adding a post, with optimistic update logic
  const mutation = useMutation<Post, unknown, Omit<Post, 'id'>, { previousPosts?: Post[] }>({
    mutationFn: addPost, // Function to call for mutation
    // Optimistically update the cache before the mutation happens
    onMutate: async (newPost: Omit<Post, 'id'>) => {
      // Cancel any outgoing refetches for posts
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);
      // Optimistically update the cache with the new post
      queryClient.setQueryData<Post[]>(['posts'], (old = []) => [
        ...old,
        { ...newPost, id: Date.now() }, // Temporary id for UI
      ]);
      // Return context for rollback
      return { previousPosts };
    },
    // If the mutation fails, rollback to previous value
    onError: (
      _err: unknown,
      _newPost: Omit<Post, 'id'>,
      context: { previousPosts?: Post[] } | undefined
    ) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
    // After mutation (success or error), refetch posts from server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Handler to trigger the mutation
  const handleAdd = () => {
    mutation.mutate({ title: 'New Post', body: 'Hello world!', userId: 1 });
  };

  // Show loading state while fetching
  if (isLoading) return <div>Loading...</div>;

  // Render the UI
  return (
    <div>
      {/* Button to add a post, disabled while mutation is pending */}
      <button onClick={handleAdd} disabled={mutation.status === 'pending'}>
        Add Post (Optimistic)
      </button>
      <ul>
        {/* Render the list of posts */}
        {posts.map((post: Post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// ...existing code...
