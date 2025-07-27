import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUserMutation } from '../hooks/useUser'

export default function CreatePostWithMutation() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(1);
  
  const mutation = useUserMutation({setTitle, setBody, setUserId})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      alert('Please fill in all fields');
      return;
    }

    mutation.mutate({
      title: title.trim(),
      body: body.trim(),
      userId,
    });
  };

  return (
    <div className="p-6 border rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6">Create New Post (useMutation)</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
            User ID
          </label>
          <select
            id="userId"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => (
              <option key={id} value={id}>User {id}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={mutation.isPending}
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
            Post Content
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter post content..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={mutation.isPending}
          />
        </div>

        <Button 
          type="submit" 
          disabled={mutation.isPending || !title.trim() || !body.trim()}
          className="w-full"
        >
          {mutation.isPending ? 'Creating Post...' : 'Create Post'}
        </Button>
      </form>

      {/* Status Messages */}
      <div className="mt-4 space-y-2">
        {mutation.isPending && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-blue-800">Creating post...</p>
          </div>
        )}

        {mutation.isSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <p className="text-green-800">✅ Post created successfully!</p>
            {mutation.data && (
              <div className="mt-2 text-sm text-green-700">
                <p><strong>ID:</strong> {mutation.data.id}</p>
                <p><strong>Title:</strong> {mutation.data.title}</p>
              </div>
            )}
          </div>
        )}

        {mutation.isError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-800">
              ❌ Error creating post: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}
            </p>
          </div>
        )}
      </div>

      {/* Reset button */}
      {(mutation.isSuccess || mutation.isError) && (
        <Button 
          onClick={() => mutation.reset()}
          variant="outline"
          className="w-full mt-2"
        >
          Reset Form
        </Button>
      )}
    </div>
  );
} 