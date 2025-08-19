import { useState } from 'react'
import { usePosts } from '../hooks/usePosts'
import { usePost } from '../hooks/usePost'

export function PostsList() {
  const { data: posts, isLoading, isError, error, refetch, isFetching } = usePosts()
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { data: selected, isFetching: isFetchingSelected } = usePost(selectedId)

  if (isLoading) return <p>Loading posts...</p>
  if (isError) return <p>Error: {(error as Error).message}</p>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <h2 style={{ margin: 0 }}>Posts</h2>
          {isFetching && <small>refreshing…</small>}
          <button onClick={() => refetch()}>Refetch</button>
        </div>
        <ul>
          {posts?.slice(0, 20).map((p) => (
            <li key={p.id}>
              <button onClick={() => setSelectedId(p.id)}>{p.title}</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 style={{ marginTop: 0 }}>Selected Post</h2>
        {isFetchingSelected && <small>loading…</small>}
        {selected ? (
          <article>
            <h3>#{selected.id} {selected.title}</h3>
            <p>{selected.body}</p>
          </article>
        ) : (
          <p>Select a post</p>
        )}
      </div>
    </div>
  )
}

export default PostsList


