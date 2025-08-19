import { useState } from 'react'
import { useCreatePost } from '../hooks/useCreatePost'

export default function CreatePostForm() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const mutation = useCreatePost()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate({ title, body, userId: 1 })
        setTitle('')
        setBody('')
      }}
      style={{ display: 'grid', gap: 8, maxWidth: 500 }}
    >
      <h2>Create Post</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating…' : 'Create'}
      </button>
      {mutation.isError && <p style={{ color: 'crimson' }}>Error creating post</p>}
      {mutation.isSuccess && <p style={{ color: 'green' }}>Created!</p>}
    </form>
  )
}


